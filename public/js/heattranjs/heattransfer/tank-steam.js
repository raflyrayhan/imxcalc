function calculateTankSteam() {
  const U = parseFloat(document.getElementById('U').value);
  const A = parseFloat(document.getElementById('A').value);
  const Ts = parseFloat(document.getElementById('T_steam').value);
  const Tl = parseFloat(document.getElementById('T_liquid').value);
  const hfg = parseFloat(document.getElementById('hfg').value); // in kJ/kg

  const resultEl = document.getElementById('result');

  if ([U, A, Ts, Tl, hfg].some(v => isNaN(v) || v <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive values.</div>";
    return;
  }

  const Q = U * A * (Ts - Tl); // in Watts
  const steam_kg_hr = (Q * 3600) / (hfg * 1000); // convert to kg/h

  resultEl.innerHTML = `
    <strong>Heat Transfer Rate (Q):</strong> ${(Q / 1000).toFixed(2)} kW<br>
    <strong>Required Steam Flow:</strong> ${steam_kg_hr.toFixed(2)} kg/h
  `;
}
