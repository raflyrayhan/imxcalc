const traces = [];
const R_values = [0.1, 0.2, 0.3, 0.5, 0.7, 1.1, 2, 5]; // Hindari R=1 (singularitas)
const P_values = Array.from({ length: 100 }, (_, i) => 0.01 + i * 0.009); // Hindari P=0 dan P=1

function F(R, P) {
  if (P >= 1 || R * P >= 1 || R === 1) return NaN;

  const num1 = Math.sqrt(R * R + 1);
  const term1 = 1 - P;
  const term2 = 1 - R * P;
  const term3 = 2 - P * (R + 1);
  const term4 = 2 - P * (R - 1);

  // Validasi agar log tidak negatif
  if (term1 <= 0 || term2 <= 0 || term3 <= 0 || term4 <= 0) return NaN;

  const top = num1 * Math.log(term1 / term2);
  const bottom = (R - 1) * Math.log(term3 / term4);

  return bottom !== 0 ? top / bottom : NaN;
}

R_values.forEach(R => {
  const x = [];
  const y = [];

  P_values.forEach(P => {
    const fVal = F(R, P);
    if (isFinite(fVal) && fVal >= 0.5 && fVal <= 1) {
      x.push(P);
      y.push(fVal);
    }
  });

  traces.push({
    x: x,
    y: y,
    type: 'scatter',
    mode: 'lines',
    name: `R = ${R}`,
    line: { width: 2 },
    hovertemplate: `R: ${R}<br>P: %{x:.2f}<br>F: %{y:.4f}<extra></extra>`
  });
});

let userPoint = {
  x: [],
  y: [],
  mode: 'markers+text',
  name: 'Your Point',
  text: [''],
  textposition: 'top right',
  marker: { size: 10, color: 'red' },
  hoverinfo: 'text'
};

function plotPoint() {
  const Th1 = parseFloat(document.getElementById('Th1').value);
  const Th2 = parseFloat(document.getElementById('Th2').value);
  const Tc1 = parseFloat(document.getElementById('Tc1').value);
  const Tc2 = parseFloat(document.getElementById('Tc2').value);

  if ([Th1, Th2, Tc1, Tc2].some(v => isNaN(v))) return;

  const deltaH = Th1 - Th2;
  const deltaC = Tc2 - Tc1;
  const deltaMax = Th1 - Tc1;

  const R = deltaH / deltaC;
  const P = deltaC / deltaMax;
  const f = F(R, P);

  if (!isFinite(f)) {
    document.getElementById('values').innerHTML = "Invalid combination of temperatures (R·P ≥ 1 or undefined)";
    return;
  }

  document.getElementById('values').innerHTML =
    `R: ${R.toFixed(3)}, P: ${P.toFixed(3)}, F: ${f.toFixed(4)}`;

  userPoint.x = [P];
  userPoint.y = [f];
  userPoint.text = [`R: ${R.toFixed(2)}<br>P: ${P.toFixed(2)}<br>F: ${f.toFixed(4)}`];

  Plotly.newPlot('chart', [...traces, userPoint], layout);
}

const layout = {
  title: 'LMTD Correction Factor Chart (1 Shell Pass)',
  xaxis: { title: 'P', range: [0, 1] },
  yaxis: { title: 'F', range: [0.5, 1] },
  margin: { t: 50, l: 50, r: 50, b: 50 },
  legend: { x: 1.05, y: 1 }
};

Plotly.newPlot('chart', traces, layout);
