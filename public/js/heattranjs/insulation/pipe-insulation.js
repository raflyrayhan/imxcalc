function calculatePipeInsulation() {
  const T1 = parseFloat(document.getElementById('T1').value) + 273.15;
  const T2 = parseFloat(document.getElementById('T2').value) + 273.15;
  const k = parseFloat(document.getElementById('k').value);
  const r1 = parseFloat(document.getElementById('r1').value) / 1000;
  const r2 = parseFloat(document.getElementById('r2').value) / 1000;
  const L = parseFloat(document.getElementById('L').value);

  const resultEl = document.getElementById('result');

  if ([T1, T2, k, r1, r2, L].some(x => isNaN(x) || x <= 0) || r2 <= r1) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers (r₂ must be > r₁).</div>";
    return;
  }

  const q = (2 * Math.PI * k * (T1 - T2)) / Math.log(r2 / r1);
  const Q = q * L;

  resultEl.innerHTML = `
    <strong>Linear Heat Loss (q):</strong> ${q.toFixed(2)} W/m<br>
    <strong>Total Heat Loss (Q):</strong> ${Q.toFixed(2)} W
  `;
}
