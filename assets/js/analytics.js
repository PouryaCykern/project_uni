/* ═══════════════════════════════════════════
   PowerAdmin RTL - analytics.js
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Traffic Overview Chart (dual area line) ── */
  const tCtx = document.getElementById('trafficOverviewChart').getContext('2d');

  const gradientOrange = tCtx.createLinearGradient(0, 0, 0, 220);
  gradientOrange.addColorStop(0, 'rgba(249,115,22,.28)');
  gradientOrange.addColorStop(1, 'rgba(249,115,22,.02)');

  const gradientGreen = tCtx.createLinearGradient(0, 0, 0, 220);
  gradientGreen.addColorStop(0, 'rgba(16,185,129,.28)');
  gradientGreen.addColorStop(1, 'rgba(16,185,129,.02)');

  new Chart(tCtx, {
    type: 'line',
    data: {
      labels: Array.from({length: 30}, (_, i) => (i + 1).toLocaleString('fa-IR')),
      datasets: [
        {
          label: 'بازدیدکنندگان',
          data: [5,6,5.5,7,6.5,7.5,7,8,8.5,8,9,9.5,9,10,10.5,10,11,11.5,12,11.5,12.5,13,13.5,13,14,14.5,15,14.5,15.5,16],
          borderColor: '#F97316',
          backgroundColor: gradientOrange,
          borderWidth: 2.5,
          fill: true,
          tension: .4,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#F97316',
        },
        {
          label: 'بازدید صفحات',
          data: [9,11,10.5,13,12,14,13.5,16,17,16,18,19,18.5,21,22,21,24,25,26,25,27,29,30,29,32,33,35,34,37,42],
          borderColor: '#10B981',
          backgroundColor: gradientGreen,
          borderWidth: 2.5,
          fill: true,
          tension: .4,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#10B981',
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
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}k` }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { font: { size: 10 }, color: '#6B7280', maxTicksLimit: 10 }
        },
        y: {
          grid: { color: '#F3F4F6' },
          border: { display: false },
          ticks: { font: { size: 11 }, color: '#6B7280', callback: v => `${v}k` }
        }
      }
    }
  });

  /* ── 2. Traffic Sources Donut ── */
  new Chart(document.getElementById('trafficSourceDonutChart'), {
    type: 'doughnut',
    data: {
      labels: ['جستجوی ارگانیک', 'مستقیم', 'شبکه‌های اجتماعی', 'ارجاعی', 'ایمیل'],
      datasets: [{
        data: [45.2, 24.8, 15.3, 10.5, 4.2],
        backgroundColor: ['#F97316', '#10B981', '#F59E0B', '#0891B2', '#EF4444'],
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

  /* ── 3. Real-time Visitors sparkline ── */
  const rCtx = document.getElementById('realtimeChart').getContext('2d');
  const gradientRT = rCtx.createLinearGradient(0, 0, 0, 100);
  gradientRT.addColorStop(0, 'rgba(249,115,22,.25)');
  gradientRT.addColorStop(1, 'rgba(249,115,22,.01)');

  new Chart(rCtx, {
    type: 'line',
    data: {
      labels: Array.from({length: 40}, (_, i) => i),
      datasets: [{
        data: [20,22,21,24,23,26,28,27,30,29,32,31,30,33,35,34,37,36,39,41,40,43,42,45,44,47,49,48,51,50,53,55,54,57,59,58,61,63,65,68],
        borderColor: '#F97316',
        backgroundColor: gradientRT,
        borderWidth: 2,
        fill: true,
        tension: .4,
        pointRadius: 0,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });

  /* ── 4. Strip button active toggle ── */
  document.querySelectorAll('.strip-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      if (btn.getAttribute('href') === '#') e.preventDefault();
      document.querySelectorAll('.strip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ── 5. Period pills (Daily / Weekly / Monthly) ── */
  document.querySelectorAll('.badge-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      pill.closest('.d-flex').querySelectorAll('.badge-pill')
        .forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  /* ── 6. Dark mode toggle ── */
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
