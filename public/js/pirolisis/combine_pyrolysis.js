function calculatePyrolysis() {
    const totalFeed = parseFloat(document.getElementById('totalFeed').value);
    const waterContent = parseFloat(document.getElementById('waterContent').value);
    const plastics = {
        PE: parseFloat(document.getElementById('pe').value),
        PP: parseFloat(document.getElementById('pp').value),
        PS: parseFloat(document.getElementById('ps').value),
        PVC: parseFloat(document.getElementById('pvc').value),
        PET: parseFloat(document.getElementById('pet').value)
    };

    const yields = {
        PE: { gas: 15, oil: 75, wax: 5, char: 5 },
        PP: { gas: 18, oil: 70, wax: 7, char: 5 },
        PS: { gas: 10, oil: 80, wax: 5, char: 5 },
        PVC: { gas: 20, oil: 55, wax: 5, char: 20 },
        PET: { gas: 25, oil: 50, wax: 5, char: 20 }
    };

    const pyrolysisTemps = { PE: 500, PP: 490, PS: 460, PVC: 550, PET: 600 };
    const heatPerKg = { PE: 2.5, PP: 2.6, PS: 2.4, PVC: 3.0, PET: 3.2 };
    const decompositionHeatPerKg = { PE: 1.3, PP: 1.4, PS: 1.2, PVC: 1.7, PET: 2.2 };

    let totalPercent = Object.values(plastics).reduce((a, b) => a + b, 0);
    if (totalPercent + waterContent !== 100) {
        alert("Total percentage of plastics and water must equal 100%!");
        return;
    }

    let totalGas = 0, totalOil = 0, totalWax = 0, totalChar = 0;
    let weightedTemp = 0, totalHeat = 0, totalPlasticMass = 0, totalDecompHeat = 0;

    for (let plastic in plastics) {
        const feedMass = totalFeed * plastics[plastic] / 100;
        totalPlasticMass += feedMass;
        totalGas += feedMass * yields[plastic].gas / 100;
        totalOil += feedMass * yields[plastic].oil / 100;
        totalWax += feedMass * yields[plastic].wax / 100;
        totalChar += feedMass * yields[plastic].char / 100;
        weightedTemp += pyrolysisTemps[plastic] * plastics[plastic] / 100;
        totalHeat += feedMass * heatPerKg[plastic];
        totalDecompHeat += feedMass * decompositionHeatPerKg[plastic];
    }

    const waterMass = totalFeed * waterContent / 100;
    const heatPerKgPlastic = totalHeat / totalPlasticMass;
    const totalProductMass = waterMass + totalGas + totalOil + totalWax + totalChar;
    const pyrolysisPerformance = (totalProductMass / totalFeed) * 100;

    // Show the output section
    document.getElementById('pyrolysisOutput').classList.remove('hidden');
    
    document.getElementById('pyrolysisResult').innerHTML = `
        <table class="custom-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Mass (kg)</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Water</td><td>${waterMass.toFixed(2)}</td></tr>
                <tr><td>Gas</td><td>${totalGas.toFixed(2)}</td></tr>
                <tr><td>Liquid Oil</td><td>${totalOil.toFixed(2)}</td></tr>
                <tr><td>Wax</td><td>${totalWax.toFixed(2)}</td></tr>
                <tr><td>Char/Solid</td><td>${totalChar.toFixed(2)}</td></tr>
            </tbody>
        </table>
        <table class="custom-table">
            <tbody>
                <tr><th>Average Pyrolysis Temperature</th><td>${weightedTemp.toFixed(1)} °C</td></tr>
                <tr><th>Total Heat Required</th><td>${totalHeat.toFixed(2)} MJ</td></tr>
                <tr><th>Heat Required per kg of Plastic</th><td>${heatPerKgPlastic.toFixed(2)} MJ/kg</td></tr>
                <tr><th>Total Decomposition Heat Required</th><td>${totalDecompHeat.toFixed(2)} MJ</td></tr>
                <tr><th>Pyrolysis Performance</th><td>${pyrolysisPerformance.toFixed(2)} %</td></tr>
            </tbody>
        </table>
    `;
}

function calculateReactor() {
    const feedMass = parseFloat(document.getElementById('totalFeed').value);
    const density = parseFloat(document.getElementById('density').value);
    const targetTemp = parseFloat(document.getElementById('targetTemp').value);
    const residenceTime = parseFloat(document.getElementById('residenceTime').value);
    const decompHeat = parseFloat(document.getElementById('decompHeat').value);
    const cp = parseFloat(document.getElementById('cp').value);

    const startTemp = 25;
    const volume = (feedMass / density) * 1.25;
    const heatSensible = feedMass * cp * (targetTemp - startTemp) / 1000;
    const heatDecomposition = feedMass * decompHeat;
    const totalHeat = heatSensible + heatDecomposition;
    const heatingPower = totalHeat * 1000 / (residenceTime * 3600);
    const U = 100;
    const deltaT = 600 - targetTemp / 2;
    const area = heatingPower / (U * deltaT);
    const diameter = Math.cbrt((4 * volume) / Math.PI);
    const height = diameter;

    // Show the output section
    document.getElementById('reactorOutput').classList.remove('hidden');
    
    document.getElementById('reactorResult').innerHTML = `
        <table class="custom-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Reactor Volume (m³)</td><td>${volume.toFixed(2)}</td></tr>
                <tr><td>Total Heat Required (MJ)</td><td>${totalHeat.toFixed(2)}</td></tr>
                <tr><td>Heating Power Required (kW)</td><td>${heatingPower.toFixed(2)}</td></tr>
                <tr><td>Heat Transfer Area (m²)</td><td>${area.toFixed(2)}</td></tr>
                <tr><td>Reactor Diameter (m)</td><td>${diameter.toFixed(2)}</td></tr>
                <tr><td>Reactor Height (m)</td><td>${height.toFixed(2)}</td></tr>
            </tbody>
        </table>
    `;
}