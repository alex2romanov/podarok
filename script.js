// Показать будущее
const futureButton = document.getElementById('futureButton');
const futureBox = document.getElementById('futureBox');

futureButton.addEventListener('click', () => {
    futureBox.classList.remove('hidden');
    futureButton.classList.add('hidden');
});

// Воспоминания и фото по странам
const countryButtons = document.querySelectorAll('.country');
const memory = document.getElementById('memory');
const countryPhoto = document.getElementById('countryPhoto');
const memoryBox = document.getElementById('memoryBox');

const memories = {
    france: { text: "Поцелуй под Эйфелевой башней!", photo: "france.jpg" },
    penida: { text: "Ранний подъем и экстаз!", photo: "penida.jpg" },
    elephant: { text: "До чего же большие гиганты!", photo: "elephants.jpg" },
    siargao: { text: "Побыли в раю на краю мира:)", photo: "siargao.jpg" },
    dragon: { text: "Увидели настоящего дракона и не были съедены!!", photo: "dragon.jpg" },
    danang: { text: "Оставалась сильной и непобедимой", photo: "danang.jpg" },
    parents: { text: "Училась быть терпиливой", photo: "parents.jpg" },
    vova: { text: "Любили и заботились о нашем любимом", photo: "vova.jpg" },
    komodo: { text: "Покоряли вершины!", photo: "komodo.jpg" }
};

countryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const country = button.getAttribute('data-country');
        const memoryData = memories[country] || { text: "Ещё одно приключение с тобой!", photo: "default.jpg" };
        
        memory.textContent = memoryData.text;
        countryPhoto.src = memoryData.photo;
        
        memoryBox.classList.remove('hidden');
        countryPhoto.classList.remove('hidden');
    });
});

// Проверка URL и отправка подарка
const urlParams = new URLSearchParams(window.location.search);
const giftMessage = document.getElementById('giftMessage');

if (urlParams.get('gift') === 'true') {
    giftMessage.classList.remove('hidden');
    fetch('https://<ваш-сервер>.com/send-gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: '[её_email]', username: '[Имя]' })
    })
    .then(response => response.json())
    .then(data => console.log('Email sent:', data))
    .catch(error => console.error('Error sending gift:', error));
}

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
        ctx.arc(this.x, this.y, this.size, 0, Math.PI, true);
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
