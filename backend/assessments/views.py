from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import AssessmentQuestion, AssessmentAttempt
from .serializers import AssessmentQuestionSerializer, AssessmentAttemptSerializer


class QuestionListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        skill_name = request.query_params.get('skill')
        limit = int(request.query_params.get('limit', 10))

        questions = AssessmentQuestion.objects.all().select_related('skill')
        if skill_name:
            questions = questions.filter(skill__name__iexact=skill_name)

        questions = questions[:limit]
        serializer = AssessmentQuestionSerializer(questions, many=True)
        return Response(serializer.data)


class AssessmentSubmitView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        skill_name = request.data.get('skill_name', 'General')
        submitted_answers = request.data.get('answers', [])  # list of {question_id: int, selected_index: int}

        if not submitted_answers:
            return Response({'error': 'No answers submitted'}, status=status.HTTP_400_BAD_REQUEST)

        question_ids = [a.get('question_id') for a in submitted_answers if a.get('question_id') is not None]
        questions_map = {q.id: q for q in AssessmentQuestion.objects.filter(id__in=question_ids).select_related('skill')}

        correct_count = 0
        total_questions = len(submitted_answers)
        detailed_results = []

        for item in submitted_answers:
            q_id = item.get('question_id')
            selected_idx = item.get('selected_index')
            question_obj = questions_map.get(q_id)

            if question_obj:
                is_correct = (selected_idx == question_obj.correct_option_index)
                if is_correct:
                    correct_count += 1
                detailed_results.append({
                    'question_id': q_id,
                    'question_text': question_obj.question_text,
                    'selected_index': selected_idx,
                    'correct_index': question_obj.correct_option_index,
                    'is_correct': is_correct,
                    'explanation': question_obj.explanation,
                    'options': question_obj.options
                })

        score_percent = round((correct_count / total_questions) * 100, 1) if total_questions > 0 else 0
        passed = score_percent >= 60.0

        user = request.user if request.user.is_authenticated else None
        attempt = AssessmentAttempt.objects.create(
            user=user,
            skill_name=skill_name,
            score=score_percent,
            total_questions=total_questions,
            correct_count=correct_count,
            answers=detailed_results,
            passed=passed
        )

        return Response({
            'attempt_id': attempt.id,
            'skill_name': skill_name,
            'score': score_percent,
            'total_questions': total_questions,
            'correct_count': correct_count,
            'passed': passed,
            'results': detailed_results,
            'notice': 'Illustrative diagnostic quiz for study calibration, not a certified industry accreditation.'
        })


class AssessmentHistoryView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if request.user.is_authenticated:
            attempts = AssessmentAttempt.objects.filter(user=request.user).order_by('-created_at')[:20]
            serializer = AssessmentAttemptSerializer(attempts, many=True)
            return Response(serializer.data)
        return Response([])
