function calculateZ(Pr, Tr) {
  return 1 + (Pr / (Tr * Tr)) - 0.01 * Pr * Math.log(Tr + Pr);
}

function plotZ() {
  const Tr = parseFloat(document.getElementById('Tr').value);
  const PrValues = [];
  const ZValues = [];

  for (let i = 0.01; i <= 10; i += 0.02) {
    PrValues.push(i);
    ZValues.push(calculateZ(i, Tr));
  }

  const trace = {
    x: PrValues,
    y: ZValues,
    type: 'scatter',
    mode: 'lines',
    name: 'Z vs Pr',
    hovertemplate: 'Pr: %{x:.3f}<br>Z: %{y:.4f}<extra></extra>',
    line: { color: 'blue' }
  };

  const userPr = 0.147;
  const userZ = calculateZ(userPr, Tr);

  const point = {
    x: [userPr],
    y: [userZ],
    mode: 'markers+text',
    name: 'Your Point',
    marker: { size: 10, color: 'red' },
    text: [`Pr: ${userPr.toFixed(3)}<br>Z: ${userZ.toFixed(4)}`],
    textposition: 'top right'
  };

  document.getElementById("zResult").innerHTML = `
    <b>Sample Result</b><br>
    Pr: ${userPr.toFixed(3)}<br>
    Tr: ${Tr.toFixed(2)}<br>
    Z: ${userZ.toFixed(4)}
  `;

  const layout = {
    title: 'Z vs Pressure (Reduced)',
    xaxis: { title: 'Reduced Pressure, Pr', range: [0, 10] },
    yaxis: { title: 'Compressibility Factor, Z', range: [0.5, 1.5] },
    margin: { t: 50, l: 50, r: 50, b: 50 },
    template: 'plotly_white',
    legend: { x: 1.05, y: 1 }
  };

  Plotly.newPlot('chart', [trace, point], layout);
}
