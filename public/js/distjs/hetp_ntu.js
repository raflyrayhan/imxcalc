function calcHETP_NTU() {
    const Z = parseFloat(document.getElementById('Z').value);
    const N = parseFloat(document.getElementById('N').value);
    const HTU = parseFloat(document.getElementById('HTU').value);
    const NTU = parseFloat(document.getElementById('NTU').value);

    let hetp = NaN, ntu_calc = NaN, htu_calc = NaN, n_calc = NaN, z_from_htu_ntu = NaN;
    let summary = '';

    // HETP Calculation
    if (Z > 0 && N > 0) {
        hetp = Z / N;
        summary += `<b>HETP = Z / N = </b> ${hetp.toFixed(3)} m<br>`;
    }
    // NTU Calculation (from HTU and Z)
    if (HTU > 0 && Z > 0) {
        ntu_calc = Z / HTU;
        summary += `<b>NTU = Z / HTU = </b> ${ntu_calc.toFixed(3)}<br>`;
    }
    // Z Calculation (from HTU and NTU)
    if (HTU > 0 && NTU > 0) {
        z_from_htu_ntu = HTU * NTU;
        summary += `<b>Z = HTU × NTU = </b> ${z_from_htu_ntu.toFixed(3)} m<br>`;
    }
    // HTU Calculation (from Z and NTU)
    if (Z > 0 && NTU > 0) {
        htu_calc = Z / NTU;
        summary += `<b>HTU = Z / NTU = </b> ${htu_calc.toFixed(3)} m<br>`;
    }
    // N Calculation (from Z and HETP)
    if (Z > 0 && hetp > 0) {
        n_calc = Z / hetp;
        // Redundant with above but shown for clarity
    }

    if (!summary) {
        summary = '<div class="error-message">Please enter valid, positive numbers for at least two fields.</div>';
    }

    document.getElementById('hetp_ntu_result').innerHTML = `
      <div>${summary}</div>
      <hr>
      <small>
        <b>Formulas:</b><br>
        HETP = Z / N<br>
        NTU = Z / HTU<br>
        HTU = Z / NTU<br>
        Z = HTU × NTU
      </small>
    `;
}
