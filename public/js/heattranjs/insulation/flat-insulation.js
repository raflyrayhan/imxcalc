function calculateFlatInsulation() {
  const T1 = parseFloat(document.getElementById('T1').value) + 273.15;
  const T2 = parseFloat(document.getElementById('T2').value) + 273.15;
  const k = parseFloat(document.getElementById('k').value);
  const t = parseFloat(document.getElementById('t').value) / 1000; // mm to m
  const A = parseFloat(document.getElementById('A').value);

  const resultEl = document.getElementById('result');

  if ([T1, T2, k, t, A].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers.</div>";
    return;
  }

  const q = (k * (T1 - T2)) / t;       // W/m²
  const Q = q * A;                     // total W

  resultEl.innerHTML = `
    <strong>Heat Flux (q):</strong> ${q.toFixed(2)} W/m²<br>
    <strong>Total Heat Loss (Q):</strong> ${Q.toFixed(2)} W
  `;
}
