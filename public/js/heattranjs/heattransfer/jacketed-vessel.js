function calculateJacketedVessel() {
  const U = parseFloat(document.getElementById('U').value);
  const A = parseFloat(document.getElementById('A').value);
  const Tj = parseFloat(document.getElementById('T_jacket').value);
  const Tt = parseFloat(document.getElementById('T_tank').value);

  const resultEl = document.getElementById('result');

  if ([U, A, Tj, Tt].some(v => isNaN(v) || v <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers.</div>";
    return;
  }

  const Q = U * A * (Tj - Tt); // in Watts
  resultEl.innerHTML = `
    <strong>Heat Transfer Rate (Q):</strong> ${(Q / 1000).toFixed(2)} kW<br>
    <em>Based on U × A × ΔT</em>
  `;
}
