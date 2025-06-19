function calculateSeriesParallel() {
  const Q = parseFloat(document.getElementById('flow').value);
  const H = parseFloat(document.getElementById('head').value);

  const resultEl = document.getElementById('result');

  if (isNaN(Q) || isNaN(H) || Q <= 0 || H <= 0) {
    resultEl.innerHTML = "<div class='error-message'>Please enter valid positive numbers.</div>";
    return;
  }

  const Q_parallel = Q * 2;
  const H_series = H * 2;

  resultEl.innerHTML = `
    <strong>Series Operation:</strong><br>
    Same Flowrate = <b>${Q.toFixed(2)} m³/h</b><br>
    Total Head = <b>${H_series.toFixed(2)} m</b><br><br>

    <strong>Parallel Operation:</strong><br>
    Total Flowrate = <b>${Q_parallel.toFixed(2)} m³/h</b><br>
    Same Head = <b>${H.toFixed(2)} m</b>
  `;
}
