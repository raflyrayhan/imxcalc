function calcRelVol() {
    const yA = parseFloat(document.getElementById('yA').value);
    const xA = parseFloat(document.getElementById('xA').value);
    const yB = parseFloat(document.getElementById('yB').value);
    const xB = parseFloat(document.getElementById('xB').value);

    if (
        isNaN(yA) || isNaN(xA) || isNaN(yB) || isNaN(xB) ||
        xA <= 0 || xB <= 0
    ) {
        document.getElementById('rv_result').innerHTML =
            `<div class="error-message">Please enter valid, positive numbers for all fields.<br>x<sub>A</sub> and x<sub>B</sub> must not be zero.</div>`;
        return;
    }

    const KA = yA / xA;
    const KB = yB / xB;
    const alpha = KA / KB;

    document.getElementById('rv_result').innerHTML = `
      <div>
        <b>Relative Volatility (α):</b> ${alpha.toFixed(4)}<br>
        <small>
          <b>K<sub>A</sub></b> = y<sub>A</sub> / x<sub>A</sub> = ${KA.toFixed(4)}<br>
          <b>K<sub>B</sub></b> = y<sub>B</sub> / x<sub>B</sub> = ${KB.toFixed(4)}<br>
        </small>
      </div>
      <hr>
      <small>
        Formula: <code>α = (y<sub>A</sub>/x<sub>A</sub>) / (y<sub>B</sub>/x<sub>B</sub>)</code><br>
        or <code>α = K<sub>A</sub> / K<sub>B</sub></code>
      </small>
    `;
}
