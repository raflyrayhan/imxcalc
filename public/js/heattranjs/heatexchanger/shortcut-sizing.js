function calculateShortcut() {
  const Q = parseFloat(document.getElementById('Q').value) * 1000; // kW to W
  const U = parseFloat(document.getElementById('U').value);
  const LMTD = parseFloat(document.getElementById('LMTD').value);

  const resultEl = document.getElementById('result');

  if ([Q, U, LMTD].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive values.</div>";
    return;
  }

  const A = Q / (U * LMTD); // m²

  resultEl.innerHTML = `
    <strong>Required Heat Transfer Area:</strong><br>
    <span style="font-size: 1.4em;">${A.toFixed(2)} m²</span>
  `;
}
