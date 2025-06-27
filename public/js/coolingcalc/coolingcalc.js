function calculate() {
  // Un-hide result card
  const rc = document.getElementById("resultCard");
  rc.classList.remove("hidden");

  // Read inputs
  const area            = +document.getElementById("area").value || 0;
  const lightingDensity = +document.getElementById("lightingDensity").value || 0;
  const workers         = +document.getElementById("workers").value || 0;
  const heatWorker      = +document.getElementById("heatWorker").value || 0;
  const furnaces        = +document.getElementById("furnaces").value || 0;
  const furnaceHeat     = (+document.getElementById("furnaceHeat").value || 0) * 1000;
  const otherMachines   = (+document.getElementById("otherMachines").value || 0) * 1000;
  const solarArea       = +document.getElementById("solarArea").value || 0;
  const solarRate       = +document.getElementById("solarRate").value || 0;
  const T_amb           = +document.getElementById("ambientTemp").value || 0;
  const T_in            = +document.getElementById("indoorTemp").value || 0;
  const ΔT              = Math.max(T_amb - T_in, 0);

  // Compute loads
  const q_people   = workers * heatWorker;
  const q_furnaces = furnaces * furnaceHeat;
  const q_mach     = otherMachines;
  const q_light    = area * lightingDensity;
  const q_solar    = solarArea * solarRate;
  const q_total    = q_people + q_furnaces + q_mach + q_light + q_solar;

  // Airflow (kg/s)
  const rho  = 1.2;    // kg/m³
  const cp   = 1005;   // J/kg·K
  const m_air = ΔT > 0 ? (q_total / (rho*cp*ΔT)).toFixed(2) : 0;

  // Populate output
  document.getElementById("outLoad").textContent = q_total.toLocaleString() + " W";
  document.getElementById("outFlow").textContent = m_air + " kg/s";
}
