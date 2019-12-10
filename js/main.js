'use strict'

let gCanvas;
let gCtx;
let gColor;
let gFillColor;
let gCurrShape = 'triangle';
let gLastPos = { x: 0, y: 0 };

function init() {
    gCanvas = document.querySelector('.my-canvas');
    gCtx = gCanvas.getContext('2d');

    gCanvas.width = window.innerWidth - 50;
    gCanvas.height = window.innerHeight - 250;

    onSetColor();
    onSetFillColor();

    gCanvas.addEventListener('mousemove', draw);
    gCanvas.addEventListener('mousedown', setPosition);
    gCanvas.addEventListener('mouseup', setPosition);
    gCanvas.addEventListener('touchmove', touchDraw);
    gCanvas.addEventListener('touchstart', setTouchPos);
    // gCanvas.addEventListener('touchend', toggleStopBool);


    window.addEventListener('resize',
        function () {
            gCanvas.width = window.innerWidth - 50;
            gCanvas.height = window.innerHeight - 300;
        })
}

function setPosition(ev) {
    gLastPos.x = ev.offsetX;
    gLastPos.y = ev.offsetY;

}
// function drawLine(x, y) {
//     gCtx.save();
//     gCtx.beginPath();
//     gCtx.arc(x, y, 10, 0, Math.PI * 2);
//     gCtx.strokeStyle = gColor;
//     gCtx.fillStyle = gFillColor;
//     gCtx.stroke();
//     gCtx.fill();
//     gCtx.restore();
// }

function drawLine(ev) {
    gCtx.save();
    gCtx.strokeStyle = gColor;
    gCtx.beginPath();
    gCtx.moveTo(gLastPos.x, gLastPos.y);
    setPosition(ev);
    gCtx.lineTo(gLastPos.x, gLastPos.y);
    gCtx.closePath()
    gCtx.stroke();
    gCtx.restore();
}

function touchDrawLine(ev) {
    gCtx.save();
    gCtx.strokeStyle = gColor;
    gCtx.beginPath();
    gCtx.moveTo(gLastPos.x, gLastPos.y);
    setTouchPos(ev);
    gCtx.lineTo(gLastPos.x, gLastPos.y);
    gCtx.closePath()
    gCtx.stroke();
    gCtx.restore();
}

function drawRect(x, y) {
    gCtx.save()
    gCtx.beginPath();
    gCtx.rect(x, y, 150, 150)
    gCtx.fillStyle = gFillColor;
    gCtx.fillRect(x, y, 150, 150)
    gCtx.strokeStyle = gColor;
    gCtx.stroke()
    gCtx.closePath()
    gCtx.restore()
}

function drawTriangle(x, y) {
    gCtx.save()
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gCtx.lineTo(x - 50, y - 50);
    gCtx.lineTo(x + 50, y - 50);
    gCtx.closePath()
    gCtx.strokeStyle = gColor;
    gCtx.fillStyle = gFillColor;
    gCtx.stroke();
    gCtx.fill()
    gCtx.restore()

}

function drawArc(x, y) {
    gCtx.save();
    gCtx.beginPath();
    gCtx.arc(x, y, 50, 0, Math.PI * 2);
    gCtx.strokeStyle = gColor;
    gCtx.fillStyle = gFillColor;
    gCtx.stroke();
    gCtx.fill();
    gCtx.restore();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.png';
}

function setShape(shape) {
    gCurrShape = shape;
}

function setTouchPos(touchEvent) {
    let rect = gCanvas.getBoundingClientRect();
    gLastPos.x = touchEvent.touches[0].clientX - rect.left;
    gLastPos.y = touchEvent.touches[0].clientY - rect.top;
}

function draw(ev) {
    if (ev.buttons !== 1) return;
    gCtx.save();

    const offsetX = ev.offsetX;
    const offsetY = ev.offsetY;

    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY);
            break;
        case 'rect':
            drawRect(offsetX, offsetY);
            break;
        case 'line':
            drawLine(ev);
            break;
        case 'circle':
            drawArc(offsetX, offsetY);
            break;
    }
    gCtx.restore()
}

function touchDraw(ev) {
    gCtx.save();
    const offsetX = gLastPos.x;
    const offsetY = gLastPos.y;
    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY);
            break;
        case 'rect':
            drawRect(offsetX, offsetY);
            break;
        case 'line':
            touchDrawLine(ev);
            break;
        case 'circle':
            drawArc(offsetX, offsetY);
            break;
    }
    setTouchPos(ev);
    gCtx.restore();
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth - 100
    gCanvas.height = elContainer.offsetHeight - 100

    // TODO: redraw..
}


function onSetColor() {
    gColor = document.querySelector('.color').value;
}

function onSetFillColor() {
    gFillColor = document.querySelector('.fill-color').value;
}