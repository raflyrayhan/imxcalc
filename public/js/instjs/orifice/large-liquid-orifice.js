function calculateLargeLiquidOrifice() {
  const d_mm = parseFloat(document.getElementById('dOrifice').value);
  const rho = parseFloat(document.getElementById('rho').value);
  const dp_kPa = parseFloat(document.getElementById('dp').value);
  const Cd = parseFloat(document.getElementById('Cd').value);

  const resultEl = document.getElementById('result');

  if ([d_mm, rho, dp_kPa, Cd].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive inputs.</div>";
    return;
  }

  const d = d_mm / 1000; // Convert mm to m
  const A = Math.PI * Math.pow(d, 2) / 4;
  const dp_Pa = dp_kPa * 1000;

  const Q = Cd * A * Math.sqrt(2 * dp_Pa / rho); // m³/s
  const Q_m3h = Q * 3600;

  resultEl.innerHTML = `
    <b>Results:</b><br>
    Orifice Area: ${(A * 1e4).toFixed(2)} cm²<br>
    Flow Rate: ${Q.toFixed(4)} m³/s (${Q_m3h.toFixed(2)} m³/h)
  `;
}
