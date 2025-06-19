function calculateSmallGasOrifice() {
  const Q = parseFloat(document.getElementById("flowRate").value); // Nm³/h
  const T = parseFloat(document.getElementById("temp").value);     // °C
  const P1 = parseFloat(document.getElementById("inletPressure").value); // kPa
  const P2 = parseFloat(document.getElementById("outletPressure").value); // kPa
  const MW = parseFloat(document.getElementById("mw").value);      // kg/kmol
  const Cd = parseFloat(document.getElementById("Cd").value);      // Discharge Coefficient

  const resultEl = document.getElementById("result");

  // Validasi input
  if ([Q, T, P1, P2, MW, Cd].some(val => isNaN(val) || val <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers for all fields.</div>";
    return;
  }

  // Konstanta
  const R = 8314; // Universal gas constant J/kmol.K

  // Perhitungan tekanan rata-rata dan temperatur mutlak
  const T_K = T + 273.15;
  const Pavg = (P1 + P2) / 2;

  // Density gas (ρ) pada kondisi rata-rata (kg/m³)
  const rho = (Pavg * 1000 * MW) / (R * T_K);

  // Konversi Q ke m³/s
  const Q_actual = Q / 3600;

  // Kecepatan aliran melalui orifice (m/s)
  const v = Q_actual / (Math.PI / 4); // dummy area = 1 m² → D² = 4Q_actual/πv ⇒ akan dihitung ulang

  // Hitung diameter orifice
  const d = Math.cbrt((4 * Q_actual) / (Cd * Math.PI * Math.sqrt(2 * (P1 - P2) * 1000 / rho)));

  const A = (Math.PI / 4) * Math.pow(d, 2);
  const velocity = Q_actual / A;

  resultEl.innerHTML = `
    <b>Estimated Orifice Diameter:</b> ${d.toFixed(4)} m<br>
    <b>Flow Velocity through Orifice:</b> ${velocity.toFixed(2)} m/s<br>
    <b>Gas Density (ρ):</b> ${rho.toFixed(2)} kg/m³
  `;
}
