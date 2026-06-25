const packagePrice = 399;
const form = document.querySelector('#calculator-form');
const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });

function calculate() {
  const jobValue = Math.max(0, Number(document.querySelector('#job-value').value));
  const margin = Math.min(100, Math.max(0, Number(document.querySelector('#margin').value))) / 100;
  const monthlyCustomers = Math.max(0, Number(document.querySelector('#customers').value));
  const profit = jobValue * margin;
  const customersNeeded = profit > 0 ? Math.ceil(packagePrice / profit) : 0;
  const months = monthlyCustomers > 0 ? customersNeeded / monthlyCustomers : 0;

  document.querySelector('#profit-per-customer').textContent = money.format(profit);
  document.querySelector('#customers-needed').textContent = customersNeeded || '—';
  document.querySelector('#months-needed').textContent = months ? `${months.toFixed(months < 10 ? 1 : 0)} months` : '—';
}

form.addEventListener('submit', (event) => { event.preventDefault(); calculate(); });
form.addEventListener('input', calculate);
calculate();
