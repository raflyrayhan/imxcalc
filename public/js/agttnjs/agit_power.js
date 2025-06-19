function calcPower() {
    // Get form values
    const Np = parseFloat(document.getElementById('Np').value);
    const density = parseFloat(document.getElementById('density').value);
    const rpm = parseFloat(document.getElementById('rpm').value);
    const D = parseFloat(document.getElementById('diameter').value);

    // Validation
    if (isNaN(Np) || isNaN(density) || isNaN(rpm) || isNaN(D) ||
        Np <= 0 || density <= 0 || rpm <= 0 || D <= 0) {
        document.getElementById('result').innerHTML = `<div class="error-message">Please enter valid, positive numbers for all fields.</div>`;
        return;
    }

    // Calculation
    const N = rpm / 60; // Hz
    const Power_W = Np * density * Math.pow(N, 3) * Math.pow(D, 5);
    const Power_kW = Power_W / 1000;

    document.getElementById('result').innerHTML = `
      <div>
        <b>Power Consumption:</b><br>
        <b>${Power_W.toFixed(2)} Watt</b> <br>
        <b>${Power_kW.toFixed(3)} kW</b>
      </div>
      <hr>
      <small>
        Formula: <code>P = Np × ρ × N³ × D⁵</code> <br>
        Where: N = rpm / 60; P = Power (Watt); Np = Power Number; ρ = Density (kg/m³); D = Diameter (m)
      </small>
    `;
}
