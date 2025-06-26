function getDensitas(plastik) {
  if (plastik === "PE") return 350;
  if (plastik === "PP") return 370;
  if (plastik === "PS") return 450;
  return 350;
}

function hitung() {
  const jenis = document.getElementById("jenisPlastik").value;
  const kapasitasHarian = parseFloat(document.getElementById("kapasitas").value);
  const tinggalMenit = parseFloat(document.getElementById("tinggal").value);
  const yieldOil = parseFloat(document.getElementById("yieldOil").value);
  const yieldGas = parseFloat(document.getElementById("yieldGas").value);
  const yieldChar = parseFloat(document.getElementById("yieldChar").value);
  const suhu = parseFloat(document.getElementById("suhu").value);
  const densitas = getDensitas(jenis);

  const jam = kapasitasHarian / 24;
  const volumeJam = jam / densitas;
  const waktuJam = tinggalMenit / 60;
  const volumeReaktor = volumeJam * waktuJam;

  const pi = Math.PI;
  const D = Math.cbrt((4 * volumeReaktor) / (pi * 3));
  const H = 3 * D;

  let adjYieldOil = yieldOil;
  let adjYieldGas = yieldGas;
  let adjYieldChar = yieldChar;

  if (suhu < 400) {
    adjYieldOil -= 10;
    adjYieldGas -= 5;
    adjYieldChar += 15;
  } else if (suhu > 550) {
    adjYieldOil -= 5;
    adjYieldGas += 10;
    adjYieldChar -= 5;
  }

  const oil_kg = jam * (adjYieldOil / 100);
  const gas_kg = jam * (adjYieldGas / 100);
  const char_kg = jam * (adjYieldChar / 100);
  const oil_liter = oil_kg / 0.85;

  const energiMJ = jam * 1.5;
  const energiListrik = energiMJ / 0.5;
  const energiKWh = energiListrik / 3.6;

  document.getElementById("output").innerHTML = `
    <h5 class="mb-3">Hasil Perhitungan (${jenis})</h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><strong>Kapasitas/jam:</strong> ${jam.toFixed(1)} kg/h</li>
      <li class="list-group-item"><strong>Densitas Bulk:</strong> ${densitas} kg/m³</li>
      <li class="list-group-item"><strong>Suhu Operasi:</strong> ${suhu} °C</li>
      <li class="list-group-item"><strong>Volume Reaktor:</strong> ${volumeReaktor.toFixed(3)} m³</li>
      <li class="list-group-item"><strong>Diameter Reaktor:</strong> ${D.toFixed(2)} m</li>
      <li class="list-group-item"><strong>Tinggi Reaktor:</strong> ${H.toFixed(2)} m</li>
    </ul>

    <h6 class="mt-4">🛢️ Estimasi Produk (disesuaikan dengan suhu):</h6>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><strong>Yield Disesuaikan:</strong> Bio-oil ${adjYieldOil.toFixed(0)}%, Gas ${adjYieldGas.toFixed(0)}%, Char ${adjYieldChar.toFixed(0)}%</li>
      <li class="list-group-item"><strong>Bio-oil:</strong> ${oil_kg.toFixed(1)} kg/h ≈ ${oil_liter.toFixed(0)} L/h</li>
      <li class="list-group-item"><strong>Gas:</strong> ${gas_kg.toFixed(1)} kg/h</li>
      <li class="list-group-item"><strong>Char:</strong> ${char_kg.toFixed(1)} kg/h</li>
    </ul>

    <h6 class="mt-4">⚡ Estimasi Energi Pemanas:</h6>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><strong>Daya Termal:</strong> ${energiMJ.toFixed(1)} MJ/h</li>
      <li class="list-group-item"><strong>Daya Listrik Efektif (efisiensi 50%):</strong> ${energiListrik.toFixed(1)} MJ/h ≈ ${energiKWh.toFixed(1)} kWh</li>
    </ul>
  `;
}