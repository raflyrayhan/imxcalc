// Joback group contribution database (simplified sample)
const groupContributions = {
  CH3: { Tc: 0.0159, Pc: 0.0274, Tb: 23.58, Tm: -82.2, Hvap: 7.95, Hfus: 0.0 },
  CH2: { Tc: 0.0208, Pc: 0.0265, Tb: 22.88, Tm: -80.0, Hvap: 7.07, Hfus: 0.0 },
  OH:  { Tc: 0.0489, Pc: 0.0129, Tb: 18.0, Tm: -16.0, Hvap: 8.5,  Hfus: 0.0 },
  // Add more groups as necessary
};

function calculateJoback() {
  const rawInput = document.getElementById('groupData').value.trim().split('\n');
  const parsedGroups = {};

  rawInput.forEach(line => {
    const [group, countStr] = line.split(',').map(s => s.trim());
    const count = parseInt(countStr);
    if (group && !isNaN(count)) {
      parsedGroups[group] = (parsedGroups[group] || 0) + count;
    }
  });

  let TcSum = 0, PcSum = 0, TbSum = 198, TmSum = 122, HvapSum = 0, HfusSum = 0;

  for (const group in parsedGroups) {
    if (!groupContributions[group]) {
      document.getElementById('result').innerHTML = `<p class="error-message">Unknown group: ${group}</p>`;
      return;
    }
    const count = parsedGroups[group];
    const contrib = groupContributions[group];

    TcSum += contrib.Tc * count;
    PcSum += contrib.Pc * count;
    TbSum += contrib.Tb * count;
    TmSum += contrib.Tm * count;
    HvapSum += contrib.Hvap * count;
    HfusSum += contrib.Hfus * count;
  }

  const resultHTML = `
    <h3>Estimated Properties</h3>
    <ul>
      <li><strong>Boiling Point (Tb)</strong>: ${TbSum.toFixed(2)} K</li>
      <li><strong>Melting Point (Tm)</strong>: ${TmSum.toFixed(2)} K</li>
      <li><strong>Critical Temperature (Tc)</strong>: ${(198 + TcSum).toFixed(2)} K</li>
      <li><strong>Critical Pressure (Pc)</strong>: ${(1 / (PcSum + 0.113)).toFixed(3)} MPa</li>
      <li><strong>Enthalpy of Vaporization (Hvap)</strong>: ${HvapSum.toFixed(2)} kJ/mol</li>
      <li><strong>Enthalpy of Fusion (Hfus)</strong>: ${HfusSum.toFixed(2)} kJ/mol</li>
    </ul>`;

  document.getElementById('result').innerHTML = resultHTML;
}
