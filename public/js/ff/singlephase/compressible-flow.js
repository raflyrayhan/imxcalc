function calculateCompressible() {
  const L = parseFloat(document.getElementById('length').value);
  const Dmm = parseFloat(document.getElementById('diameter').value);
  const m = parseFloat(document.getElementById('massflow').value);
  const P1 = parseFloat(document.getElementById('pressure').value) * 1000; // kPa to Pa
  const T = parseFloat(document.getElementById('temp').value) + 273.15; // °C to K
  const MW = parseFloat(document.getElementById('MW').value);
  const f = parseFloat(document.getElementById('friction').value);

  const resultEl = document.getElementById('result');

  if ([L, Dmm, m, P1, T, MW, f].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please fill in all values with positive numbers.</div>";
    return;
  }

  const D = Dmm / 1000; // m
  const R = 8314.5; // J/kmol.K
  const Rsp = R / MW; // J/kg.K

  // Average velocity (simplified assumption)
  const rho = P1 / (Rsp * T);
  const A = Math.PI * D * D / 4;
  const v = m / (rho * A);

  // Compressible flow pressure drop (simplified Fanno-like approach)
  const dp = (4 * f * L * m * m) / (2 * rho * A * A * D);

  resultEl.innerHTML = `<strong>Estimated Pressure Drop:</strong><br><span style="font-size:1.4em;">${(dp / 1000).toFixed(2)} kPa</span>`;
}
