function calcVesselThickness() {
    // Get values
    const P_bar = parseFloat(document.getElementById('P').value);
    const R_mm = parseFloat(document.getElementById('R').value);
    const S = parseFloat(document.getElementById('S').value);
    const E = parseFloat(document.getElementById('E').value);
    const ca = parseFloat(document.getElementById('ca').value);

    if (
        isNaN(P_bar) || isNaN(R_mm) || isNaN(S) || isNaN(E) || isNaN(ca) ||
        P_bar <= 0 || R_mm <= 0 || S <= 0 || E <= 0
    ) {
        document.getElementById('vessel_result').innerHTML =
          `<div class="error-message">Please enter valid, positive numbers for all fields.</div>`;
        return;
    }

    // Convert P to MPa and R to m
    const P = P_bar * 0.1;   // 1 bar = 0.1 MPa
    const R = R_mm / 1000;   // mm to m

    // t = (P * R) / (S * E - 0.6 * P)
    const denominator = (S * E - 0.6 * P);
    if (denominator <= 0) {
        document.getElementById('vessel_result').innerHTML =
            `<div class="error-message">Invalid parameters. Check S, E, and P values.</div>`;
        return;
    }
    let t_m = (P * R) / denominator; // thickness in m
    let t_mm = t_m * 1000;           // thickness in mm
    let t_total = t_mm + ca;         // add corrosion allowance (in mm)

    document.getElementById('vessel_result').innerHTML = `
      <div>
        <b>Required Thickness (without CA):</b> ${t_mm.toFixed(2)} mm<br>
        <b>Corrosion Allowance (CA):</b> ${ca.toFixed(2)} mm<br>
        <b><u>Total Required Thickness:</u></b> ${t_total.toFixed(2)} mm
      </div>
      <hr>
      <small>
        Formula: <code>t = [P·R] / [S·E - 0.6·P] + CA</code><br>
        P = design pressure (bar, converted to MPa);<br>
        R = inside radius (mm, converted to m);<br>
        S = allowable stress (MPa);<br>
        E = joint efficiency;<br>
        CA = corrosion allowance (mm)
      </small>
    `;
}
