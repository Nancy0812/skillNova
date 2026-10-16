import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import LoadingState from '../components/common/LoadingState';
import { getResources } from '../services/api';
import { Search, BookOpen, ExternalLink, Filter, CheckCircle2 } from 'lucide-react';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('All');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getResources();
        setResources(data || []);
      } catch (err) {
        console.error("Resources load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const formats = ['All', 'Documentation', 'Interactive', 'Interactive Guide'];

  const filtered = resources.filter(r => {
    const matchesFormat = selectedFormat === 'All' || r.format.toLowerCase() === selectedFormat.toLowerCase();
    const matchesSearch = !searchTerm ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.skill_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFormat && matchesSearch;
  });

  return (
    <div>
      <PageHeader
        title="Curated Free Learning Resources"
        subtitle="Zero-cost, authoritative documentation and tutorials from official sources."
        badge={<Badge variant="success">100% Free</Badge>}
      />

      {/* Search and Filters */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-4)',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-6)'
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {formats.map(fmt => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                border: `1.5px solid ${selectedFormat === fmt ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: selectedFormat === fmt ? 'var(--color-primary)' : 'var(--color-white)',
                color: selectedFormat === fmt ? 'var(--color-white)' : 'var(--color-text-main)',
                cursor: 'pointer'
              }}
            >
              {fmt}
            </button>
          ))}
        </div>

        <div style={{ minWidth: '280px' }}>
          <Input
            id="resource-search"
            placeholder="Search by title or skill (e.g. React, SQL)..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading verified free resources..." />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--space-6)'
        }}>
          {filtered.map(r => (
            <Card key={r.id} hover style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                  <Badge variant="primary">{r.skill_name}</Badge>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#065F46', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: '4px' }}>
                    {r.cost_category}
                  </span>
                </div>

                <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, margin: 'var(--space-2) 0' }}>
                  {r.title}
                </h3>

                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
                  {r.description}
                </p>

                <div style={{ display: 'flex', gap: '8px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  <span>Level: <strong>{r.level}</strong></span> • 
                  <span>Format: <strong>{r.format}</strong></span> • 
                  <span>Est: <strong>{r.estimated_duration}</strong></span>
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-3)' }}>
                <a href={r.source_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Button variant="outline" size="sm" style={{ width: '100%' }} icon={ExternalLink}>
                    Open Official Resource
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
