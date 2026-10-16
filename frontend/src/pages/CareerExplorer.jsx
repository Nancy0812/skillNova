import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import LoadingState from '../components/common/LoadingState';
import { getRoles, updateProfile } from '../services/api';
import { setTargetCareer } from '../services/dataService';
import { Search, Compass, CheckCircle2, ArrowRight, Check } from 'lucide-react';

const FAMILIES = [
  "All Families",
  "Web Development",
  "Software Development",
  "Data & Analytics",
  "AI & Machine Learning",
  "Cloud & DevOps",
  "Cybersecurity"
];

export default function CareerExplorer({ user, onProfileUpdated }) {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFamily, setSelectedFamily] = useState("All Families");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleForModal, setSelectedRoleForModal] = useState(null);
  const [settingRole, setSettingRole] = useState(false);

  useEffect(() => {
    async function loadRoles() {
      setLoading(true);
      try {
        const data = await getRoles();
        setRoles(data || []);
      } catch (err) {
        console.error("Error loading roles:", err);
      } finally {
        setLoading(false);
      }
    }
    loadRoles();
  }, []);

  const filteredRoles = roles.filter(role => {
    const matchesFamily = selectedFamily === "All Families" || role.family === selectedFamily;
    const matchesSearch = !searchTerm ||
      role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (role.skills_required && role.skills_required.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesFamily && matchesSearch;
  });

  const handleSelectCareer = async (role) => {
    setSettingRole(true);
    try {
      setTargetCareer(role.role_id, role.title, role.family);
      await updateProfile({
        target_role_id: role.role_id,
        target_role_title: role.title,
        target_family: role.family
      });
      if (onProfileUpdated) {
        onProfileUpdated({
          target_role_id: role.role_id,
          target_role_title: role.title,
          target_family: role.family
        });
      }
      setSelectedRoleForModal(null);
      navigate('/dashboard');
    } catch (err) {
      console.error("Failed to update career:", err);
    } finally {
      setSettingRole(false);
    }
  };

  const isCurrentTarget = (roleId) => user?.profile?.target_role_id === roleId;

  return (
    <div>
      <PageHeader
        title="Career Explorer"
        subtitle="Explore 16 industry-benchmarked entry-level roles across 6 technology families."
        badge={<Badge isSynthetic />}
      />

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-4)',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-6)'
      }}>
        {/* Family Pill Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {FAMILIES.map(fam => (
            <button
              key={fam}
              onClick={() => setSelectedFamily(fam)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                border: `1.5px solid ${selectedFamily === fam ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: selectedFamily === fam ? 'var(--color-primary)' : 'var(--color-white)',
                color: selectedFamily === fam ? 'var(--color-white)' : 'var(--color-text-main)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {fam}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div style={{ minWidth: '260px' }}>
          <Input
            id="career-search"
            placeholder="Search roles or skills (e.g. Python, SQL)..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading career tracks catalog..." />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--space-6)'
        }}>
          {filteredRoles.map(role => {
            const isTarget = isCurrentTarget(role.role_id);
            return (
              <Card
                key={role.role_id}
                hover
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isTarget ? '2px solid var(--color-primary)' : undefined
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                    <Badge variant="primary">{role.family}</Badge>
                    <Badge isSynthetic />
                  </div>

                  <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
                    {role.title}
                  </h3>

                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
                    {role.description}
                  </p>

                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Key Skills Benchmark:
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {(role.skills_required || []).map(s => (
                        <span key={s} style={{ fontSize: '0.75rem', backgroundColor: '#F5F0FF', color: '#7548D8', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          {s}
                        </span>
                      ))}
                      {(role.skills_preferred || []).slice(0, 2).map(s => (
                        <span key={s} style={{ fontSize: '0.75rem', backgroundColor: '#FAFAFD', color: '#716B80', border: '1px solid var(--color-border)', padding: '3px 8px', borderRadius: '4px' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-3)' }}>
                  <Button
                    variant="outline"
                    size="sm"
                    style={{ flex: 1 }}
                    onClick={() => setSelectedRoleForModal(role)}
                  >
                    View Details
                  </Button>

                  {isTarget ? (
                    <Button variant="secondary" size="sm" disabled style={{ color: '#065F46', backgroundColor: '#ECFDF5' }}>
                      <Check size={14} /> Active Target
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSelectCareer(role)}
                    >
                      Choose This Career
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Role Details Modal */}
      {selectedRoleForModal && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedRoleForModal(null)}
          title={selectedRoleForModal.title}
        >
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-4)' }}>
              <Badge variant="primary">{selectedRoleForModal.family}</Badge>
              <Badge variant="warning">{selectedRoleForModal.experience_level}</Badge>
              <Badge isSynthetic />
            </div>

            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
              Role Overview
            </h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-main)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
              {selectedRoleForModal.description}
            </p>

            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
              Required Core Skills (Benchmark)
            </h4>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
              {(selectedRoleForModal.skills_required || []).map(s => (
                <Badge key={s} variant="primary">✓ {s}</Badge>
              ))}
            </div>

            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
              Preferred & Asset Skills
            </h4>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
              {(selectedRoleForModal.skills_preferred || []).map(s => (
                <Badge key={s} variant="outline">+ {s}</Badge>
              ))}
            </div>

            <div style={{ padding: '12px', backgroundColor: '#F5F0FF', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--color-dark-purple)', marginBottom: 'var(--space-6)' }}>
              <strong>Notice:</strong> This synthetic benchmark represents typical entry-level job descriptions in our curated taxonomy. It allows you to align your preparation towards industry-relevant skills.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <Button variant="outline" onClick={() => setSelectedRoleForModal(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                loading={settingRole}
                onClick={() => handleSelectCareer(selectedRoleForModal)}
                icon={CheckCircle2}
              >
                Set As My Target Career
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
