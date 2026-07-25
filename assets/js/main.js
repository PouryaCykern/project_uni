/* ═══════════════════════════════════════════
   PowerAdmin RTL - main.js
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Revenue Area Chart ── */
  const rCtx = document.getElementById('revenueChart').getContext('2d');

  const gradientOrange = rCtx.createLinearGradient(0, 0, 0, 220);
  gradientOrange.addColorStop(0, 'rgba(249,115,22,.28)');
  gradientOrange.addColorStop(1, 'rgba(249,115,22,.02)');

  const gradientIndigo = rCtx.createLinearGradient(0, 0, 0, 220);
  gradientIndigo.addColorStop(0, 'rgba(99,102,241,.22)');
  gradientIndigo.addColorStop(1, 'rgba(99,102,241,.02)');

  new Chart(rCtx, {
    type: 'line',
    data: {
      labels: ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور',
               'مهر','آبان','آذر','دی','بهمن','اسفند'],
      datasets: [
        {
          label: 'درآمد',
          data: [42, 55, 68, 50, 72, 80, 65, 88, 74, 91, 78, 95],
          borderColor: '#F97316',
          backgroundColor: gradientOrange,
          borderWidth: 2.5,
          fill: true,
          tension: .45,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#F97316',
        },
        {
          label: 'هزینه‌ها',
          data: [28, 34, 44, 38, 50, 55, 48, 62, 52, 68, 55, 72],
          borderColor: '#6366F1',
          backgroundColor: gradientIndigo,
          borderWidth: 2.5,
          fill: true,
          tension: .45,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#6366F1',
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: { boxWidth: 10, boxHeight: 10, borderRadius: 5, usePointStyle: true, font: { size: 12 } }
        },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.dataset.label}: $${ctx.parsed.y}K` }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { font: { size: 11 }, color: '#6B7280' }
        },
        y: {
          grid: { color: '#F3F4F6' },
          border: { display: false, dash: [4, 4] },
          ticks: { font: { size: 11 }, color: '#6B7280', callback: v => `$${v}K` }
        }
      }
    }
  });

  /* ── 2. Donut Chart ── */
  new Chart(document.getElementById('donutChart'), {
    type: 'doughnut',
    data: {
      labels: ['الکترونیک', 'پوشاک', 'کتاب', 'سایر'],
      datasets: [{
        data: [42, 28, 18, 12],
        backgroundColor: ['#F97316', '#6366F1', '#10B981', '#F59E0B'],
        borderWidth: 0,
        hoverOffset: 8,
      }]
    },
    options: {
      cutout: '72%',
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` }
        }
      }
    }
  });

  /* ── 3. Strip button active toggle ── */
  document.querySelectorAll('.strip-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.strip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ── 4. Period pills (Year / Month / Week) ── */
  document.querySelectorAll('.badge-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      pill.closest('.d-flex').querySelectorAll('.badge-pill')
        .forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  /* ── 5. Dark mode toggle ── */
  const darkBtn = document.getElementById('darkToggle');
  if (darkBtn) {
    darkBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const icon = darkBtn.querySelector('i');
      icon.classList.toggle('bi-moon');
      icon.classList.toggle('bi-sun');
    });
  }

});
