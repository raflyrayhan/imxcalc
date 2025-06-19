function calculateGasFlow() {
  const P1 = parseFloat(document.getElementById('P1').value);
  const P2 = parseFloat(document.getElementById('P2').value);
  const T = parseFloat(document.getElementById('T').value) + 273.15; // °C to K
  const L = parseFloat(document.getElementById('L').value) * 1000;   // km to m
  const Z = parseFloat(document.getElementById('Z').value);
  const Dmm = parseFloat(document.getElementById('D').value);
  const C = parseFloat(document.getElementById('C').value);

  const resultEl = document.getElementById('result');

  if ([P1, P2, T, L, Z, Dmm, C].some(x => isNaN(x) || x <= 0) || P2 >= P1) {
    resultEl.innerHTML = "<div class='error-message'>Please ensure valid input values (P₁ > P₂, and all > 0).</div>";
    return;
  }

  const D = Dmm / 1000;
  const dPow = Math.pow(D, 2.667);
  const dp = Math.sqrt(P1 * P1 - P2 * P2);

  const Q = (C * dPow * dp) / (L * Math.sqrt(T) * Z); // standard flowrate (unitless Q coefficient)

  resultEl.innerHTML = `
    <strong>Estimated Gas Flowrate:</strong><br>
    <span style="font-size:1.4em">${Q.toFixed(2)} (unit depends on coefficient)</span><br><br>
    <em>Note: Use appropriate C value to get result in SCFH or Nm³/h.</em>
  `;
}
