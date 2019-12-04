const can = document.getElementById("content"), ctx = can.getContext("2d"), position = [], idx = 0;

// Definindo o tamanho do canvas
can.width = innerWidth - 21;
can.height = innerHeight - 21;

// Object Ball (options)
const Ball = function () {
    this.can = can;
    this.ctx = ctx;
    this.size = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    this.gravity = 9.80;
    this.velocity = [8, 0];
    this.bounce = 0.8;
    this.friction = 1;
    this.position = [100, 0];
    this.stopLimit = 10;
    this.id = ++this.constructor.prototype.ID;

    const that = this;

    this.init = function () {
        that.motion();
        that.draw();
        requestAnimFrame(that.init);
    };
};

//Numero de instancias
Ball.prototype.ID = 0;

//Desenha uma nova bola no canvas
Ball.prototype.draw = function () {
    if (this.id === 1) {
        this.ctx.clearRect(0, 0, this.can.width, this.can.height);
    }
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.position[0], this.position[1], this.size, 0, Math.PI * 2, true);
    this.ctx.moveTo(this.position[0] + this.size, this.position[1]);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.fill();
};

//Calcula movimento/posicoes das bolas
Ball.prototype.motion = function () {
    //tratamento para parar bola
    if (parseInt(this.velocity[0]) === 0 && parseInt(this.velocity[1]) === 0) {
        this.break += 1;
    } else {
        this.break = 0;
    }

    //reduz a velocidade da bola e direciona bola
    if (this.break < this.stopLimit) {
        this.velocity[1] += this.gravity / 10;
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];

        if (this.position[1] > this.can.height - this.size) {
            this.position[1] = this.can.height - this.size;
            this.velocity[1] = this.velocity[1] * (-1) * this.bounce;
            this.velocity[0] /= this.friction;
        }

        if (this.position[0] <= 0 + this.size) {
            this.position[0] = this.size;
            this.velocity[0] *= (-1);
        } else if (this.position[0] >= this.can.width - this.size) {
            this.position[0] = this.can.width - this.size;
            this.velocity[0] *= (-1);
        }
    }
};

/** Função para adicionar uma nova bola */
function addABall() {
    position[idx] = new Ball();
    position[idx].color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    position[idx].velocity = [Math.random() * 10 - 20, Math.random() * 6 - 2.6];
    position[idx].bounce = Math.random() * 0.2 + 0.8;
    position[idx].friction = Math.random() * 0.04 + 1;
    position[idx].init();
    idx++;
}

/* fix from Paul Irish */
window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
