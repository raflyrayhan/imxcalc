function calculatePressureDrop() {
  const L = parseFloat(document.getElementById('length').value);
  const Dmm = parseFloat(document.getElementById('diameter').value);
  const v = parseFloat(document.getElementById('velocity').value);
  const rho = parseFloat(document.getElementById('density').value);
  const f = parseFloat(document.getElementById('friction').value);

  const resultEl = document.getElementById('result');

  if ([L, Dmm, v, rho, f].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please fill in all values with positive numbers.</div>";
    return;
  }

  const D = Dmm / 1000; // mm to m
  const dp = f * (L / D) * 0.5 * rho * v * v; // Pa

  resultEl.innerHTML = `<strong>Pressure Drop:</strong><br><span style="font-size:1.4em">${(dp / 1000).toFixed(2)} kPa</span>`;
}
