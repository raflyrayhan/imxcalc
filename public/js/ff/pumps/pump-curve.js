function analyzePumpCurve() {
  const Q = parseFloat(document.getElementById('Q').value);         // m³/h
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const c = parseFloat(document.getElementById('c').value);
  const eff = parseFloat(document.getElementById('eff').value);
  const rho = parseFloat(document.getElementById('density').value);

  const resultEl = document.getElementById('result');

  if ([Q, a, b, c, eff, rho].some(x => isNaN(x))) {
    resultEl.innerHTML = "<div class='error-message'>Please fill in all required values correctly.</div>";
    return;
  }

  const Qs = Q / 3600; // m³/h to m³/s
  const H = a * Q * Q + b * Q + c; // Head from curve in meters
  const g = 9.80665;

  const P_hydraulic = rho * g * H * Qs; // W
  const P_brake = P_hydraulic / (eff / 100); // W

  resultEl.innerHTML = `
    <strong>Head at ${Q.toFixed(2)} m³/h:</strong><br>
    <span style="font-size:1.4em">${H.toFixed(2)} m</span><br><br>

    <strong>Hydraulic Power:</strong><br>
    <span style="font-size:1.4em">${(P_hydraulic / 1000).toFixed(2)} kW</span><br><br>

    <strong>Brake Power:</strong><br>
    <span style="font-size:1.4em">${(P_brake / 1000).toFixed(2)} kW</span>
  `;
}
