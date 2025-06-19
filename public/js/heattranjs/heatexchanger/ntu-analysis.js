function calculateNTU() {
  const mh = parseFloat(document.getElementById('mh').value) / 3600;
  const cph = parseFloat(document.getElementById('cph').value);
  const Th_in = parseFloat(document.getElementById('Th_in').value);
  const Th_out = parseFloat(document.getElementById('Th_out').value);

  const mc = parseFloat(document.getElementById('mc').value) / 3600;
  const cpc = parseFloat(document.getElementById('cpc').value);
  const Tc_in = parseFloat(document.getElementById('Tc_in').value);
  const Tc_out = parseFloat(document.getElementById('Tc_out').value);

  const A = parseFloat(document.getElementById('A').value);
  const U = parseFloat(document.getElementById('U').value);
  const flow = document.getElementById('flowType').value;

  const resultEl = document.getElementById('result');

  const Ch = mh * cph;
  const Cc = mc * cpc;
  const Cmin = Math.min(Ch, Cc);
  const Cmax = Math.max(Ch, Cc);
  const Cr = Cmin / Cmax;

  const Q = Cc * (Tc_out - Tc_in);
  const Qmax = Cmin * (Th_in - Tc_in);
  const epsilon = Q / Qmax;

  const NTU = -1;

  let calculatedNTU = 0;
  if (flow === "counter") {
    if (Cr !== 1) {
      calculatedNTU = -Math.log((1 - epsilon * (1 + Cr)) / (1 - epsilon)) / (1 - Cr);
    } else {
      calculatedNTU = epsilon / (1 - epsilon);
    }
  } else {
    calculatedNTU = (1 - Math.exp(-2 * epsilon * (1 + Cr))) /
                     (1 + Cr + Math.exp(-2 * epsilon * (1 + Cr)));
  }

  const checkNTU = (U * A) / Cmin;

  resultEl.innerHTML = `
    <strong>ε (Effectiveness):</strong> ${epsilon.toFixed(4)}<br>
    <strong>NTU:</strong> ${calculatedNTU.toFixed(2)}<br>
    <strong>Heat Duty (Q):</strong> ${(Q / 1000).toFixed(2)} kW<br>
    <strong>U × A / C<sub>min</sub>:</strong> ${checkNTU.toFixed(2)}
  `;
}
