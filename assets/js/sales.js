/* ═══════════════════════════════════════════
   PowerAdmin RTL - sales.js
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Sales Overview Chart (bar + line combo, dual axis) ── */
  const sCtx = document.getElementById('salesOverviewChart').getContext('2d');

  const gradientOrange = sCtx.createLinearGradient(0, 0, 0, 220);
  gradientOrange.addColorStop(0, 'rgba(249,115,22,.35)');
  gradientOrange.addColorStop(1, 'rgba(249,115,22,.04)');

  new Chart(sCtx, {
    data: {
      labels: ['۱','۲','۳','۴','۵','۶','۷','۸','۹','۱۰','۱۱','۱۲','۱۳','۱۴','۱۵',
                '۱۶','۱۷','۱۸','۱۹','۲۰','۲۱','۲۲','۲۳','۲۴','۲۵','۲۶','۲۷','۲۸','۲۹','۳۰'],
      datasets: [
        {
          type: 'bar',
          label: 'درآمد',
          data: [6,7,6.5,8,7.5,9,8.5,10,9.5,11,10.5,12,11.5,13,12.5,14,13.5,15,14.5,16,15.5,17,17.5,18,18.5,19,19.5,20,21,22],
          backgroundColor: gradientOrange,
          borderRadius: 4,
          maxBarThickness: 14,
          yAxisID: 'y',
        },
        {
          type: 'line',
          label: 'سفارشات',
          data: [60,65,62,72,68,80,76,88,84,95,90,102,98,108,104,114,110,120,116,126,122,132,136,142,146,152,158,164,178,205],
          borderColor: '#10B981',
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#10B981',
          tension: .4,
          fill: false,
          yAxisID: 'y1',
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
          callbacks: {
            label: ctx => ctx.dataset.yAxisID === 'y'
              ? ` درآمد: $${ctx.parsed.y}K`
              : ` سفارشات: ${ctx.parsed.y}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { font: { size: 10 }, color: '#6B7280', maxTicksLimit: 10 }
        },
        y: {
          position: 'left',
          grid: { color: '#F3F4F6' },
          border: { display: false },
          ticks: { font: { size: 11 }, color: '#6B7280', callback: v => `$${v}k` }
        },
        y1: {
          position: 'right',
          grid: { display: false },
          border: { display: false },
          ticks: { font: { size: 11 }, color: '#6B7280' }
        }
      }
    }
  });

  /* ── 2. Revenue by Category Donut ── */
  new Chart(document.getElementById('categoryDonutChart'), {
    type: 'doughnut',
    data: {
      labels: ['الکترونیک', 'صوتی', 'پوشیدنی', 'لوازم جانبی'],
      datasets: [{
        data: [569220, 127488, 74214, 29302],
        backgroundColor: ['#F97316', '#10B981', '#F59E0B', '#22D3EE'],
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
          callbacks: { label: ctx => ` ${ctx.label}: $${ctx.parsed.toLocaleString()}` }
        }
      }
    }
  });

  /* ── 3. Strip button active toggle ── */
  document.querySelectorAll('.strip-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      if (btn.getAttribute('href') === '#') e.preventDefault();
      document.querySelectorAll('.strip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ── 4. Dark mode toggle ── */
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
