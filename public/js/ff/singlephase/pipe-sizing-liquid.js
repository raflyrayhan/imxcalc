function calculate() {
  const Q = parseFloat(document.getElementById('flowRate').value) / 3600; // m³/h to m³/s
  const v = parseFloat(document.getElementById('velocity').value);

  const resultEl = document.getElementById('result');

  if (isNaN(Q) || isNaN(v) || Q <= 0 || v <= 0) {
    resultEl.innerHTML = "<span style='color:red;'>Please enter valid positive numbers.</span>";
    return;
  }

  const area = Q / v; // m²
  const diameter = Math.sqrt((4 * area) / Math.PI); // m

  resultEl.innerHTML =
    `<strong>Required Pipe Diameter:</strong><br><span style="font-size: 1.4em;">${(diameter * 1000).toFixed(2)} mm</span>`;
}
