"""
SkillNova Skill Intelligence Engine
Transparent, explainable rules-based skill gap detection and coverage scoring.
"""

from jobs.models import Role, Job, JobSkillMapping, Skill


def compute_skill_coverage(target_role_id, demonstrated_skills_list):
    """
    Computes transparent skill coverage for a given target role and list of demonstrated skills.
    
    Formula:
    Skill Coverage = (Demonstrated Required Skills / Total Selected Required Skills) * 100
    
    Safe from division by zero.
    """
    # 1. Fetch role
    role = Role.objects.filter(role_id=target_role_id).first()
    role_title = role.title if role else target_role_id

    # 2. Retrieve all job postings matching this role to aggregate skill requirements
    jobs = Job.objects.filter(role_id=target_role_id)
    if not jobs.exists():
        # Fallback to family if needed
        jobs = Job.objects.filter(role__role_id=target_role_id)

    # 3. Aggregate requirements
    required_skills_set = set()
    preferred_skills_set = set()
    skill_weights = {}

    mappings = JobSkillMapping.objects.filter(job__in=jobs).select_related('skill')
    for m in mappings:
        s_name = m.skill.name
        weight = m.importance_weight
        skill_weights[s_name] = max(skill_weights.get(s_name, 0.0), weight)
        if m.requirement_type == 'required':
            required_skills_set.add(s_name)
        else:
            preferred_skills_set.add(s_name)

    # Clean duplicates in preferred that are already required
    preferred_skills_set -= required_skills_set

    # 4. Normalize demonstrated skills
    demonstrated_normalized = {s.strip().lower(): s for s in demonstrated_skills_list if isinstance(s, str)}

    # Map matched demonstrated
    demonstrated_in_required = []
    missing_required = []

    for req in required_skills_set:
        if req.strip().lower() in demonstrated_normalized:
            demonstrated_in_required.append(req)
        else:
            missing_required.append(req)

    demonstrated_in_preferred = []
    missing_preferred = []

    for pref in preferred_skills_set:
        if pref.strip().lower() in demonstrated_normalized:
            demonstrated_in_preferred.append(pref)
        else:
            missing_preferred.append(pref)

    # 5. Calculate transparent score
    total_required_count = len(required_skills_set)
    demonstrated_count = len(demonstrated_in_required)

    if total_required_count > 0:
        coverage_score = round((demonstrated_count / total_required_count) * 100, 1)
    else:
        coverage_score = 0.0

    # 6. Priority gaps: sorted by importance weight
    priority_gaps = []
    for s in missing_required:
        priority_gaps.append({
            "skill": s,
            "type": "required",
            "priority": "High",
            "weight": skill_weights.get(s, 2.0),
            "reason": f"Required in {len([m for m in mappings if m.skill.name == s and m.requirement_type == 'required'])} benchmark job requirements"
        })
    for s in missing_preferred:
        priority_gaps.append({
            "skill": s,
            "type": "preferred",
            "priority": "Medium",
            "weight": skill_weights.get(s, 1.0),
            "reason": "Frequently listed as preferred skill for entry-level candidates"
        })

    # Sort priority gaps by weight descending
    priority_gaps.sort(key=lambda x: x["weight"], reverse=True)

    return {
        "target_role_id": target_role_id,
        "target_role_title": role_title,
        "skill_coverage_score": coverage_score,
        "total_required_skills_count": total_required_count,
        "demonstrated_required_count": demonstrated_count,
        "demonstrated_skills": list(demonstrated_in_required) + list(demonstrated_in_preferred),
        "missing_required_skills": sorted(missing_required),
        "missing_preferred_skills": sorted(missing_preferred),
        "priority_gaps": priority_gaps,
        "formula_used": "Demonstrated Required Skills / Total Selected Required Skills * 100",
        "disclaimer": "Score reflects entry-level skill coverage benchmark and is not a hiring guarantee or job offer predictor."
    }
