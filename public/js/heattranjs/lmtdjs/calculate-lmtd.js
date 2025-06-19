function calculateLMTD() {
  const Th_in = parseFloat(document.getElementById('Th_in').value);
  const Th_out = parseFloat(document.getElementById('Th_out').value);
  const Tc_in = parseFloat(document.getElementById('Tc_in').value);
  const Tc_out = parseFloat(document.getElementById('Tc_out').value);
  const flowType = document.getElementById('flowType').value;

  const resultEl = document.getElementById('result');

  if ([Th_in, Th_out, Tc_in, Tc_out].some(v => isNaN(v))) {
    resultEl.innerHTML = "<div class='error-message'>Please enter all temperature values.</div>";
    return;
  }

  let ΔT1, ΔT2;

  if (flowType === "counter") {
    ΔT1 = Th_out - Tc_in;
    ΔT2 = Th_in - Tc_out;
  } else {
    ΔT1 = Th_in - Tc_in;
    ΔT2 = Th_out - Tc_out;
  }

  if (ΔT1 <= 0 || ΔT2 <= 0) {
    resultEl.innerHTML = "<div class='error-message'>ΔT1 and ΔT2 must be positive.</div>";
    return;
  }

  let LMTD;
  if (ΔT1 === ΔT2) {
    LMTD = ΔT1;
  } else {
    LMTD = (ΔT2 - ΔT1) / Math.log(ΔT2 / ΔT1);
  }

  resultEl.innerHTML = `
    <strong>ΔT₁:</strong> ${ΔT1.toFixed(2)} °C<br>
    <strong>ΔT₂:</strong> ${ΔT2.toFixed(2)} °C<br>
    <strong>LMTD:</strong> <span style="font-size: 1.3em;">${LMTD.toFixed(2)} °C</span><br>
    <em>Flow type:</em> ${flowType === "counter" ? "Counter-current" : "Co-current"}
  `;
}
