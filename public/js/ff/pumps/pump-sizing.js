function calculatePumpPower() {
  const Q = parseFloat(document.getElementById('flow').value) / 3600; // m³/h to m³/s
  const H = parseFloat(document.getElementById('head').value);
  const rho = parseFloat(document.getElementById('density').value);
  const eff = parseFloat(document.getElementById('eff').value);

  const resultEl = document.getElementById('result');

  if ([Q, H, rho, eff].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers.</div>";
    return;
  }

  const g = 9.80665; // m/s²
  const P_hydraulic = rho * g * H * Q; // Watts
  const P_brake = P_hydraulic / (eff / 100); // Watts

  resultEl.innerHTML = `
    <strong>Hydraulic Power:</strong><br>
    <span style="font-size:1.4em">${(P_hydraulic / 1000).toFixed(2)} kW</span><br><br>
    <strong>Brake Power:</strong><br>
    <span style="font-size:1.4em">${(P_brake / 1000).toFixed(2)} kW</span>
  `;
}
