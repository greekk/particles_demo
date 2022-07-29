//console.log(Math.random() * 5 +1 )

// drawCircle(400,400, 50, null, "blue",10);
// drawRectangle(100,100, 100, 50, "purple");

// //refresh canvas on resizing
// window.addEventListener("resize", (evt) =>{
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     drawCircle(200,200, 50, "red");
//     drawCircle(400,400, 50, null, "blue", 20);
//     drawRectangle(100,100, 100, 50, "purple");
// })

// //function drawing the rectangle
// function drawRectangle(x,y, width, height, color){
//     context.fillStyle = color;
//     context.fillRect(x,y, width, height);
// }

//function is drawing a filled stroked circle
// function drawCircle(x,y,radius, fillColor, strokeColor, lineWidth=1){
//     context.beginPath();
//     context.arc(x,y, radius, 0, Math.PI*2);
//     if(fillColor){
//         context.fillStyle = fillColor;
//         context.fill();
//     }
//     if(strokeColor){
//         context.strokeStyle = strokeColor;
//         context.lineWidth = lineWidth;
//         context.stroke();
//     }
// }

// function init(){
//     for (let i = 0; i < 100; i++) {
//         particles.push( new Particle() );
//     }
// }

//a particle class
class Particle {
    constructor()
    {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue}, 100%, 50%)`;
    }

    //alternate its coordinates and redraw
    update()
    {
        this.x += this.speedX;
        this.y += this.speedY;
        this.draw()
        if(this.size > .3) this.size -= .1;
    }

    //draw particle
    draw()
    {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x,this.y, this.size, 0,  Math.PI*2);
        context.fill();
    }
}


//creating the canvas and the context
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
//initial tunning of canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//variables of array of particles and mouse coordinates
particles = [];

mouse = {
    x: undefined,
    y: undefined
}

let hue = 0;

function drawLine(particleOne, particleTwo)
{
    context.beginPath();
    context.strokeStyle = particleOne.color;
    context.lineWidth = .2;
    context.moveTo(particleOne.x, particleOne.y);
    context.lineTo(particleTwo.x, particleTwo.y);
    context.stroke();
    context.closePath();
}


function drawParticles(){
    particles.forEach( (particle, index) =>
    {
        particle.update();
        particles.forEach((secondParticle)=>
        {
            const dx = particle.x - secondParticle.x;
            const dy = particle.y - secondParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 100)
            {
                drawLine(particle, secondParticle)
            }
        })
        //delete particle from particles array if size less than 0.2
        if(particle.size < 0.3)
        {
            particles.splice(index,1);
            index--;
        }
    });
}

function animate(){
    context.clearRect(0,0, canvas.width, canvas.height);
    // context.fillStyle = 'rgba(0,0,0,.05)';
    // context.fillRect(0,0, canvas.width, canvas.height)
    drawParticles();
    requestAnimationFrame(animate);
    hue++;
}


canvas.addEventListener("click", (event)=>
{
    mouse.x = event.x;
    mouse.y = event.y;
    particles.push(new Particle())
    for(let i = 0; i < 5; i++){
        particles.push(new Particle());
    }
});

canvas.addEventListener("mousemove", (event)=>
{
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 4; i++){
        particles.push(new Particle());
    }
});

animate();