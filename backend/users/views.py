from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterSerializer, UserProfileSerializer
from .models import UserProfile


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            # Update profile if extra fields sent
            profile_data = request.data.get('profile', {})
            if profile_data and hasattr(user, 'profile'):
                for key, val in profile_data.items():
                    if hasattr(user.profile, key):
                        setattr(user.profile, key, val)
                user.profile.save()

            return Response({
                'token': token.key,
                'user': UserSerializer(user).data,
                'message': 'Account created successfully'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email_or_username = request.data.get('email') or request.data.get('username')
        password = request.data.get('password')

        if not email_or_username or not password:
            return Response({'error': 'Please provide both username/email and password'}, status=status.HTTP_400_BAD_REQUEST)

        # Allow login by email or username
        user = authenticate(username=email_or_username, password=password)
        if not user:
            # Try to lookup user by email
            matching_user = User.objects.filter(email=email_or_username).first()
            if matching_user:
                user = authenticate(username=matching_user.username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            login(request, user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data,
                'message': 'Login successful'
            })
        return Response({'error': 'Invalid credentials. Please verify and try again.'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if request.user.is_authenticated:
            Token.objects.filter(user=request.user).delete()
            logout(request)
        return Response({'message': 'Logged out successfully'})


class CurrentUserView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if request.user.is_authenticated:
            return Response(UserSerializer(request.user).data)
        return Response({'authenticated': False}, status=status.HTTP_200_OK)


class ProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if request.user.is_authenticated:
            profile = request.user.profile
            return Response(UserProfileSerializer(profile).data)
        # Return default guest profile
        return Response({
            'college': 'Demo University',
            'education_level': 'Undergraduate',
            'target_role_id': 'ROLE_WD_01',
            'target_role_title': 'Frontend Developer',
            'target_family': 'Web Development',
            'study_hours_per_week': 10,
            'learning_style': 'hands-on',
            'self_reported_skills': ['HTML/CSS', 'JavaScript'],
            'notifications_enabled': True
        })

    def put(self, request):
        if not request.user.is_authenticated:
            # Echo back updated state for demo/unauthenticated mode
            return Response(request.data, status=status.HTTP_200_OK)

        profile = request.user.profile
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
