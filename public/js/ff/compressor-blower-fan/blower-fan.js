function calculateFanPower() {
  const Q = parseFloat(document.getElementById('flow').value);
  const SP = parseFloat(document.getElementById('sp').value);
  const fanEff = parseFloat(document.getElementById('fanEff').value) / 100;
  const beltEff = parseFloat(document.getElementById('beltEff').value) / 100;
  const motorEff = parseFloat(document.getElementById('motorEff').value) / 100;
  const driveEff = parseFloat(document.getElementById('driveEff').value) / 100;

  const resultEl = document.getElementById('result');

  if ([Q, SP, fanEff, beltEff, motorEff, driveEff].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers.</div>";
    return;
  }

  const eta = fanEff * beltEff * motorEff * driveEff;
  const power_hp = (Q * SP) / (6356 * eta);
  const power_kW = power_hp * 0.7457;

  resultEl.innerHTML = `
    <strong>Fan Power:</strong><br>
    <span style="font-size:1.4em">${power_hp.toFixed(2)} hp</span><br><br>
    <strong>Fan Power:</strong><br>
    <span style="font-size:1.4em">${power_kW.toFixed(2)} kW</span>
  `;
}
