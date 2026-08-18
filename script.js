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