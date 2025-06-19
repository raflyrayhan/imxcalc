function calculateBatch() {
  const m = parseFloat(document.getElementById('mass').value);
  const cp = parseFloat(document.getElementById('cp').value);
  const T1 = parseFloat(document.getElementById('T_initial').value);
  const T2 = parseFloat(document.getElementById('T_final').value);
  const P = parseFloat(document.getElementById('power').value); // in kW

  const resultEl = document.getElementById('result');

  if ([m, cp, T1, T2, P].some(v => isNaN(v) || v <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers.</div>";
    return;
  }

  const Q = m * cp * (T2 - T1);           // in Joules
  const Q_kWh = Q / 3.6e6;                // convert to kWh
  const time_hr = Q_kWh / P;              // time in hours
  const time_min = time_hr * 60;

  resultEl.innerHTML = `
    <strong>Heat Energy Required (Q):</strong> ${Q.toFixed(0)} J (${Q_kWh.toFixed(2)} kWh)<br>
    <strong>Estimated Time:</strong> ${time_min.toFixed(1)} minutes
  `;
}
