function calculatePsvLiquid() {
  const Q = parseFloat(document.getElementById('Q').value);         // in kW
  const Hvap = parseFloat(document.getElementById('Hvap').value);   // in kJ/kg
  const Kd = parseFloat(document.getElementById('Kd').value);
  const ρ = parseFloat(document.getElementById('density').value);   // kg/m³

  const resultEl = document.getElementById('result');

  if ([Q, Hvap, Kd, ρ].some(v => isNaN(v) || v <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers.</div>";
    return;
  }

  // Convert heat to W (kW to W)
  const massFlow = (Q * 1000) / (Hvap * 1000); // kg/s
  const volumetricFlow = massFlow / ρ; // m³/s

  // From API 520 formula for liquid: A = (Q / (Kd * sqrt(ρ))) * C
  // For simplified case, use: A = volumetricFlow / (Kd * 0.61 * sqrt(2g))
  const area = volumetricFlow / (Kd * Math.sqrt(2 * 9.81 / ρ)); // m²

  resultEl.innerHTML = `
    <strong>Mass Flowrate:</strong> ${massFlow.toFixed(3)} kg/s<br>
    <strong>Required PSV Area:</strong> ${(area * 1e4).toFixed(2)} cm²
  `;
}
