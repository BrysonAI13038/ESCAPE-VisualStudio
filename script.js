const canvas = document.getElementById("sigilCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let rotation = 0;
let pulse = 0;

function drawSigil() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dark background
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    // Move to the center
    ctx.translate(centerX, centerY);

    // Slowly rotate the entire sigil
    ctx.rotate(rotation);

    // Slight breathing motion
    const size = 1 + Math.sin(pulse) * 0.05;
    ctx.scale(size, size);

    ctx.strokeStyle = "#eeeeee";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    /*
        SIGIL STRUCTURE

        The sigil is made from:
        1. A vertical line
        2. Two angled lines
        3. A small center shape
    */

    // Vertical line
    ctx.beginPath();
    ctx.moveTo(0, -70);
    ctx.lineTo(0, 70);
    ctx.stroke();

    // Upper-left diagonal
    ctx.beginPath();
    ctx.moveTo(0, -70);
    ctx.lineTo(-45, -25);
    ctx.stroke();

    // Lower-right diagonal
    ctx.beginPath();
    ctx.moveTo(0, 70);
    ctx.lineTo(45, 25);
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    // Update movement
    rotation += 0.002;
    pulse += 0.03;

    requestAnimationFrame(drawSigil);
}

drawSigil();
const behaviorCanvas = document.getElementById("behaviorCanvas");
const behaviorCtx = behaviorCanvas.getContext("2d");

function resizeBehaviorCanvas() {
    behaviorCanvas.width = behaviorCanvas.clientWidth;
    behaviorCanvas.height = behaviorCanvas.clientHeight;
}

resizeBehaviorCanvas();
window.addEventListener("resize", resizeBehaviorCanvas);

const forms = [
    {
        x: 0.25,
        y: 0.35,
        size: 18,
        opacity: 1,
        disappearing: false
    },
    {
        x: 0.50,
        y: 0.50,
        size: 24,
        opacity: 1,
        disappearing: false
    },
    {
        x: 0.72,
        y: 0.32,
        size: 16,
        opacity: 1,
        disappearing: false
    },
    {
        x: 0.68,
        y: 0.70,
        size: 20,
        opacity: 1,
        disappearing: false
    },
    {
        x: 0.30,
        y: 0.72,
        size: 14,
        opacity: 1,
        disappearing: false
    }
];

behaviorCanvas.addEventListener("click", function(event) {

    const rect = behaviorCanvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    forms.forEach(form => {

        const x = form.x * behaviorCanvas.width;
        const y = form.y * behaviorCanvas.height;

        const distance = Math.sqrt(
            (mouseX - x) ** 2 +
            (mouseY - y) ** 2
        );

        if (distance < form.size + 15) {
            form.disappearing = true;
        }

    });

});

function drawBehavior() {

    behaviorCtx.fillStyle = "#050505";
    behaviorCtx.fillRect(
        0,
        0,
        behaviorCanvas.width,
        behaviorCanvas.height
    );

    forms.forEach(form => {

        if (form.disappearing) {
            form.opacity -= 0.01;
            form.size += 0.15;
        }

        if (form.opacity <= 0) {
            form.opacity = 0;
        }

        const x = form.x * behaviorCanvas.width;
        const y = form.y * behaviorCanvas.height;

        behaviorCtx.save();

        behaviorCtx.globalAlpha = form.opacity;
        behaviorCtx.strokeStyle = "#eeeeee";
        behaviorCtx.lineWidth = 2;

        behaviorCtx.beginPath();

        behaviorCtx.arc(
            x,
            y,
            form.size,
            0,
            Math.PI * 2
        );

        behaviorCtx.stroke();

        behaviorCtx.restore();

    });

    requestAnimationFrame(drawBehavior);
}

drawBehavior();
const gestureCanvas = document.getElementById("gestureCanvas");
const gestureCtx = gestureCanvas.getContext("2d");

function resizeGestureCanvas() {
    gestureCanvas.width = gestureCanvas.clientWidth;
    gestureCanvas.height = gestureCanvas.clientHeight;
}

resizeGestureCanvas();
window.addEventListener("resize", resizeGestureCanvas);

let mouseX = -1000;
let mouseY = -1000;

gestureCanvas.addEventListener("mousemove", function(event) {
    const rect = gestureCanvas.getBoundingClientRect();

    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});

gestureCanvas.addEventListener("mouseleave", function() {
    mouseX = -1000;
    mouseY = -1000;
});

function drawGesture() {

    gestureCtx.fillStyle = "#050505";
    gestureCtx.fillRect(
        0,
        0,
        gestureCanvas.width,
        gestureCanvas.height
    );

    const centerX = gestureCanvas.width / 2;
    const centerY = gestureCanvas.height / 2;

    const distance = Math.sqrt(
        (mouseX - centerX) ** 2 +
        (mouseY - centerY) ** 2
    );

    const maxDistance = 300;

    let influence = 1 - distance / maxDistance;

    influence = Math.max(0, Math.min(1, influence));

    gestureCtx.save();

    gestureCtx.translate(centerX, centerY);

    gestureCtx.strokeStyle = "#eeeeee";
    gestureCtx.lineWidth = 3;
    gestureCtx.lineCap = "round";

    // The closer the mouse gets,
    // the more the pieces separate.

    const separation = influence * 35;

    // Vertical form
    gestureCtx.beginPath();
    gestureCtx.moveTo(0, -70 - separation);
    gestureCtx.lineTo(0, -5);
    gestureCtx.stroke();

    gestureCtx.beginPath();
    gestureCtx.moveTo(0, 5);
    gestureCtx.lineTo(0, 70 + separation);
    gestureCtx.stroke();

    // Upper diagonal
    gestureCtx.beginPath();
    gestureCtx.moveTo(0, -70 - separation);
    gestureCtx.lineTo(-45 - separation, -25);
    gestureCtx.stroke();

    // Lower diagonal
    gestureCtx.beginPath();
    gestureCtx.moveTo(0, 70 + separation);
    gestureCtx.lineTo(45 + separation, 25);
    gestureCtx.stroke();

    // Center
    gestureCtx.beginPath();
    gestureCtx.arc(
        0,
        0,
        14 + influence * 8,
        0,
        Math.PI * 2
    );
    gestureCtx.stroke();

    gestureCtx.restore();

    requestAnimationFrame(drawGesture);
}

drawGesture();
const atmosphereCanvas = document.getElementById("atmosphereCanvas");
const atmosphereCtx = atmosphereCanvas.getContext("2d");

function resizeAtmosphereCanvas() {
    atmosphereCanvas.width = atmosphereCanvas.clientWidth;
    atmosphereCanvas.height = atmosphereCanvas.clientHeight;
}

resizeAtmosphereCanvas();
window.addEventListener("resize", resizeAtmosphereCanvas);

function drawAtmosphere() {

    const centerX = atmosphereCanvas.width / 2;
    const centerY = atmosphereCanvas.height / 2;

    // Dark background
    atmosphereCtx.fillStyle = "#020202";
    atmosphereCtx.fillRect(
        0,
        0,
        atmosphereCanvas.width,
        atmosphereCanvas.height
    );

    // Subtle central glow
    const glow = atmosphereCtx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        260
    );

    glow.addColorStop(0, "rgba(255,255,255,0.08)");
    glow.addColorStop(1, "rgba(0,0,0,0)");

    atmosphereCtx.fillStyle = glow;

    atmosphereCtx.fillRect(
        0,
        0,
        atmosphereCanvas.width,
        atmosphereCanvas.height
    );

    // Simple sigil
    atmosphereCtx.save();

    atmosphereCtx.translate(centerX, centerY);

    atmosphereCtx.strokeStyle = "rgba(255,255,255,0.85)";
    atmosphereCtx.lineWidth = 2;

    atmosphereCtx.beginPath();
    atmosphereCtx.moveTo(0, -60);
    atmosphereCtx.lineTo(0, 60);
    atmosphereCtx.stroke();

    atmosphereCtx.beginPath();
    atmosphereCtx.moveTo(0, -60);
    atmosphereCtx.lineTo(-40, -20);
    atmosphereCtx.stroke();

    atmosphereCtx.beginPath();
    atmosphereCtx.moveTo(0, 60);
    atmosphereCtx.lineTo(40, 20);
    atmosphereCtx.stroke();

    atmosphereCtx.beginPath();
    atmosphereCtx.arc(
        0,
        0,
        12,
        0,
        Math.PI * 2
    );

    atmosphereCtx.stroke();

    atmosphereCtx.restore();

    requestAnimationFrame(drawAtmosphere);
}

drawAtmosphere();