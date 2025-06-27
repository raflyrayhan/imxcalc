let calcData = {};

function calculateHeat() {
  // 1) Unhide results
  document.getElementById("resultCard").classList.remove("hidden");

  // 2) Read inputs
  const w  = parseFloat(document.getElementById("width").value)     || 0;
  const h  = parseFloat(document.getElementById("height").value)    || 0;
  const L  = parseFloat(document.getElementById("length").value)    || 0;
  const Ts = parseFloat(document.getElementById("surfaceTemp").value)|| 0;
  const Ta = parseFloat(document.getElementById("envTemp").value)    || 0;
  const ΔT = Math.max(Ts - Ta, 0);

  // 3) Compute
  const k     = 10; // convective coeff.
  const area  = 2*(w*h + w*L + h*L);
  const Q     = k * area * ΔT;         // W
  const rho   = 1.2, cp = 1005;       
  const m3s   = ΔT>0 ? Q/(rho*cp*ΔT) : 0;
  const m3h   = m3s * 3600;             // m³/h

  // 4) Save for export
  calcData = {
    Width: w, Height: h, Length: L,
    SurfaceTemp: Ts, AmbientTemp: Ta,
    Area: area.toFixed(2), DeltaT: ΔT.toFixed(2),
    Heat_W: Q.toFixed(2), Airflow_m3h: m3h.toFixed(2)
  };

  // 5) Populate table
  document.getElementById("outHeat").textContent = Q.toFixed(2);
  document.getElementById("outFlow").textContent = m3h.toFixed(2);
}

function exportToExcel() {
  const ws = XLSX.utils.json_to_sheet([calcData]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Results");
  XLSX.writeFile(wb, "heat_results.xlsx");
}

function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Heat & Airflow Results", 10, 10);
  let y = 20;
  for (let [k,v] of Object.entries(calcData)) {
    doc.text(`${k}: ${v}`, 10, y);
    y += 10;
  }
  doc.save("heat_results.pdf");
}
