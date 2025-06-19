function calculatePsvVapor() {
  const Q = parseFloat(document.getElementById('Q').value);     // kW
  const k = parseFloat(document.getElementById('Cp').value);    // Specific heat ratio
  const T = parseFloat(document.getElementById('T').value);     // Temperature in K
  const MW = parseFloat(document.getElementById('MW').value);   // Molecular weight
  const Kd = parseFloat(document.getElementById('Kd').value);
  const Z = parseFloat(document.getElementById('Z').value);
  const P = parseFloat(document.getElementById('P').value);     // bar abs

  const resultEl = document.getElementById('result');

  if ([Q, k, T, MW, Kd, Z, P].some(v => isNaN(v) || v <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers.</div>";
    return;
  }

  // Universal gas constant in J/kmol·K
  const R = 8314;

  // Convert Q to J/s
  const Qj = Q * 1000;

  // Critical flow constant (API formulation)
  const C = Math.sqrt(k * Math.pow(2 / (k + 1), (k + 1) / (k - 1)));

  // Mass flow rate W = Q / (Cp * ΔT) → simplified here using constant latent heat approximation
  const W = Qj / (2257000); // Assuming steam or similar: ~2257 kJ/kg

  // Required area A
  const A = (W * Math.sqrt(T * Z * MW)) / (C * Kd * P * 100000); // in m²

  resultEl.innerHTML = `
    <strong>Mass Flowrate:</strong> ${W.toFixed(2)} kg/s<br>
    <strong>Required PSV Area:</strong> ${(A * 1e4).toFixed(2)} cm²
  `;
}
