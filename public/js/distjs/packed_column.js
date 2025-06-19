function packedColumnCalc() {
    const nt = parseFloat(document.getElementById('nt').value);
    const heightValue = parseFloat(document.getElementById('heightValue').value);
    const method = document.getElementById('method').value;

    if (isNaN(nt) || isNaN(heightValue) || nt <= 0 || heightValue <= 0) {
        document.getElementById('packed_result').innerHTML =
          `<div class="error-message">Please enter valid, positive numbers for all fields.</div>`;
        return;
    }

    const height = nt * heightValue;

    document.getElementById('packed_result').innerHTML = `
      <div>
        <b>Packed Column Height (Z):</b> ${height.toFixed(2)} meter
      </div>
      <hr>
      <small>
        Formula: <code>Z = N × ${method}</code><br>
        Where:<br>
        N = Number of Stages (if HETP), or Number of Transfer Units (if HTU)<br>
        ${method} = ${method === 'HETP' ? 'Height Equivalent to Theoretical Plate' : 'Height of a Transfer Unit'} (m)
      </small>
    `;
}
