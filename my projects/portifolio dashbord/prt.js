// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

  // Chart.js Example
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Portfolio', 'Weather App', 'Task Manager', 'Recipe Finder'],
      datasets: [{
        label: 'Views',
        data: [1200, 890, 1500, 300],
        backgroundColor: '#6c63ff',
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  // Table Filter
  function filterTable() {
    const input = document.querySelector('.search-input').value.toLowerCase();
    const rows = document.querySelectorAll('#portfolioTable tbody tr');
    rows.forEach(row => {
      const name = row.querySelector('td').textContent.toLowerCase();
      row.style.display = name.includes(input) ? '' : 'none';
    });
  }