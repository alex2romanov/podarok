// Показать будущее
const futureButton = document.getElementById('futureButton');
const futureBox = document.getElementById('futureBox');

futureButton.addEventListener('click', () => {
    futureBox.classList.remove('hidden');
    futureButton.classList.add('hidden');
});

// Воспоминания по странам
const countryButtons = document.querySelectorAll('.country');
const memory = document.getElementById('memory');

const memories = {
    france: "Помнишь, как мы ели круассаны под Эйфелевой башней?",
    japan: "Суши в Токио и наши прыжки с парашютом над Фудзи!",
    italy: "Пицца в Риме и мечты о Тоскане — скоро это будет реальностью!"
    // Добавьте свои воспоминания для остальных 10 стран
};

countryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const country = button.getAttribute('data-country');
        memory.textContent = memories[country] || "Ещё одно приключение с тобой!";
        memory.classList.remove('hidden');
    });
});

// Анимация падающих парашютов
const canvas = document.getElementById('parachuteCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const parachutes = [];
const parachuteCount = 20;

class Parachute {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 1 + 0.5;
    }

    draw() {
        ctx.fillStyle = '#ff9999';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI, true); // Полукруг парашюта
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.size / 2, this.y + this.size);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size / 2, this.y + this.size);
        ctx.stroke();
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height + this.size) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }
}

for (let i = 0; i < parachuteCount; i++) {
    parachutes.push(new Parachute());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parachutes.forEach(parachute => {
        parachute.update();
        parachute.draw();
    });
    requestAnimationFrame(animate);
}

animate();
