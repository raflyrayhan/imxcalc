function scaleUpAgitator() {
    const d1 = parseFloat(document.getElementById('d1').value);
    const n1 = parseFloat(document.getElementById('n1').value);
    const d2 = parseFloat(document.getElementById('d2').value);
    const scaleType = document.getElementById('scaleType').value;

    if (isNaN(d1) || isNaN(n1) || isNaN(d2) || d1 <= 0 || n1 <= 0 || d2 <= 0) {
        document.getElementById('scaleup_result').innerHTML =
          `<div class="error-message">Please enter valid, positive numbers for all fields.</div>`;
        return;
    }

    let n2, tip1, tip2, powerRatio, explanation;

    // Tip speed in m/s: π * D * N / 60 (N in rpm)
    tip1 = Math.PI * d1 * n1 / 60;
    
    if (scaleType === "tip") {
        // Constant tip speed: N2 = N1 * D1 / D2
        n2 = n1 * d1 / d2;
        tip2 = Math.PI * d2 * n2 / 60;
        powerRatio = Math.pow(d2 / d1, 5) * Math.pow(n2 / n1, 3);

        explanation = `Keeping <b>tip speed constant</b>:<br>
        <code>N₂ = N₁ × (D₁ / D₂)</code><br>
        Power ratio = (D₂/D₁)<sup>5</sup> × (N₂/N₁)<sup>3</sup>`;
    } else {
        // Constant power/volume: N2 = N1 * (d1/d2)^(5/3)
        n2 = n1 * Math.pow(d1/d2, 5/3);
        tip2 = Math.PI * d2 * n2 / 60;
        powerRatio = 1; // by definition, power/volume is constant

        explanation = `Keeping <b>power per volume constant</b>:<br>
        <code>N₂ = N₁ × (D₁ / D₂)<sup>5/3</sup></code><br>
        Power per volume remains the same.`;
    }

    document.getElementById('scaleup_result').innerHTML = `
      <div>
        <b>Production Impeller Speed (N₂):</b> ${n2.toFixed(2)} rpm<br>
        <b>Lab/Pilot Tip Speed:</b> ${tip1.toFixed(2)} m/s<br>
        <b>Production Tip Speed:</b> ${tip2.toFixed(2)} m/s<br>
        ${scaleType === "tip" ? `<b>Power Ratio (P₂/P₁):</b> ${powerRatio.toFixed(2)}` : ''}
      </div>
      <hr>
      <small>${explanation}</small>
    `;
}
