import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

export default function SkillCoverageChart({ coverage = 65, totalRequired = 5, demonstratedCount = 3 }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const data = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: coverage,
        title: { text: "Skill Coverage Benchmark", font: { size: 14, color: "#241D35", family: "Inter" } },
        number: { suffix: "%", font: { size: 28, color: "#7548D8", family: "Inter" } },
        gauge: {
          axis: { range: [null, 100], tickwidth: 1, tickcolor: "#EAE5F2" },
          bar: { color: "#7548D8", thickness: 0.3 },
          bgcolor: "#F5F0FF",
          borderwidth: 1,
          bordercolor: "#EAE5F2",
          steps: [
            { range: [0, 40], color: "#F5F0FF" },
            { range: [40, 75], color: "#ECE2FF" },
            { range: [75, 100], color: "#DDD6FE" }
          ]
        }
      }
    ];

    const layout = {
      height: 200,
      margin: { t: 30, r: 25, l: 25, b: 20 },
      paper_bgcolor: "transparent",
      font: { family: "Inter" }
    };

    const config = {
      responsive: true,
      displayModeBar: false
    };

    Plotly.newPlot(chartRef.current, data, layout, config);

    return () => {
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, [coverage]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div ref={chartRef} style={{ width: '100%', maxWidth: '340px' }} />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '280px',
        padding: '8px 12px',
        backgroundColor: '#F5F0FF',
        borderRadius: '8px',
        fontSize: '0.8rem',
        marginTop: '-10px'
      }}>
        <span>Demonstrated: <strong>{demonstratedCount}</strong></span>
        <span>Benchmark Target: <strong>{totalRequired}</strong></span>
      </div>
    </div>
  );
}
