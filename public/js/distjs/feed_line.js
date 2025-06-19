function analyzeLines() {
    const xF = parseFloat(document.getElementById('xF').value);
    const q = parseFloat(document.getElementById('q').value);
    const xD = parseFloat(document.getElementById('xD').value);
    const xB = parseFloat(document.getElementById('xB').value);
    const R = parseFloat(document.getElementById('R').value);
    const S = parseFloat(document.getElementById('S').value);

    if (
        isNaN(xF) || isNaN(q) || isNaN(xD) || isNaN(xB) || isNaN(R) || isNaN(S) ||
        R <= 0 || S <= 0
    ) {
        document.getElementById('lines_result').innerHTML =
          `<div class="error-message">Please enter valid, positive numbers for all fields.</div>`;
        return;
    }

    // Feed line (q-line): y = q/(q-1)x - xF/(q-1)
    let qlineDesc, qlineMath;
    if (q === 1) {
        qlineDesc = 'Vertical line at x = xF (saturated liquid)';
        qlineMath = `x = ${xF}`;
    } else if (q === 0) {
        qlineDesc = 'Horizontal line at y = 0 (saturated vapor)';
        qlineMath = `y = 0`;
    } else {
        const slope = q / (q - 1);
        const intercept = -xF / (q - 1);
        qlineDesc = `Slope = ${slope.toFixed(3)}, Intercept = ${intercept.toFixed(3)}`;
        qlineMath = `y = (${slope.toFixed(3)})·x + (${intercept.toFixed(3)})`;
    }

    // Rectifying line: y = (R/(R+1))x + xD/(R+1)
    const rectSlope = R / (R + 1);
    const rectIntercept = xD / (R + 1);

    // Stripping line: y = (S/(S-1))x - xB/(S-1)
    const stripSlope = S / (S - 1);
    const stripIntercept = -xB / (S - 1);

    document.getElementById('lines_result').innerHTML = `
      <div>
        <b>Feed Line (q-line):</b><br>
        ${qlineDesc} <br>
        <code>${qlineMath}</code>
        <hr>
        <b>Rectifying Operating Line:</b><br>
        Slope = ${rectSlope.toFixed(3)}, Intercept = ${rectIntercept.toFixed(3)} <br>
        <code>y = (${rectSlope.toFixed(3)})·x + (${rectIntercept.toFixed(3)})</code>
        <hr>
        <b>Stripping Operating Line:</b><br>
        Slope = ${stripSlope.toFixed(3)}, Intercept = ${stripIntercept.toFixed(3)} <br>
        <code>y = (${stripSlope.toFixed(3)})·x + (${stripIntercept.toFixed(3)})</code>
      </div>
      <hr>
      <small>
        Feed line: <code>y = q/(q-1)x - x<sub>F</sub>/(q-1)</code><br>
        Rectifying: <code>y = (R/(R+1))x + x<sub>D</sub>/(R+1)</code><br>
        Stripping: <code>y = (S/(S-1))x - x<sub>B</sub>/(S-1)</code>
      </small>
    `;
}
