function calcReynolds() {
    // Ambil nilai input
    const density = parseFloat(document.getElementById('density').value);
    const rpm = parseFloat(document.getElementById('rpm').value);
    const D = parseFloat(document.getElementById('diameter').value);
    let mu = parseFloat(document.getElementById('viscosity').value);
    const unit = document.getElementById('viscosity_unit').value;

    // Validasi
    if (isNaN(density) || isNaN(rpm) || isNaN(D) || isNaN(mu) ||
        density <= 0 || rpm <= 0 || D <= 0 || mu <= 0) {
        document.getElementById('re_result').innerHTML = `<div class="error-message">Please enter valid, positive numbers for all fields.</div>`;
        return;
    }

    // Konversi cP ke kg/m.s jika perlu
    if (unit === "cP") mu = mu * 0.001;

    // Hitung
    const N = rpm / 60; // Hz
    const Re = (density * N * Math.pow(D, 2)) / mu;

    let regime = "";
    if (Re < 10) regime = "Laminar flow (Re < 10)";
    else if (Re < 10000) regime = "Transition flow (10 < Re < 10,000)";
    else regime = "Turbulent flow (Re > 10,000)";

    document.getElementById('re_result').innerHTML = `
      <div>
        <b>Reynolds Number:</b> <br>
        <b>${Re.toLocaleString(undefined, {maximumFractionDigits:2})}</b> <br>
        <span>${regime}</span>
      </div>
      <hr>
      <small>
        Formula: <code>Re = (ρ × N × D²) / μ</code> <br>
        N = rpm / 60; ρ = Density (kg/m³); D = Diameter (m); μ = Dynamic viscosity (kg/m·s or cP)
      </small>
    `;
}
