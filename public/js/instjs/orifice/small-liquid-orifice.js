function calculateSmallLiquidOrifice() {
  const Q_m3h = parseFloat(document.getElementById("Q").value);
  const P1 = parseFloat(document.getElementById("P1").value);
  const P2 = parseFloat(document.getElementById("P2").value);
  const rho = parseFloat(document.getElementById("rho").value);
  const Cd = parseFloat(document.getElementById("Cd").value);

  const resultEl = document.getElementById("result");

  if ([Q_m3h, P1, P2, rho, Cd].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter all fields with valid positive numbers.</div>";
    return;
  }

  const Q = Q_m3h / 3600; // Convert to m³/s
  const dP = (P1 - P2) * 1000; // Convert kPa to Pa

  if (dP <= 0) {
    resultEl.innerHTML = "<div class='error-message'>Pressure drop must be positive (P1 > P2).</div>";
    return;
  }

  const A = Q / (Cd * Math.sqrt(2 * dP / rho)); // Area in m²
  const d = 2 * Math.sqrt(A / Math.PI); // Diameter in meters

  resultEl.innerHTML = `
    <b>Results:</b><br>
    Pressure Drop: ${dP.toFixed(0)} Pa<br>
    Orifice Area: ${(A * 1e6).toFixed(2)} mm²<br>
    Orifice Diameter: ${(d * 1000).toFixed(2)} mm
  `;
}
