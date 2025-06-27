function getDensitas(plastik) {
  if (plastik === "PE") return 350;
  if (plastik === "PP") return 370;
  if (plastik === "PS") return 450;
  return 350;
}

function hitung() {
  console.log("🔢 hitung() called");
  // 1) Show the output card
  const outputCard = document.getElementById("output");
  outputCard.classList.remove("hidden");

  // 2) Read inputs
  const jenis      = document.getElementById("jenisPlastik").value;
  const kapasitasH = parseFloat(document.getElementById("kapasitas").value);
  const tinggalMin = parseFloat(document.getElementById("tinggal").value);
  const yieldOil   = parseFloat(document.getElementById("yieldOil").value);
  const yieldGas   = parseFloat(document.getElementById("yieldGas").value);
  const yieldChar  = parseFloat(document.getElementById("yieldChar").value);
  const suhu       = parseFloat(document.getElementById("suhu").value);
  const densitas   = getDensitas(jenis);

  // 3) Compute sizing
  const jam           = kapasitasH / 24;
  const waktuJam      = tinggalMin / 60;
  const volumeReaktor = (jam / densitas) * waktuJam;
  const D             = Math.cbrt((4 * volumeReaktor)/(Math.PI*3));
  const H             = 3 * D;

  // 4) Adjust yields
  let adjOil = yieldOil, adjGas = yieldGas, adjChar = yieldChar;
  if (suhu < 400) {
    adjOil -= 10; adjGas -= 5; adjChar += 15;
  } else if (suhu > 550) {
    adjOil -= 5; adjGas += 10; adjChar -= 5;
  }

  // 5) Product flows
  const oil_kg    = jam * (adjOil / 100);
  const gas_kg    = jam * (adjGas / 100);
  const char_kg   = jam * (adjChar / 100);
  const oil_liter = oil_kg / 0.85;

  // 6) Energy
  const energiMJ  = jam * 1.5;
  const energiL   = energiMJ / 0.5;
  const energiKWh = energiL / 3.6;

  // 7) Populate table
  document.getElementById("outJenis").textContent     = jenis;
  document.getElementById("outCapacity").textContent  = jam.toFixed(1)  + " kg/h";
  document.getElementById("outDensity").textContent   = densitas        + " kg/m³";
  document.getElementById("outTemp").textContent      = suhu            + " °C";
  document.getElementById("outVolume").textContent    = volumeReaktor.toFixed(3) + " m³";
  document.getElementById("outDiameter").textContent  = D.toFixed(2)    + " m";
  document.getElementById("outHeight").textContent    = H.toFixed(2)    + " m";

  document.getElementById("outYieldSum").textContent  =
    `Bio-oil ${adjOil.toFixed(0)}%, Gas ${adjGas.toFixed(0)}%, Char ${adjChar.toFixed(0)}%`;
  document.getElementById("outBioOil").textContent    =
    oil_kg.toFixed(1) + " kg/h ≈ " + oil_liter.toFixed(0) + " L/h";
  document.getElementById("outGasOut").textContent    = gas_kg.toFixed(1)  + " kg/h";
  document.getElementById("outCharOut").textContent   = char_kg.toFixed(1) + " kg/h";

  document.getElementById("outThermal").textContent   = energiMJ.toFixed(1)  + " MJ/h";
  document.getElementById("outElectric").textContent  =
    energiL.toFixed(1) + " MJ/h ≈ " + energiKWh.toFixed(1) + " kWh";
}
