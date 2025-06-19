function calculateDPHE() {
  const hi = parseFloat(document.getElementById('hi').value);
  const ho = parseFloat(document.getElementById('ho').value);
  const k = parseFloat(document.getElementById('k').value);
  const di = parseFloat(document.getElementById('di').value) / 1000;
  const do_ = parseFloat(document.getElementById('do').value) / 1000;
  const L = parseFloat(document.getElementById('L').value);

  const Th_in = parseFloat(document.getElementById('T_hot_in').value);
  const Th_out = parseFloat(document.getElementById('T_hot_out').value);
  const Tc_in = parseFloat(document.getElementById('T_cold_in').value);
  const Tc_out = parseFloat(document.getElementById('T_cold_out').value);

  const m = parseFloat(document.getElementById('flowRate').value) / 3600;
  const cp = parseFloat(document.getElementById('cp').value);

  const resultEl = document.getElementById('result');

  if ([hi, ho, k, di, do_, L, Th_in, Th_out, Tc_in, Tc_out, m, cp].some(v => isNaN(v) || v <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers.</div>";
    return;
  }

  const Rw = Math.log(do_ / di) / (2 * Math.PI * k * L);
  const Rt = 1 / (hi * Math.PI * di * L);
  const Ro = 1 / (ho * Math.PI * do_ * L);
  const U = 1 / (Rt + Rw + Ro);

  const deltaT1 = Th_in - Tc_out;
  const deltaT2 = Th_out - Tc_in;
  const LMTD = (deltaT1 - deltaT2) / Math.log(deltaT1 / deltaT2);

  const A = Math.PI * di * L;
  const Q = U * A * LMTD;
  const Qactual = m * cp * (Th_in - Th_out);

  resultEl.innerHTML = `
    <strong>Overall Heat Transfer Coefficient (U):</strong> ${U.toFixed(2)} W/m²·K<br>
    <strong>LMTD:</strong> ${LMTD.toFixed(2)} K<br>
    <strong>Heat Transfer Area:</strong> ${A.toFixed(2)} m²<br>
    <strong>Heat Duty (from U·A·ΔT):</strong> ${(Q / 1000).toFixed(2)} kW<br>
    <strong>Heat Duty (from m·Cp·ΔT):</strong> ${(Qactual / 1000).toFixed(2)} kW
  `;
}
