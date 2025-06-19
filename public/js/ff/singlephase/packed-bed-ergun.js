function calculateErgun() {
  const L = parseFloat(document.getElementById('length').value);
  const v = parseFloat(document.getElementById('velocity').value);
  const d_p_mm = parseFloat(document.getElementById('diameter').value);
  const eps = parseFloat(document.getElementById('porosity').value);
  const rho = parseFloat(document.getElementById('density').value);
  const mu = parseFloat(document.getElementById('viscosity').value);

  const resultEl = document.getElementById('result');

  if ([L, v, d_p_mm, eps, rho, mu].some(x => isNaN(x) || x <= 0 || eps >= 1)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers (0 < porosity < 1).</div>";
    return;
  }

  const d_p = d_p_mm / 1000; // mm to m

  const A = (150 * mu * (1 - eps) ** 2 * v) / (d_p ** 2 * eps ** 3);
  const B = (1.75 * rho * (1 - eps) * v ** 2) / (d_p * eps ** 3);

  const dp = (A + B) * L; // Pa

  resultEl.innerHTML = `
    <strong>Estimated Pressure Drop:</strong><br>
    <span style="font-size:1.4em">${(dp / 1000).toFixed(2)} kPa</span>
  `;
}
