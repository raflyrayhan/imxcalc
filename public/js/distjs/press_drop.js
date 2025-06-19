function pressureDropPacked() {
    const G = parseFloat(document.getElementById('G').value);
    const rho_g = parseFloat(document.getElementById('rho_g').value);
    const Z = parseFloat(document.getElementById('Z').value);
    const dp = parseFloat(document.getElementById('dp').value);
    const C = parseFloat(document.getElementById('C').value);

    if (
        isNaN(G) || isNaN(rho_g) || isNaN(Z) || isNaN(dp) || isNaN(C) ||
        G <= 0 || rho_g <= 0 || Z <= 0 || dp <= 0 || C <= 0
    ) {
        document.getElementById('pd_result').innerHTML =
            `<div class="error-message">Please enter valid, positive numbers for all fields.</div>`;
        return;
    }

    // ΔP = (C * (G^2 / rho_g)) * (Z / dp)
    const deltaP = (C * (Math.pow(G, 2) / rho_g)) * (Z / dp);

    // Convert Pa to mbar and mmH2O (common units)
    const deltaP_mbar = deltaP / 100;
    const deltaP_mmH2O = deltaP / 9.80665;

    document.getElementById('pd_result').innerHTML = `
      <div>
        <b>Pressure Drop (ΔP):</b> ${deltaP.toFixed(2)} Pa<br>
        <b>=</b> ${deltaP_mbar.toFixed(2)} mbar<br>
        <b>=</b> ${deltaP_mmH2O.toFixed(2)} mm H<sub>2</sub>O
      </div>
      <hr>
      <small>
        Formula: <code>ΔP = (C · G²/ρ<sub>g</sub>) · (Z/d<sub>p</sub>)</code><br>
        Recommended C: 0.2–0.5 (default 0.3);<br>
        Results also in mbar and mmH<sub>2</sub>O for reference.
      </small>
    `;
}
