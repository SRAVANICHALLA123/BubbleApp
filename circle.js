const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const circles = [
    { x: 100, y: 100, radius: 30, color: "red", arrow: { x: 200, y: 100 }, hit: false },
    { x: 100, y: 200, radius: 30, color: "blue", arrow: { x: 200, y: 200 }, hit: false },
    { x: 100, y: 300, radius: 30, color: "green", arrow: { x: 200, y: 300 }, hit: false },
    { x: 100, y: 400, radius: 30, color: "yellow", arrow: { x: 200, y: 400 }, hit: false }
];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circles
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();
    });

    // Draw arrows
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.moveTo(circle.arrow.x, circle.arrow.y);
        ctx.lineTo(circle.arrow.x + 20, circle.arrow.y - 10);
        ctx.lineTo(circle.arrow.x + 20, circle.arrow.y + 10);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
    });
}

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    circles.forEach(circle => {
        const dx = mouseX - circle.x;
        const dy = mouseY - circle.y;
        if (Math.sqrt(dx * dx + dy * dy) < circle.radius && !circle.hit) {
            moveArrow(circle);
        }
    });
});

function moveArrow(circle) {
    const interval = setInterval(() => {
        if (circle.arrow.x <= circle.x + circle.radius) {
            clearInterval(interval);
            circle.hit = true;
            circle.color = "purple"; 
            draw();
        } else {
            circle.arrow.x -= 2; 
            draw();
        }
    }, 10);
}

document.getElementById("resetButton").addEventListener("click", () => {
    circles.forEach(circle => {
        circle.arrow.x = 200; 
        circle.hit = false;
        circle.color = circle.originalColor; 
    });
    draw();
});

draw();
