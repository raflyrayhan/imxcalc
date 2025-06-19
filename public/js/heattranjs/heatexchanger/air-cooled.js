function calculateAC() {
  const Q = parseFloat(document.getElementById('Q').value) * 1000; // kW → W
  const T_proc_in = parseFloat(document.getElementById('T_process_in').value);
  const T_proc_out = parseFloat(document.getElementById('T_process_out').value);
  const T_air_in = parseFloat(document.getElementById('T_air_in').value);
  const U = parseFloat(document.getElementById('U').value);
  const m = parseFloat(document.getElementById('m').value) / 3600; // kg/h to kg/s
  const cp = parseFloat(document.getElementById('cp').value);

  const resultEl = document.getElementById('result');

  if ([Q, T_proc_in, T_proc_out, T_air_in, U, m, cp].some(v => isNaN(v) || v <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive values.</div>";
    return;
  }

  const T_air_out = T_air_in + (Q / (m * cp));
  const ΔT1 = T_proc_out - T_air_in;
  const ΔT2 = T_proc_in - T_air_out;
  const LMTD = (ΔT1 - ΔT2) / Math.log(ΔT1 / ΔT2);

  const A = Q / (U * LMTD);

  resultEl.innerHTML = `
    <strong>Estimated Air Outlet Temp:</strong> ${T_air_out.toFixed(2)} °C<br>
    <strong>LMTD:</strong> ${LMTD.toFixed(2)} K<br>
    <strong>Required Surface Area:</strong> ${A.toFixed(2)} m²
  `;
}
