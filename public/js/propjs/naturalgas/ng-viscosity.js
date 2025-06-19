function calculateViscosity() {
  const P = parseFloat(document.getElementById('P').value);
  const T_f = parseFloat(document.getElementById('T').value);
  const SG = parseFloat(document.getElementById('SG').value);

  if (isNaN(P) || isNaN(T_f) || isNaN(SG)) {
    document.getElementById('result').innerHTML = "<span class='error-message'>Please enter valid input values.</span>";
    return;
  }

  const T = T_f + 459.67; // Convert °F to °R
  const M = SG * 28.967;  // Apparent molecular weight

  const K = ((9.379 + 0.01607 * M) * Math.pow(T, 1.5)) /
            (209.2 + 19.26 * M + T);

  const X = 3.448 + (986.4 / T) + 0.01009 * M;
  const Y = 2.447 - 0.2224 * X;

  const mu = 1e-4 * K * Math.exp(X * Math.pow(P, Y)); // μ in cP

  document.getElementById('result').innerHTML =
    `<b>Viscosity Calculation Result</b><br>
     Gas Viscosity (μ): <strong>${mu.toFixed(4)} cP</strong>`;
}
