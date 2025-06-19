function calculateFittingLoss() {
  const v = parseFloat(document.getElementById('velocity').value);
  const Dmm = parseFloat(document.getElementById('diameter').value);
  const rho = parseFloat(document.getElementById('rho').value);
  const mu = parseFloat(document.getElementById('mu').value);
  const method = document.getElementById('method').value;
  const K1 = parseFloat(document.getElementById('k1').value);
  const K2 = parseFloat(document.getElementById('k2').value);
  const K3 = parseFloat(document.getElementById('k3').value);

  const resultEl = document.getElementById('result');
  if ([v, Dmm, rho, mu, K1, K2].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please fill in all values correctly.</div>";
    return;
  }

  const D = Dmm / 1000;
  const Re = (rho * v * D) / mu;

  let K;
  if (method === "3K") {
    K = K1 + K2 / Re + K3 / (Re * Re);
  } else {
    K = K1 + K2 / Re;
  }

  const dp = 0.5 * rho * v * v * K; // Pa
  resultEl.innerHTML = `
    <strong>Reynolds Number:</strong><br>
    <span style="font-size:1.4em">${Re.toFixed(0)}</span><br><br>
    <strong>K value:</strong><br>
    <span style="font-size:1.4em">${K.toFixed(4)}</span><br><br>
    <strong>Pressure Drop:</strong><br>
    <span style="font-size:1.4em">${(dp / 1000).toFixed(2)} kPa</span>
  `;
}
