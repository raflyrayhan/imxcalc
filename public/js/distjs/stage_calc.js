// Linear interpolation on equilibrium curve
function interpolateY(x, eqcurve) {
    // eqcurve = array of {x, y}, x sorted ascending
    for (let i = 0; i < eqcurve.length - 1; i++) {
        const x0 = eqcurve[i].x, y0 = eqcurve[i].y;
        const x1 = eqcurve[i + 1].x, y1 = eqcurve[i + 1].y;
        if (x >= x0 && x <= x1) {
            // linear interpolation
            return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
        }
    }
    // if out of bounds, clamp to min/max
    return x <= eqcurve[0].x ? eqcurve[0].y : eqcurve[eqcurve.length-1].y;
}

function interpolateX(y, eqcurve) {
    for (let i = 0; i < eqcurve.length - 1; i++) {
        const x0 = eqcurve[i].x, y0 = eqcurve[i].y;
        const x1 = eqcurve[i + 1].x, y1 = eqcurve[i + 1].y;
        if (y >= y0 && y <= y1) {
            return x0 + (x1 - x0) * (y - y0) / (y1 - y0);
        }
    }
    return y <= eqcurve[0].y ? eqcurve[0].x : eqcurve[eqcurve.length-1].x;
}

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

function stageCalc() {
    const x_start = parseFloat(document.getElementById('x_start').value);
    const x_target = parseFloat(document.getElementById('x_target').value);
    const m = parseFloat(document.getElementById('m').value);
    const c = parseFloat(document.getElementById('c').value);
    const eqcurve = parseEqCurve(document.getElementById('eqcurve').value);

    if (isNaN(x_start) || isNaN(x_target) || isNaN(m) || isNaN(c) || eqcurve.length < 2) {
        document.getElementById('stage_result').innerHTML = `<div class="error-message">Please enter all required fields correctly.</div>`;
        return;
    }

    let steps = 0;
    let x = x_start;
    let y;

    let stageData = [];
    while (x < x_target - 1e-5 && steps < 100) {
        // 1. Move up vertically to equilibrium curve: y_eq = f(x)
        y = interpolateY(x, eqcurve);
        // 2. Move horizontally to operating line: x_new = (y - c) / m
        let x_new = (y - c) / m;
        if (x_new > x_target) x_new = x_target;
        stageData.push({step: steps+1, x, y, x_new});
        x = x_new;
        steps++;
        if (x >= x_target - 1e-5) break;
    }

    let html = `<div><b>Estimated Number of Theoretical Stages:</b> ${steps}</div>`;
    html += `<hr><b>Stage-wise Progression:</b>
    <table style="width:100%;border-collapse:collapse;">
    <tr><th>Step</th><th>x (bottom)</th><th>y (to equilibrium)</th><th>x (to op. line)</th></tr>`;
    for (let s of stageData) {
        html += `<tr><td>${s.step}</td><td>${s.x.toFixed(4)}</td><td>${s.y.toFixed(4)}</td><td>${s.x_new.toFixed(4)}</td></tr>`;
    }
    html += "</table><hr>";
    html += `<small>
        Steps: vertical to equilibrium curve (y = f(x)), then horizontal to operating line (y = mx + c), repeat until x_target.<br>
        Input equilibrium as pairs (x,y), e.g.: <code>0,0; 0.2,0.32; 0.4,0.55; ...</code>
    </small>`;

    document.getElementById('stage_result').innerHTML = html;
}
