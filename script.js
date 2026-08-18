const canvas = document.getElementById("sigilCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function drawSigil() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(centerX, centerY);

    ctx.strokeStyle = "#eeeeee";
    ctx.lineWidth = 3;

    // Vertical form
    ctx.beginPath();
    ctx.moveTo(0, -80);
    ctx.lineTo(0, 80);
    ctx.stroke();

    // Horizontal form
    ctx.beginPath();
    ctx.moveTo(-80, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();

    // Center shape
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
}

drawSigil();