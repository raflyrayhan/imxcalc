function calculatePowerLaw() {
  const L = parseFloat(document.getElementById('length').value);
  const Dmm = parseFloat(document.getElementById('diameter').value);
  const v = parseFloat(document.getElementById('velocity').value);
  const k = parseFloat(document.getElementById('k').value);
  const n = parseFloat(document.getElementById('n').value);

  const resultEl = document.getElementById('result');

  if ([L, Dmm, v, k, n].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please fill in all values with positive numbers.</div>";
    return;
  }

  const D = Dmm / 1000; // mm to m
  const dp = (2 * k * Math.pow((3 * v) / D, n) * (L / D)); // Pa

  const g = 9.80665;
  const headLoss = dp / (g * 1000); // m of fluid column (assuming 1000 kg/m³ fluid)

  resultEl.innerHTML = `
    <strong>Estimated Pressure Drop:</strong><br>
    <span style="font-size:1.4em">${(dp / 1000).toFixed(2)} kPa</span><br><br>
    <strong>Head Loss (approx):</strong><br>
    <span style="font-size:1.4em">${headLoss.toFixed(2)} m</span>
  `;
}
