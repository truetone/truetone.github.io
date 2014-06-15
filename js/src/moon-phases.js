// http://jsfiddle.net/Mqzu7/12/

function moon(opts) {
    "use strict";
    var paper;

    // set defaults (using ternery if/else statements)
    opts.r = typeof opts.r === "number" ? opts.r : 100;
    opts.phase = typeof opts.phase === "number" ? opts.phase : 0.25;
    opts.x = typeof opts.x === "number" ? opts.x : 0;
    opts.y = typeof opts.y === "number" ? opts.y : 0;

    if (opts.el && typeof opts.el === "string") {
        paper = new Raphael(opts.el, opts.r * 2, opts.r * 2);
    } else if (opts.el && typeof opts.el === "object" && opts.el.canvas) {
        paper = opts.el;
    } else {
        paper = new Raphael(0, 0, opts.r * 2, opts.r * 2);
    }

    var shadow = paper.circle(opts.r + opts.x, opts.r + opts.y, opts.r).attr({
        'stroke-width': 0,
        fill: '#999'
    });

    function shape(phase) {
        phase = typeof phase === "number" ? phase : 0.25;
        // limit phase to [0,1]
        phase = Math.max(0, Math.min(1, phase));
        // convert to [-1,1]
        phase = (phase - 0.5) * 2;

        // left arc
        var path = "M" + opts.r + ",0";
        path += "a" + opts.r + "," + opts.r + " 0 0,0 0," + opts.r * 2;

        var clockwise_flag = phase > 0 ? 0 : 1;
        phase = Math.abs(phase);

        // avoid divide by zero
        phase = phase || 0.0001;

        opts.inner_r = opts.r / Math.pow(phase, 0.5);

        path += "M" + opts.r + "," + opts.r * 2;
        path += "a" + opts.inner_r + "," + opts.inner_r + " 0 0," + clockwise_flag + " 0," + opts.r * -2;
        return path;
    }

    var orb = paper.path(shape(opts.phase)).attr({
        'stroke-width': 0,
        'stroke': "#999",
        fill: "#fff"
    }).transform("T" + opts.x + "," + opts.y);

    return {
        setPhase: function(new_phase) {
            orb.attr("path", shape(new_phase));
        }
    };
}

var paper = Raphael("canvas", 500, 40);

/*
for (var c = 0; c <= 1; c += 0.1) {
    var m = moon({
        el: paper,
        r: 20,
        phase: c,
        x: c * 420,
        y: 0
    });
}
*/
var c = 0.29;

var m = moon({
    el: paper,
    r: 20,
    phase: c,
});
