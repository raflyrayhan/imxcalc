function extPressureCheck() {
    const Do = parseFloat(document.getElementById('Do').value);
    const t = parseFloat(document.getElementById('t').value);
    const L = parseFloat(document.getElementById('L').value);
    const E = parseFloat(document.getElementById('E').value);
    const nu = parseFloat(document.getElementById('nu').value);
    const Pext = parseFloat(document.getElementById('Pext').value);

    if (
        isNaN(Do) || isNaN(t) || isNaN(L) || isNaN(E) || isNaN(nu) || isNaN(Pext) ||
        Do <= 0 || t <= 0 || L <= 0 || E <= 0 || nu < 0 || nu >= 0.5 || Pext < 0
    ) {
        document.getElementById('extp_result').innerHTML =
          `<div class="error-message">Please enter valid, positive numbers for all fields. Poisson ratio should be 0–0.5.</div>`;
        return;
    }

    // Ratios
    const Do_t = Do / t;
    const L_Do = L / Do;

    // Convert to meter for formula
    const Do_m = Do / 1000;
    const t_m = t / 1000;

    // Pressure Collapse (MPa), Roark's formula
    const Pcr_MPa = (2 * E) / Math.sqrt(3 * (1 - Math.pow(nu, 2))) * Math.pow((t_m / Do_m), 3);

    // To bar
    const Pcr_bar = Pcr_MPa * 10;

    // Margin
    const margin = Pcr_bar / Pext;

    document.getElementById('extp_result').innerHTML = `
      <div>
        <b>D/t Ratio:</b> ${Do_t.toFixed(1)}<br>
        <b>L/D Ratio:</b> ${L_Do.toFixed(2)}<br>
        <b>Collapse Pressure (P<sub>cr</sub>):</b> ${Pcr_bar.toFixed(2)} bar<br>
        <b>Applied Pressure (P<sub>ext</sub>):</b> ${Pext.toFixed(2)} bar<br>
        <b>Safety Margin (P<sub>cr</sub>/P<sub>ext</sub>):</b> ${margin.toFixed(2)} ${margin > 1 ? "(SAFE)" : "<span style='color:red'>(UNSAFE)</span>"}
      </div>
      <hr>
      <small>
        <b>Formula (approx, Roark’s):</b><br>
        <code>P<sub>cr</sub> = [2·E / √(3·(1-ν²))] × (t/D)<sup>3</sup></code> [MPa]<br>
        Valid for thin shell, external pressure only. For design, use ASME VIII charts.<br>
        D = outside diameter, t = thickness, L = shell length between stiffener.<br>
        E = Young’s modulus, ν = Poisson’s ratio.
      </small>
    `;
}
