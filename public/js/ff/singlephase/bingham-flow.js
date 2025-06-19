function calculateBingham() {
  const L = parseFloat(document.getElementById('length').value);
  const Dmm = parseFloat(document.getElementById('diameter').value);
  const v = parseFloat(document.getElementById('velocity').value);
  const tau0 = parseFloat(document.getElementById('tau0').value);
  const mu = parseFloat(document.getElementById('mu').value);

  const resultEl = document.getElementById('result');

  if ([L, Dmm, v, tau0, mu].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please fill in all values with positive numbers.</div>";
    return;
  }

  const D = Dmm / 1000; // mm to m

  // Pressure drop using Bingham model (simplified for laminar flow)
  const dp = (4 * tau0 / D + (32 * mu * v) / (D * D)) * L; // Pa
  const g = 9.80665;
  const headLoss = dp / (g * 1000); // in meters (assuming fluid density = 1000 kg/m³)

  resultEl.innerHTML = `
    <strong>Estimated Pressure Drop:</strong><br>
    <span style="font-size:1.4em">${(dp / 1000).toFixed(2)} kPa</span><br><br>
    <strong>Head Loss:</strong><br>
    <span style="font-size:1.4em">${headLoss.toFixed(2)} m</span>
  `;
}
