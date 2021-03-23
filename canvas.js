const canvas = document.querySelector('canvas')

// Size
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Context
var c = canvas.getContext('2d');

// Square
// c.fillStyle = 'rgba(255, 0, 0, 0.5)'
// c.fillRect(100, 100, 100, 100)
// c.fillStyle = 'rgba(0, 0, 255, 0.5)'
// c.fillRect(400, 100, 100, 100)
// c.fillStyle = 'rgba(0, 255, 0, 0.5)'
// c.fillRect(300, 300, 100, 100)

// Line
// c.beginPath();
// c.moveTo(50, 300)
// c.lineTo(300, 100)
// c.lineTo(400, 300)
// c.strokeStyle = 'red'
// c.stroke()

// Arc / Circle
// for (i = 0; i < 400; i++) {
// let x = Math.random() * window.innerWidth
// let y = Math.random() * window.innerHeight
// let color = Math.floor(Math.random() * 16777215).toString(16);
// c.beginPath()
// c.arc(x, y, 30, 0, Math.PI * 2, false)
// c.strokeStyle = `#${color}`
// c.stroke();
// }

let mouse = {
  x: undefined,
  y: undefined
}
const maxRadius = 40;
const minRadius = 2

const colorArray = [
  '#ffaa33',
  '#ggffaa',
  '#00ff00',
  '#4411aa',
  '#ff1100'
]

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x
  mouse.y = event.y

})

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  init()
})

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = minRadius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }
    this.x += this.dx;
    this.y += this.dy

    // Interactivity
    if (mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }


    this.draw();
  }

}



let circleArray = [];


function init() {

  circleArray = [];

  for (let i = 0; i < 800; i++) {
    let radius = Math.random() * 3 + 1
    let x = Math.random() * (innerWidth - radius * 2) + radius
    let y = Math.random() * (innerHeight - radius * 2) + radius
    let dx = (Math.random() - 0.5);
    let dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius))
  }

}

init()


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);


  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  // let x = Math.random() * window.innerWidth
  // let y = Math.random() * window.innerHeight
  // let randomColor = Math.floor(Math.random() * 16777215).toString(16);


}

animate()
