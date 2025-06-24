const components = ["Reformate","FCC","Alkylate","Isomerate","Butane","Ethanol","Coker"];
    function getProp(comp, prop) {
      return parseFloat(document.getElementById(`${comp}_${prop}`).value) || 0;
    }

    function calculateProperties() {
      let V = components.map(c => parseFloat(document.getElementById(`vol_${c}`).value) || 0);
      let Vtot = V.reduce((a, b) => a + b, 0);
      if (Vtot === 0) return document.getElementById("results").innerText = "Please input volumes.";

      const P = ["RON", "MON", "RVP", "Sulfur", "Oxy", "Aro", "BZ", "Dens", "FP"];
      const labels = ["RON", "MON", "RVP (psi)", "Sulfur (ppm)", "Oxygenate (wt%)", "Aromatic (wt%)", "Benzene (vol%)", "Density (kg/m³)", "Flash Point (°C)"];
      let output = "<strong>Calculated Blend Properties:</strong><br>";
      P.forEach((p, i) => {
        let val = components.reduce((sum, c, j) => sum + V[j]*getProp(c, p), 0) / Vtot;
        output += `${labels[i]}: ${val.toFixed(2)}<br>`;
      });
      document.getElementById("results").innerHTML = output;
    }