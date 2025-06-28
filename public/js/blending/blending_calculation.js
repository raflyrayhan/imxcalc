const components = [
  "Reformate", "FCC", "Alkylate",
  "Isomerate", "Butane", "Ethanol", "Coker"
];

// fetch one property from DOM, fall back to 0
function getProp(comp, prop) {
  return parseFloat(
    document.getElementById(`${comp}_${prop}`).value
  ) || 0;
}

function calculateProperties() {
  document.getElementById("resultsCard").classList.remove("hidden");
  // 1) Read volume %s
  const V = components.map(c =>
    parseFloat(document.getElementById(`vol_${c}`).value) || 0
  );
  const Vtot = V.reduce((a,b) => a+b, 0);
  if (Vtot === 0) {
    return alert("Please input some volumes!");
  }

  // 2) Which props to average and their output IDs
  const P      = ["RON","MON","RVP","Sulfur","Oxy","Aro","BZ","Dens","FP"];
  const outIDs = [
    "outRON","outMON","outRVP","outSulfur",
    "outOxy","outAro","outBZ","outDens","outFP"
  ];
  const units  = [
    "",     "",     " psi",  " ppm",
    " wt%", " wt%", " vol%", " kg/m³"," °C"
  ];

  // 3) Compute & write each one
  P.forEach((prop, i) => {
    const weightedSum = components.reduce((sum, comp, j) =>
      sum + V[j] * getProp(comp, prop)
    , 0);
    const avg = weightedSum / Vtot;
    document
      .getElementById(outIDs[i])
      .textContent = avg.toFixed(2) + units[i];
  });
}
