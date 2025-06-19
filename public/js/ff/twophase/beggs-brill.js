function calculateBeggsBrill() {
  const D = parseFloat(document.getElementById('pipeDiameter').value) / 1000; // Convert mm to m
  const L = parseFloat(document.getElementById('pipeLength').value);
  const theta = parseFloat(document.getElementById('inclination').value) * Math.PI / 180; // Convert degrees to radians

  const Qg = parseFloat(document.getElementById('gasFlowRate').value) / 3600; // Convert m³/h to m³/s
  const rhog = parseFloat(document.getElementById('gasDensity').value);
  const mug = parseFloat(document.getElementById('gasViscosity').value) / 1000; // Convert cP to Pa·s

  const Ql = parseFloat(document.getElementById('liquidFlowRate').value) / 3600; // Convert m³/h to m³/s
  const rhol = parseFloat(document.getElementById('liquidDensity').value);
  const mul = parseFloat(document.getElementById('liquidViscosity').value) / 1000; // Convert cP to Pa·s

  const sigma = parseFloat(document.getElementById('surfaceTension').value) / 1000; // Convert dyne/cm to N/m

  const resultEl = document.getElementById('result');

  // Validate inputs
  if ([D, L, Qg, rhog, mug, Ql, rhol, mul, sigma].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers for all fields.</div>";
    return;
  }

  // Cross-sectional area
  const A = Math.PI * Math.pow(D, 2) / 4;

  // Superficial velocities
  const Vsg = Qg / A;
  const Vsl = Ql / A;
  const Vm = Vsg + Vsl;

  // No-slip liquid holdup
  const CL = Ql / (Ql + Qg);

  // Mixture Froude number
  const Frm = Math.pow(Vm, 2) / (9.81 * D);

  // Flow regime determination
  const L1 = 316 * Math.pow(CL, 0.302);
  const L2 = 0.0009252 * Math.pow(CL, -2.4684);
  const L3 = 0.1 * Math.pow(CL, -1.4516);
  const L4 = 0.5 * Math.pow(CL, -6.738);

  let flowRegime = '';
  if ((CL < 0.01 && Frm < L1) || (CL >= 0.01 && Frm < L2)) {
    flowRegime = 'Segregated';
  } else if ((CL >= 0.01 && Frm >= L2 && Frm <= L3)) {
    flowRegime = 'Transition';
  } else if ((CL >= 0.01 && CL < 0.4 && Frm > L3 && Frm <= L1) || (CL >= 0.4 && Frm > L3 && Frm <= L4)) {
    flowRegime = 'Intermittent';
  } else if ((CL < 0.4 && Frm > L1) || (CL >= 0.4 && Frm > L4)) {
    flowRegime = 'Distributed';
  } else {
    flowRegime = 'Unknown';
  }

  // Liquid holdup calculation
  let a, b, c;
  switch (flowRegime) {
    case 'Segregated':
      a = 0.98; b = 0.4846; c = 0.0868;
      break;
    case 'Intermittent':
      a = 0.845; b = 0.5351; c = 0.0173;
      break;
    case 'Distributed':
      a = 1.065; b = 0.5824; c = 0.0609;
      break;
    default:
      a = 0.98; b = 0.4846; c = 0.0868;
  }

  let EL0 = a * Math.pow(CL, b) / Math.pow(Frm, c);
  if (EL0 < CL) EL0 = CL;

  // Inclination correction
  let beta = 0;
  if (theta > 0) {
    // Uphill
    switch (flowRegime) {
      case 'Segregated':
        beta = (1 - CL) * Math.log(0.011 * Math.pow(CL, -3.768) * Math.pow(Vsl, 3.539) * Math.pow(Frm, -1.614));
        break;
      case 'Intermittent':
        beta = (1 - CL) * Math.log(2.96 * Math.pow(CL, 0.305) * Math.pow(Vsl, -0.4473) * Math.pow(Frm, 0.0978));
        break;
      case 'Distributed':
        beta = 0;
        break;
      default:
        beta = 0;
    }
  } else {
    // Downhill
    beta = (1 - CL) * Math.log(4.7 * Math.pow(CL, -0.3692) * Math.pow(Vsl, 0.1244) * Math.pow(Frm, -0.5056));
  }

  const Btheta = 1 + beta * (Math.sin(1.8 * theta) - (1 / 3) * Math.pow(Math.sin(1.8 * theta), 3));
  const ELtheta = Btheta * EL0;

  // Mixture density
  const rhom = rhol * ELtheta + rhog * (1 - ELtheta);

  // Pressure gradient due to elevation
  const dPdz_elevation = rhom * 9.81 * Math.sin(theta);

  // No-slip mixture properties
  const rhons = rhol * CL + rhog * (1 - CL);
  const muNS = mul * CL + mug * (1 - CL);

  const ReNS = rhons * Vm * D / muNS;

  // Friction factor calculation (using Blasius equation for turbulent flow)
  const fNS = 0.079 / Math.pow(ReNS, 0.25);

   const y = CL / Math.pow(ELtheta, 2);
  let S;
  if (y > 1 && y < 1.2) {
    S = Math.log(2.2 * y - 1.2);
  } else {
    const lnY = Math.log(y);
    S = lnY / (-0.0523 + 3.182 * lnY - 0.8725 * Math.pow(lnY, 2) + 0.01853 * Math.pow(lnY, 4));
  }

  resultEl.innerHTML = `
    <strong>Flow Regime:</strong> ${flowRegime}<br>
    <strong>Liquid Holdup (E<sub>Lθ</sub>):</strong> ${ELtheta.toFixed(4)}<br>
    <strong>Mixture Density:</strong> ${rhom.toFixed(2)} kg/m³<br>
    <strong>Elevation dP/dz:</strong> ${dPdz_elevation.toFixed(2)} Pa/m<br>
    <strong>Re<sub>NS</sub>:</strong> ${ReNS.toFixed(0)}<br>
    <strong>Friction Factor f<sub>NS</sub>:</strong> ${fNS.toFixed(4)}<br>
    <strong>S:</strong> ${S ? S.toFixed(4) : 'N/A'}
  `;
}
