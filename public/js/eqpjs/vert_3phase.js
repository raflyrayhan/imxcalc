function sep3pSizing() {
    const Qgas_Nm3h = parseFloat(document.getElementById('Qgas').value);
    const Qoil_m3h = parseFloat(document.getElementById('Qoil').value);
    const Qwater_m3h = parseFloat(document.getElementById('Qwater').value);
    const rho_g = parseFloat(document.getElementById('rho_g').value);
    const rho_l = parseFloat(document.getElementById('rho_l').value);
    const K = parseFloat(document.getElementById('K').value);
    const t_ret = parseFloat(document.getElementById('t_ret').value);
    const h_head = parseFloat(document.getElementById('h_head').value);

    if (
        isNaN(Qgas_Nm3h) || isNaN(Qoil_m3h) || isNaN(Qwater_m3h) ||
        isNaN(rho_g) || isNaN(rho_l) || isNaN(K) || isNaN(t_ret) || isNaN(h_head) ||
        Qgas_Nm3h <= 0 || K <= 0 || rho_g <= 0 || rho_l <= 0 || t_ret <= 0 || h_head <= 0
    ) {
        document.getElementById('sep3p_result').innerHTML =
            `<div class="error-message">Please enter valid, positive numbers for all fields.</div>`;
        return;
    }

    // Convert gas flowrate Nm3/h to m3/s (STP)
    const Qgas_m3s = Qgas_Nm3h / 3600;

    // Souders-Brown velocity
    const Vg_max = K * Math.sqrt((rho_l - rho_g) / rho_g);

    // Separator cross-section area
    const A_sep = Qgas_m3s / Vg_max;

    // Diameter
    const D = Math.sqrt(4 * A_sep / Math.PI);

    // Total liquid flowrate (m3/h)
    const Qliq_m3h = Qoil_m3h + Qwater_m3h;

    // Retention time (min) to seconds
    const t_ret_s = t_ret * 60;

    // Liquid holdup volume (m3)
    const V_liq = (Qliq_m3h / 3600) * t_ret_s;

    // Liquid height (m)
    const H_liq = V_liq / A_sep;

    // Total vessel height = gas head + liquid height + allowance (simplified)
    const H_total = h_head + H_liq;

    document.getElementById('sep3p_result').innerHTML = `
      <div>
        <b>Separator Diameter:</b> ${D.toFixed(2)} m<br>
        <b>Liquid Section Height:</b> ${H_liq.toFixed(2)} m<br>
        <b>Total Vessel Height:</b> ${H_total.toFixed(2)} m<br>
        <hr>
        <b>Souders-Brown Velocity (V<sub>g,max</sub>):</b> ${Vg_max.toFixed(3)} m/s<br>
        <b>Separator Area (A):</b> ${A_sep.toFixed(3)} m²<br>
        <b>Liquid Holdup Volume:</b> ${V_liq.toFixed(2)} m³<br>
      </div>
      <hr>
      <small>
        <b>Formulas:</b><br>
        - <code>V<sub>g,max</sub> = K × √[(ρ<sub>L</sub>–ρ<sub>G</sub>)/ρ<sub>G</sub>]</code><br>
        - <code>D = √[4×A/π]</code>; A = Q<sub>gas</sub>/V<sub>g,max</sub><br>
        - <code>H<sub>liq</sub> = V<sub>liq</sub>/A</code> (retention t<sub>ret</sub>)<br>
        - <code>H<sub>total</sub> = H<sub>liq</sub> + headspace</code>
      </small>
    `;
}
