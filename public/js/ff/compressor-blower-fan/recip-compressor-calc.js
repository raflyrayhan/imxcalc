function calculateRecipCompressor() {
  const bore = parseFloat(document.getElementById('bore').value) / 1000; // mm to m
  const stroke = parseFloat(document.getElementById('stroke').value) / 1000;
  const rpm = parseFloat(document.getElementById('n').value);
  const nCyl = parseFloat(document.getElementById('nCyl').value);
  const clearance = parseFloat(document.getElementById('clearance').value) / 100;
  const P1 = parseFloat(document.getElementById('P1').value);
  const P2 = parseFloat(document.getElementById('P2').value);

  const resultEl = document.getElementById('result');

  if ([bore, stroke, rpm, nCyl, clearance, P1, P2].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive values.</div>";
    return;
  }

  const A = Math.PI * Math.pow(bore / 2, 2); // m²
  const Vs = A * stroke; // m³ per stroke
  const Vdisp = Vs * rpm * nCyl / 2 * 3600; // m³/h

  const r = P2 / P1;
  const volumetricEff = (1 + clearance - clearance * Math.pow(r, 1 / 1.4)); // ideal for single stage

  const Vactual = Vdisp * volumetricEff;

  resultEl.innerHTML = `
    <strong>Swept Volume per Cylinder:</strong><br>
    <span style="font-size:1.4em">${(Vs * 1e6).toFixed(2)} cm³</span><br><br>

    <strong>Total Displacement Volume:</strong><br>
    <span style="font-size:1.4em">${Vdisp.toFixed(2)} m³/h</span><br><br>

    <strong>Volumetric Efficiency:</strong><br>
    <span style="font-size:1.4em">${(volumetricEff * 100).toFixed(2)}%</span><br><br>

    <strong>Actual Capacity:</strong><br>
    <span style="font-size:1.4em">${Vactual.toFixed(2)} m³/h</span>
  `;
}
