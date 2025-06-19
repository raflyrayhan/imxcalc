function calculateHorizontalTwoPhase() {
  const D = parseFloat(document.getElementById('diameter').value) / 1000;
  const L = parseFloat(document.getElementById('length').value);
  const Qg = parseFloat(document.getElementById('gasFlow').value) / 3600;
  const Ql = parseFloat(document.getElementById('liquidFlow').value) / 3600;
  const rhog = parseFloat(document.getElementById('gasDensity').value);
  const rhol = parseFloat(document.getElementById('liquidDensity').value);
  const mug = parseFloat(document.getElementById('gasViscosity').value) / 1000;
  const mul = parseFloat(document.getElementById('liquidViscosity').value) / 1000;

  const resultEl = document.getElementById('result');

  if ([D, L, Qg, Ql, rhog, rhol, mug, mul].some(v => isNaN(v) || v <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers.</div>";
    return;
  }

  const A = Math.PI * D * D / 4;
  const Vsg = Qg / A;
  const Vsl = Ql / A;
  const Vm = Vsg + Vsl;

  const CL = Ql / (Qg + Ql);
  const Frm = Vm * Vm / (9.81 * D);

  let flowRegime = '';

  if (Frm < 0.3 && CL < 0.01) {
    flowRegime = 'Stratified Smooth';
  } else if (Frm < 0.3 && CL >= 0.01) {
    flowRegime = 'Stratified Wavy';
  } else if (Frm >= 0.3 && CL < 0.4) {
    flowRegime = 'Slug Flow';
  } else if (Frm >= 0.3 && CL >= 0.4) {
    flowRegime = 'Annular or Mist Flow';
  } else {
    flowRegime = 'Unknown';
  }

  const rhoM = rhog * (1 - CL) + rhol * CL;
  const muM = mug * (1 - CL) + mul * CL;
  const ReM = rhoM * Vm * D / muM;

  const f = 0.079 / Math.pow(ReM, 0.25);
  const dp = f * (L / D) * 0.5 * rhoM * Vm * Vm;

  resultEl.innerHTML = `
    <strong>Flow Regime:</strong> ${flowRegime}<br>
    <strong>Mixture Velocity:</strong> ${Vm.toFixed(2)} m/s<br>
    <strong>Re<sub>mixture</sub>:</strong> ${ReM.toFixed(0)}<br>
    <strong>Friction Factor:</strong> ${f.toFixed(4)}<br>
    <strong>Pressure Drop:</strong> ${(dp / 1000).toFixed(2)} kPa
  `;
}
