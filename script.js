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