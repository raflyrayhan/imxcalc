function calcReboilerDuty() {
    const V = parseFloat(document.getElementById('V').value);         // kg/h
    const lambda = parseFloat(document.getElementById('lambda').value); // kJ/kg
    const unit = document.getElementById('unit').value;

    if (
        isNaN(V) || isNaN(lambda) ||
        V <= 0 || lambda <= 0
    ) {
        document.getElementById('reboiler_result').innerHTML =
            `<div class="error-message">Please enter valid, positive numbers for all fields.</div>`;
        return;
    }

    // Q in kJ/h
    const Q_kJh = V * lambda;
    // kW = kJ/s = (kJ/h) / 3600
    const Q_kW = Q_kJh / 3600;
    // MMkcal/h = (kJ/h) / 4184000
    const Q_MMkcalh = Q_kJh / 4184000;

    let resultStr = "";
    if (unit === "kW") {
        resultStr = `<b>Reboiler Duty (Q<sub>reb</sub>):</b> ${Q_kW.toFixed(2)} kW`;
    } else if (unit === "kJ/h") {
        resultStr = `<b>Reboiler Duty (Q<sub>reb</sub>):</b> ${Q_kJh.toFixed(2)} kJ/h`;
    } else if (unit === "MMkcal/h") {
        resultStr = `<b>Reboiler Duty (Q<sub>reb</sub>):</b> ${Q_MMkcalh.toFixed(4)} MMkcal/h`;
    }

    document.getElementById('reboiler_result').innerHTML = `
      <div>
        ${resultStr}
        <br>
        <small>
          kW = ${Q_kW.toFixed(2)}<br>
          kJ/h = ${Q_kJh.toFixed(2)}<br>
          MMkcal/h = ${Q_MMkcalh.toFixed(4)}
        </small>
      </div>
      <hr>
      <small>
        Main formula: <code>Q<sub>reb</sub> = V × λ</code><br>
        V = vapor flowrate (kg/h); λ = latent heat (kJ/kg)<br>
        1 kW = 3600 kJ/h, 1 MMkcal/h = 4,184,000 kJ/h
      </small>
    `;
}
