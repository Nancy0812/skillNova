import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import LoadingState from '../components/common/LoadingState';
import { getProjects } from '../services/api';
import { FolderGit2, CheckCircle, Code, Clock, Layers, ArrowRight } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [completedProjects, setCompletedProjects] = useState({});

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getProjects();
        setProjects(data || []);
      } catch (err) {
        console.error("Projects load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const toggleProjectCompleted = (id) => {
    setCompletedProjects({
      ...completedProjects,
      [id]: !completedProjects[id]
    });
  };

  return (
    <div>
      <PageHeader
        title="Practical Student Projects"
        subtitle="Resume-ready, hands-on portfolio projects aligned with entry-level candidate expectations."
        badge={<Badge variant="primary">Portfolio Ready</Badge>}
      />

      {loading ? (
        <LoadingState message="Loading student portfolio project specifications..." />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 'var(--space-6)'
        }}>
          {projects.map(p => {
            const isCompleted = completedProjects[p.id];

            return (
              <Card
                key={p.id}
                hover
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isCompleted ? '2px solid var(--color-success)' : undefined
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                    <Badge variant="primary">{p.target_role_family}</Badge>
                    <Badge variant={p.difficulty === 'Beginner' ? 'success' : 'warning'}>
                      {p.difficulty}
                    </Badge>
                  </div>

                  <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, margin: 'var(--space-2) 0' }}>
                    {p.title}
                  </h3>

                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
                    Target Role: {p.target_role_title}
                  </div>

                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
                    {p.description}
                  </p>

                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                      Skills Practiced:
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {(p.skills_practiced || []).map(s => (
                        <span key={s} style={{ fontSize: '0.75rem', backgroundColor: '#F5F0FF', color: '#7548D8', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-2)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-3)' }}>
                  <Button
                    variant="outline"
                    size="sm"
                    style={{ flex: 1 }}
                    onClick={() => setSelectedProject(p)}
                  >
                    View Deliverables
                  </Button>

                  <Button
                    variant={isCompleted ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => toggleProjectCompleted(p.id)}
                  >
                    {isCompleted ? '✓ Completed' : 'Mark Done'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Deliverables Modal */}
      {selectedProject && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
        >
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-4)' }}>
              <Badge variant="primary">{selectedProject.target_role_title}</Badge>
              <Badge variant="warning">{selectedProject.difficulty}</Badge>
              <Badge variant="outline">~{selectedProject.estimated_hours} Hours</Badge>
            </div>

            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-main)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
              {selectedProject.description}
            </p>

            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
              Expected Project Deliverables
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-6)' }}>
              {(selectedProject.deliverables || []).map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '10px 12px',
                    backgroundColor: '#FAFAFD',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    fontSize: 'var(--font-size-sm)'
                  }}
                >
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-light-lavender)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <span>{d}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <Button variant="outline" onClick={() => setSelectedProject(null)}>
                Close
              </Button>
              <Button
                variant={completedProjects[selectedProject.id] ? 'secondary' : 'primary'}
                onClick={() => {
                  toggleProjectCompleted(selectedProject.id);
                  setSelectedProject(null);
                }}
              >
                {completedProjects[selectedProject.id] ? 'Mark Incomplete' : 'Mark As Completed'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
