function calcVesselVolume() {
    const D_mm = parseFloat(document.getElementById('D').value);
    const L_mm = parseFloat(document.getElementById('L').value);
    const headType = document.getElementById('headType').value;

    if (isNaN(D_mm) || isNaN(L_mm) || D_mm <= 0 || L_mm <= 0) {
        document.getElementById('volume_result').innerHTML =
          `<div class="error-message">Please enter valid, positive numbers for all fields.</div>`;
        return;
    }

    // Convert mm to m
    const D = D_mm / 1000;
    const r = D / 2;
    const L = L_mm / 1000;

    // Volume of cylinder
    const V_cyl = Math.PI * Math.pow(r, 2) * L;

    // Volume of head (both ends)
    let V_head = 0;
    let formula = '';
    if (headType === 'elliptical') {
        // 2:1 Elliptical
        V_head = 0.848 * Math.PI * Math.pow(r, 3) * 2;
        formula = 'V<sub>head</sub> = 0.848 × π × r³ × 2';
    } else {
        // Hemispherical
        V_head = (2/3) * Math.PI * Math.pow(r, 3) * 2;
        formula = 'V<sub>head</sub> = (2/3) × π × r³ × 2';
    }

    const V_total = V_cyl + V_head;

    // Liter dan m3
    const V_total_L = V_total * 1000; // 1 m3 = 1000 liter

    document.getElementById('volume_result').innerHTML = `
      <div>
        <b>Total Vessel Volume:</b><br>
        ${V_total.toLocaleString(undefined, {maximumFractionDigits:3})} m³<br>
        ${V_total_L.toLocaleString(undefined, {maximumFractionDigits:1})} liter
      </div>
      <hr>
      <small>
        Cylinder: <code>V = π·r²·L</code> <br>
        Head: <code>${formula}</code> <br>
        r = internal radius (m), L = shell length (m)
      </small>
    `;
}
