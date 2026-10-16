import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import {
  Compass,
  CheckCircle,
  BarChart3,
  Map,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function Landing({ isAuthenticated }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar isAuthenticated={isAuthenticated} />

      {/* Hero Section */}
      <section style={{
        background: 'radial-gradient(ellipse at 50% -10%, #F5F0FF 0%, #FFFFFF 75%)',
        padding: 'var(--space-16) 0 var(--space-12)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Decorative Shapes */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '8%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(117, 72, 216, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', backgroundColor: 'var(--color-light-lavender)', color: 'var(--color-primary)', fontSize: 'var(--font-size-xs)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
            <Sparkles size={14} /> Career readiness, made accessible
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 800,
            color: 'var(--color-text-main)',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            maxWidth: '840px',
            margin: '0 auto var(--space-4)'
          }}>
            Your skills. <span style={{ color: 'var(--color-primary)' }}>Your next step.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--color-text-secondary)',
            maxWidth: '680px',
            margin: '0 auto var(--space-8)',
            lineHeight: 1.6
          }}>
            SkillNova helps college students understand entry-level industry expectations, diagnose skill gaps, and follow a personalized weekly learning roadmap without expensive paid guidance.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-12)' }}>
            <Link to="/onboarding">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Build My Career Roadmap
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg">
                Explore How It Works
              </Button>
            </a>
          </div>

          {/* Product Dashboard Preview */}
          <div style={{
            maxWidth: '960px',
            margin: '0 auto',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 20px 50px rgba(117, 72, 216, 0.12)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-white)',
            textAlign: 'left'
          }}>
            <div style={{
              backgroundColor: '#FAFAFD',
              borderBottom: '1px solid var(--color-border)',
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: '12px', fontFamily: 'monospace' }}>
                skillnova.app / dashboard / student-preview
              </span>
            </div>

            <div style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-6)' }}>
              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#F5F0FF', border: '1px solid #ECE2FF' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)' }}>TARGET CAREER BENCHMARK</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '4px' }}>Frontend Developer</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                  <Badge variant="primary">HTML/CSS</Badge>
                  <Badge variant="primary">JavaScript</Badge>
                  <Badge variant="primary">React</Badge>
                  <Badge variant="primary">Git & GitHub</Badge>
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>TRANSPARENT SKILL COVERAGE</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>67%</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Demonstrated 2 of 3 essential baseline skills against junior role taxonomy.
                </p>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>NEXT RECOMMENDED ACTION</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '6px', color: 'var(--color-text-main)' }}>
                  Complete: State Management & Hooks
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Week 3 of 6 • Estimated 4.5 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: 'var(--space-16) 0', backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto var(--space-12)' }}>
            <Badge variant="primary" style={{ marginBottom: 'var(--space-2)' }}>CORE CAPABILITIES</Badge>
            <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 'var(--space-3)' }}>
              Everything students need for structured preparation
            </h2>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
              Clear, transparent steps from role selection to verifiable skill building.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-6)' }}>
            <Card hover>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-light-lavender)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <Compass size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                Career Explorer
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Explore 16 entry-level roles across 6 technology families, complete with synthetic job benchmarks and skill requirements.
              </p>
            </Card>

            <Card hover>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-light-lavender)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <CheckCircle size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                Diagnostic Skill Quizzes
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Calibrate your current understanding with bite-sized multiple-choice assessments and complete concept explanations.
              </p>
            </Card>

            <Card hover>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-light-lavender)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <BarChart3 size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                Transparent Gap Analysis
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Understand exactly what skills you possess and what skills you lack using a transparent, explainable formula without black-box metrics.
              </p>
            </Card>

            <Card hover>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-light-lavender)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <Map size={24} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                Personalized Roadmap
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Follow a week-by-week plan matched to your available study hours, linking directly to free documentation and hands-on projects.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{ padding: 'var(--space-16) 0', backgroundColor: '#FAFAFD', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto var(--space-12)' }}>
            <Badge variant="primary" style={{ marginBottom: 'var(--space-2)' }}>HOW IT WORKS</Badge>
            <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 'var(--space-3)' }}>
              A 3-step structured journey to career readiness
            </h2>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
              Simple, transparent, and entirely student-centered.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)' }}>
            <div style={{ backgroundColor: 'var(--color-white)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', position: 'relative' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
                1
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                Select Role & Assess
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Pick your dream entry-level role and test your existing fundamentals with diagnostic multiple-choice quizzes.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-white)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', position: 'relative' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
                2
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                Inspect Your Skill Gap
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                See exactly which required skills you meet and which priority skills need focus, backed by clear industry requirement evidence.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-white)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', position: 'relative' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
                3
              </div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                Execute Your Roadmap
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Work through weekly modules with free official documentation, build student projects, and track verifiable progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About & Mission Section */}
      <section id="about" style={{ padding: 'var(--space-16) 0', backgroundColor: 'var(--color-white)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <Badge variant="primary" style={{ marginBottom: 'var(--space-2)' }}>OUR MISSION</Badge>
          <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 'var(--space-4)' }}>
            Democratizing career preparation for college students
          </h2>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
            Repeated 1-on-1 career coaching and expensive bootcamps are financially out of reach for thousands of aspiring students. SkillNova delivers structured, self-paced guidance using curated high-quality free resources, practical projects, and transparent skill benchmarking.
          </p>
          <div style={{ display: 'inline-flex', padding: '12px 20px', borderRadius: '12px', backgroundColor: '#F5F0FF', border: '1px solid #ECE2FF', fontSize: '0.85rem', color: 'var(--color-dark-purple)' }}>
            <strong>Commitment:</strong> No placements promises. No black-box algorithms. Just transparent learning roadmaps.
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)',
        color: 'var(--color-white)',
        padding: 'var(--space-12) 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, marginBottom: 'var(--space-3)' }}>
            Ready to chart your career readiness journey?
          </h2>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '520px', margin: '0 auto var(--space-6)' }}>
            Explore entry-level role requirements, test your skills, and build your personalized roadmap today.
          </p>
          <Link to="/onboarding">
            <Button variant="secondary" size="lg" style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-primary)', border: 'none' }}>
              Get Started for Free <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
