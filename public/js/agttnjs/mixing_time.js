function mixingTimeEstimate() {
    const rpm = parseFloat(document.getElementById('rpm').value);
    const K = parseFloat(document.getElementById('K').value);
    const d1 = parseFloat(document.getElementById('d1').value);
    const d2 = parseFloat(document.getElementById('d2').value);
    const n1 = parseFloat(document.getElementById('n1').value);
    const n2 = parseFloat(document.getElementById('n2').value);

    if (
      isNaN(rpm) || isNaN(K) || isNaN(d1) || isNaN(d2) ||
      isNaN(n1) || isNaN(n2) ||
      rpm <= 0 || K <= 0 || d1 <= 0 || d2 <= 0 || n1 <= 0 || n2 <= 0
    ) {
        document.getElementById('mixing_result').innerHTML =
          `<div class="error-message">Please enter valid, positive numbers for all fields.</div>`;
        return;
    }

    // Mixing time (empirical)
    const N = rpm / 60;
    const t_empirical = K / N;

    // Mixing time scale-up (ratio)
    const tm_ratio = Math.pow(d1/d2, 2/3) * (n1/n2);

    document.getElementById('mixing_result').innerHTML = `
      <div>
        <b>Empirical Mixing Time (tₘ):</b> ${t_empirical.toFixed(2)} seconds<br>
        <b>Mixing Time Scale-up Ratio (tₘ₂ / tₘ₁):</b> ${tm_ratio.toFixed(3)}<br>
        <small>
        <b>Estimated Scale-up Mixing Time:</b> tₘ₂ = tₘ₁ × (${tm_ratio.toFixed(3)})<br>
        <i>tₘ₁ = lab/pilot mixing time</i>
        </small>
      </div>
      <hr>
      <small>
        Empirical: <code>tₘ = K / N</code> &nbsp; | &nbsp;
        Scale-up: <code>tₘ₂ / tₘ₁ = (D₁/D₂)<sup>2/3</sup> × (N₁/N₂)</code>
      </small>
    `;
}
