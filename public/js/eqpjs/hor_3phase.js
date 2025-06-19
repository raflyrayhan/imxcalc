function sep3phSizing() {
    const Qgas_Nm3h = parseFloat(document.getElementById('Qgas').value);
    const Qoil_m3h = parseFloat(document.getElementById('Qoil').value);
    const Qwater_m3h = parseFloat(document.getElementById('Qwater').value);
    const rho_g = parseFloat(document.getElementById('rho_g').value);
    const rho_l = parseFloat(document.getElementById('rho_l').value);
    const K = parseFloat(document.getElementById('K').value);
    const t_ret = parseFloat(document.getElementById('t_ret').value);
    const freeboard = parseFloat(document.getElementById('freeboard').value);

    if (
        isNaN(Qgas_Nm3h) || isNaN(Qoil_m3h) || isNaN(Qwater_m3h) ||
        isNaN(rho_g) || isNaN(rho_l) || isNaN(K) || isNaN(t_ret) || isNaN(freeboard) ||
        Qgas_Nm3h <= 0 || K <= 0 || rho_g <= 0 || rho_l <= 0 || t_ret <= 0 || freeboard <= 0
    ) {
        document.getElementById('sep3ph_result').innerHTML =
            `<div class="error-message">Please enter valid, positive numbers for all fields.</div>`;
        return;
    }

    // Convert gas flowrate Nm3/h to m3/s (STP)
    const Qgas_m3s = Qgas_Nm3h / 3600;

    // Souders-Brown velocity
    const Vg_max = K * Math.sqrt((rho_l - rho_g) / rho_g);

    // Separator cross-section area for gas
    const A_gas = Qgas_m3s / Vg_max;

    // Assume half-full liquid (typical): liquid height = 0.5D
    // Area half-full = (π/8)*D^2
    // So, D = sqrt(8*A_gas/π)
    const D = Math.sqrt(8 * A_gas / Math.PI);

    // Liquid volume needed (oil + water, per retention time)
    const Qliq_m3h = Qoil_m3h + Qwater_m3h;
    const t_ret_s = t_ret * 60;
    const V_liq = (Qliq_m3h / 3600) * t_ret_s;

    // Shell length: V_liq / area half-full
    const A_liq = (Math.PI / 8) * D * D;
    const L_shell = V_liq / A_liq;

    // Total length: shell + freeboard (add 20% for heads, nozzles, etc)
    const L_total = L_shell + freeboard + 0.2 * (L_shell + freeboard);

    document.getElementById('sep3ph_result').innerHTML = `
      <div>
        <b>Separator Diameter (D):</b> ${D.toFixed(2)} m<br>
        <b>Shell Length (liquid section):</b> ${L_shell.toFixed(2)} m<br>
        <b>Total Vessel Length (w/ allowance):</b> ${L_total.toFixed(2)} m<br>
        <hr>
        <b>Souders-Brown Velocity (V<sub>g,max</sub>):</b> ${Vg_max.toFixed(3)} m/s<br>
        <b>Gas Section Area (A):</b> ${A_gas.toFixed(3)} m²<br>
        <b>Liquid Holdup Volume:</b> ${V_liq.toFixed(2)} m³<br>
      </div>
      <hr>
      <small>
        <b>Formulas:</b><br>
        - <code>V<sub>g,max</sub> = K × √[(ρ<sub>L</sub>–ρ<sub>G</sub>)/ρ<sub>G</sub>]</code><br>
        - <code>A = Q<sub>gas</sub>/V<sub>g,max</sub></code><br>
        - <code>D = √[8A/π]</code> (half-full liquid)<br>
        - <code>L<sub>shell</sub> = V<sub>liq</sub>/A<sub>liq</sub></code><br>
        - Add freeboard/gas space and 20% length margin for heads/nozzles.
      </small>
    `;
}
