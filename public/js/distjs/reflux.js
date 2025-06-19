function parseEqCurve(input) {
    // format: "0,0; 0.2,0.32; 0.4,0.55; ..."
    const pairs = input.split(";").map(s => s.trim());
    const arr = pairs.map(s => {
        const [x, y] = s.split(",").map(Number);
        return {x, y};
    });
    arr.sort((a,b) => a.x-b.x);
    return arr;
}

// Feed line: y = q/(q-1)*x - xF/(q-1)
// Find intersection of feed line and equilibrium curve
function findPinchPoint(xF, q, eqcurve) {
    let pinch = null;
    let minDiff = 1e10;
    for (let i = 0; i < eqcurve.length; i++) {
        let x = eqcurve[i].x;
        let y_feed;
        if (q === 1) y_feed = x; // saturated liquid, feed line is vertical at xF
        else if (q === 0) y_feed = 0; // saturated vapor, feed line is horizontal at y=0
        else y_feed = q/(q-1)*x - xF/(q-1);

        let diff = Math.abs(y_feed - eqcurve[i].y);
        if (diff < minDiff) {
            minDiff = diff;
            pinch = {x: x, y: eqcurve[i].y, y_feed: y_feed, diff: diff};
        }
    }
    return pinch;
}

function minRefluxCalc() {
    const xF = parseFloat(document.getElementById('xF').value);
    const xD = parseFloat(document.getElementById('xD').value);
    const q = parseFloat(document.getElementById('q').value);
    const eqcurve = parseEqCurve(document.getElementById('eqcurve').value);

    if (isNaN(xF) || isNaN(xD) || isNaN(q) || eqcurve.length < 2) {
        document.getElementById('reflux_result').innerHTML = `<div class="error-message">Please enter all fields correctly.</div>`;
        return;
    }

    // 1. Cari titik pinch (interseksi feed line & equilibrium)
    const pinch = findPinchPoint(xF, q, eqcurve);
    if (!pinch) {
        document.getElementById('reflux_result').innerHTML = `<div class="error-message">Could not determine pinch point. Check equilibrium data.</div>`;
        return;
    }

    // 2. Minimum reflux ratio
    // Rmin = (xD - y_q)/(y_q - xF)
    const y_q = pinch.y;
    const Rmin = (xD - y_q) / (y_q - xF);

    document.getElementById('reflux_result').innerHTML = `
      <div>
        <b>Minimum Reflux Ratio (R<sub>min</sub>):</b> ${Rmin.toFixed(3)}<br>
        <small>
          Pinch point (intersection): x = ${pinch.x.toFixed(3)}, y = ${y_q.toFixed(3)} <br>
          Formula: <code>R<sub>min</sub> = (x<sub>D</sub> - y<sub>q</sub>) / (y<sub>q</sub> - x<sub>F</sub>)</code>
        </small>
      </div>
      <hr>
      <small>
        Feed line is calculated using: <code>y = [q/(q-1)]·x - x<sub>F</sub>/(q-1)</code><br>
        Equilibrium curve input as: <code>x,y; ...</code>
      </small>
    `;
}
