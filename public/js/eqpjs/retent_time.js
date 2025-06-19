function calcRetTimeSetVel() {
    const V = parseFloat(document.getElementById('V').value);
    const Q_m3h = parseFloat(document.getElementById('Q').value);
    const rho_p = parseFloat(document.getElementById('rho_p').value);
    const rho_f = parseFloat(document.getElementById('rho_f').value);
    const d_um = parseFloat(document.getElementById('d').value);
    const mu_mPas = parseFloat(document.getElementById('mu').value);

    if (
        isNaN(V) || isNaN(Q_m3h) || isNaN(rho_p) || isNaN(rho_f) ||
        isNaN(d_um) || isNaN(mu_mPas) ||
        V <= 0 || Q_m3h <= 0 || d_um <= 0 || mu_mPas <= 0
    ) {
        document.getElementById('rtsv_result').innerHTML =
            `<div class="error-message">Please enter valid, positive numbers for all fields.</div>`;
        return;
    }

    // Retention time (seconds and minutes)
    const Q_m3s = Q_m3h / 3600;
    const t_ret_s = V / Q_m3s;
    const t_ret_min = t_ret_s / 60;

    // Settling velocity (Stokes Law)
    // Convert d from micron (µm) to meter (m)
    const d_m = d_um * 1e-6;
    // Viscosity from mPa·s to kg/m.s (1 mPa.s = 0.001 kg/m.s)
    const mu = mu_mPas * 0.001;
    const g = 9.81;

    const vs = (g * (rho_p - rho_f) * Math.pow(d_m,2)) / (18 * mu);

    // For information: How long to settle 1 meter?
    const settle_1m_s = vs > 0 ? 1 / vs : NaN;
    const settle_1m_min = settle_1m_s / 60;

    document.getElementById('rtsv_result').innerHTML = `
      <div>
        <b>Retention Time:</b> ${t_ret_s.toLocaleString(undefined, {maximumFractionDigits:1})} sec 
        (${t_ret_min.toLocaleString(undefined, {maximumFractionDigits:2})} min)<br>
        <b>Settling Velocity (v<sub>s</sub>):</b> ${vs.toExponential(3)} m/s<br>
        <b>Time to Settle 1 m:</b> ${settle_1m_s.toLocaleString(undefined, {maximumFractionDigits:1})} sec
        (${settle_1m_min.toLocaleString(undefined, {maximumFractionDigits:2})} min)
      </div>
      <hr>
      <small>
        Retention time: <code>t<sub>ret</sub> = V / Q</code> (Q in m³/s)<br>
        Settling velocity (Stokes): <code>v<sub>s</sub> = g (ρ<sub>p</sub>–ρ<sub>f</sub>) d² / (18 μ)</code><br>
        d = diameter (m), μ = viscosity (kg/m·s)<br>
        Valid for small particles/droplets (laminar regime)
      </small>
    `;
}
