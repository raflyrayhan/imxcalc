function calculateLargeGasOrifice() {
  const P1 = parseFloat(document.getElementById('P1').value) * 1e5; // bar to Pa
  const T = parseFloat(document.getElementById('T').value);         // K
  const MW = parseFloat(document.getElementById('MW').value);       // g/mol
  const Z = parseFloat(document.getElementById('Z').value);
  const d = parseFloat(document.getElementById('d').value) / 1000;  // mm to m
  const Cd = parseFloat(document.getElementById('Cd').value);

  const resultEl = document.getElementById('result');

  if ([P1, T, MW, Z, d, Cd].some(v => isNaN(v) || v <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive values.</div>";
    return;
  }

  const R = 8314; // J/kmol.K

  const A = Math.PI * Math.pow(d, 2) / 4;
  const Q = Cd * A * P1 * Math.sqrt((2 * MW) / (R * Z * T)); // kg/s

  resultEl.innerHTML = `
    <strong>Orifice Area:</strong> ${(A * 1e4).toFixed(2)} cm²<br>
    <strong>Mass Flowrate:</strong> ${Q.toFixed(3)} kg/s
  `;
}
