function calculateRecipRating() {
  const P1 = parseFloat(document.getElementById('P1').value) * 1000;
  const P2 = parseFloat(document.getElementById('P2').value) * 1000;
  const T1 = parseFloat(document.getElementById('T1').value) + 273.15;
  const flowNm3 = parseFloat(document.getElementById('flowNm3').value);
  const k = parseFloat(document.getElementById('k').value);
  const MW = parseFloat(document.getElementById('MW').value);
  const eff = parseFloat(document.getElementById('eff').value) / 100;

  const resultEl = document.getElementById('result');

  if ([P1, P2, T1, flowNm3, k, MW, eff].some(x => isNaN(x) || x <= 0)) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive values.</div>";
    return;
  }

  const R = 8314.5; // J/kmol.K
  const Rsp = R / MW; // J/kg.K

  const rho1 = P1 / (Rsp * T1); // inlet density (kg/m³)
  const flowActual = (flowNm3 / 3600) * (273.15 / T1) * (P1 / 101325); // Nm³/h → actual m³/s
  const massFlow = flowActual * rho1; // kg/s

  const n = k; // assume isentropic
  const power = (n / (n - 1)) * massFlow * Rsp * T1 *
                ((Math.pow(P2 / P1, (n - 1) / n) - 1)) / eff; // W

  resultEl.innerHTML = `
    <strong>Actual Volumetric Flowrate:</strong><br>
    <span style="font-size:1.4em">${(flowActual * 3600).toFixed(2)} m³/h</span><br><br>

    <strong>Mass Flowrate:</strong><br>
    <span style="font-size:1.4em">${massFlow.toFixed(2)} kg/s</span><br><br>

    <strong>Compressor Power Required:</strong><br>
    <span style="font-size:1.4em">${(power / 1000).toFixed(2)} kW</span>
  `;
}
