import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

export default function WeeklyActivityChart({ activity = [] }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const days = activity.map(a => a.date || 'Day');
    const hours = activity.map(a => a.hours || 0);
    const tasks = activity.map(a => a.tasks || 0);

    const trace1 = {
      x: days,
      y: hours,
      name: 'Study Hours',
      type: 'bar',
      marker: {
        color: '#7548D8',
        opacity: 0.85
      }
    };

    const trace2 = {
      x: days,
      y: tasks,
      name: 'Tasks Completed',
      type: 'scatter',
      mode: 'lines+markers',
      yaxis: 'y2',
      line: {
        color: '#10B981',
        width: 3
      },
      marker: {
        size: 7,
        color: '#10B981'
      }
    };

    const layout = {
      height: 240,
      margin: { t: 20, r: 40, l: 40, b: 35 },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      font: { family: 'Inter', size: 11, color: '#716B80' },
      showlegend: true,
      legend: { orientation: 'h', x: 0, y: 1.15, font: { size: 10 } },
      xaxis: {
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        title: 'Hours',
        showgrid: true,
        gridcolor: '#F5F0FF',
        zeroline: false
      },
      yaxis2: {
        title: 'Tasks',
        overlaying: 'y',
        side: 'right',
        showgrid: false,
        zeroline: false
      }
    };

    const config = {
      responsive: true,
      displayModeBar: false
    };

    Plotly.newPlot(chartRef.current, [trace1, trace2], layout, config);

    return () => {
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, [activity]);

  return (
    <div style={{ width: '100%' }}>
      <div ref={chartRef} style={{ width: '100%' }} />
    </div>
  );
}
