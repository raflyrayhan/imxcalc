function calculateBell() {
  const ṁt = parseFloat(document.getElementById('mTube').value) / 3600;
  const cpt = parseFloat(document.getElementById('cpTube').value);
  const μt = parseFloat(document.getElementById('muTube').value);
  const ρt = parseFloat(document.getElementById('rhoTube').value);
  const di = parseFloat(document.getElementById('dIn').value) / 1000;
  const Nt = parseFloat(document.getElementById('nTubes').value);
  const Lt = parseFloat(document.getElementById('lTube').value);

  const ṁs = parseFloat(document.getElementById('mShell').value) / 3600;
  const cps = parseFloat(document.getElementById('cpShell').value);
  const μs = parseFloat(document.getElementById('muShell').value);
  const ρs = parseFloat(document.getElementById('rhoShell').value);
  const Ds = parseFloat(document.getElementById('dShell').value) / 1000;
  const B = parseFloat(document.getElementById('baffle').value) / 1000;

  const kw = parseFloat(document.getElementById('kWall').value);
  const tw = parseFloat(document.getElementById('tWall').value) / 1000;
  const Rft = parseFloat(document.getElementById('rfTube').value);
  const Rfs = parseFloat(document.getElementById('rfShell').value);

  const T1 = parseFloat(document.getElementById('t1').value) + 273.15;
  const T2 = parseFloat(document.getElementById('t2').value) + 273.15;
  const T3 = parseFloat(document.getElementById('t3').value) + 273.15;
  const T4 = parseFloat(document.getElementById('t4').value) + 273.15;

  const At = Math.PI * Math.pow(di, 2) / 4 * Nt;
  const Vt = ṁt / ρt;
  const ut = Vt / At;

  const Re_tube = (ρt * ut * di) / μt;
  const Pr_tube = (μt * cpt) / kw;
  const Nu_tube = 0.023 * Math.pow(Re_tube, 0.8) * Math.pow(Pr_tube, 0.4);
  const h_tube = (Nu_tube * kw) / di;

  const De_shell = 1.27 * (di); // simplifikasi
  const A_shell = Ds * B;
  const us = ṁs / (ρs * A_shell);
  const Re_shell = (ρs * us * De_shell) / μs;
  const Pr_shell = (μs * cps) / kw;
  const Nu_shell = 0.023 * Math.pow(Re_shell, 0.8) * Math.pow(Pr_shell, 0.3);
  const h_shell = (Nu_shell * kw) / De_shell;

  const Rw = tw / kw;
  const U = 1 / (1 / h_tube + Rft + Rw + Rfs + 1 / h_shell);

  const ΔT1 = T3 - T2;
  const ΔT2 = T4 - T1;
  const LMTD = (ΔT1 - ΔT2) / Math.log(ΔT1 / ΔT2);
  const A = Math.PI * di * Nt * Lt;
  const Q = U * A * LMTD;

  document.getElementById('result').innerHTML = `
    <strong>Tube Side Re:</strong> ${Re_tube.toFixed(0)}<br>
    <strong>Shell Side Re:</strong> ${Re_shell.toFixed(0)}<br>
    <strong>U (Overall):</strong> ${U.toFixed(2)} W/m²·K<br>
    <strong>Heat Transfer Area:</strong> ${A.toFixed(2)} m²<br>
    <strong>LMTD:</strong> ${LMTD.toFixed(2)} K<br>
    <strong>Estimated Heat Duty:</strong> ${(Q / 1000).toFixed(2)} kW
  `;
}
