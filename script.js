const body = document.getElementById('body')
const grid = document.getElementById('grid')
const gridSizeDefiner = document.getElementById('gridSizeDefiner')
const submitButton = document.getElementById('submitButton')
const initButton = document.getElementById('initButton')
const yesAnswerButton = document.getElementById('yesAnswerButton')
const noAnswerButton = document.getElementById('noAnswerButton')
const questionContainer = document.getElementById('questionContainer')
const clearGridButton = document.getElementById('clearGridButton')
const pixelSizeSlider = document.getElementById('pixelSizeSlider')
const question = document.getElementById('question')
let pixelSizeValue = document.getElementById('pixelSizeValue')
let currentColor = '#18AFA5'
let isDrawing = false
let isDrawnOn = false
let isGrid = false
let currentGridDimensions = 0
let gridCells = []
let gridSizeUserInput = 0
//on dev
function drawPixelValueOne(cell) {
    cell.style.background = currentColor
}

function drawPixelValueTwo(cell) {
    if(cell.dataset.topleftcorner=='true') {
        drawPixelValueOne(cell)
    } else {
        let gridArray = Array.from(gridCells)
        let currentCell = gridArray.indexOf(cell)
        if (cell.dataset.leftedge == 'true') {
            drawPixelValueOne(cell)
            gridArray[currentCell-currentGridDimensions].style.background = currentColor
        } else if (cell.dataset.topedge=='true') {
            drawPixelValueOne(cell)
            gridArray[currentCell-1].style.background = currentColor
        } else {
            cell.style.background = currentColor
            gridArray[currentCell-1].style.background = currentColor
            gridArray[currentCell-currentGridDimensions].style.background = currentColor
            gridArray[currentCell-currentGridDimensions-1].style.background = currentColor
        }
    }
}

function drawPixelValueThree(cell) {
    if(cell.dataset.topleftside=='true') {
        drawPixelValueTwo(cell)
    } else {
        let gridArray = Array.from(gridCells)
        let currentCell = gridArray.indexOf(cell)
    if (cell.dataset.leftedge=='true') {
        drawPixelValueTwo(cell)
        gridArray[currentCell-(currentGridDimensions*2)].style.background = currentColor
    } else if (cell.dataset.leftside=='true') {
        drawPixelValueTwo(cell)
        gridArray[currentCell-(currentGridDimensions*2)].style.background = currentColor
        gridArray[currentCell-(currentGridDimensions*2)-1].style.background = currentColor
    } else if (cell.dataset.topedge=='true') {
        drawPixelValueTwo(cell)
        gridArray[currentCell-2].style.background = currentColor
    } else if (cell.dataset.topside=='true') {
        drawPixelValueTwo(cell)
        gridArray[currentCell-2].style.background = currentColor
        gridArray[currentCell-currentGridDimensions-2].style.background = currentColor
    } else {
        cell.style.background = currentColor
        gridArray[currentCell-1].style.background = currentColor
        gridArray[currentCell-currentGridDimensions].style.background = currentColor
        gridArray[currentCell-currentGridDimensions-1].style.background = currentColor
        
        gridArray[currentCell-2].style.background = currentColor
        gridArray[currentCell-currentGridDimensions-2].style.background = currentColor
        
        gridArray[currentCell-(currentGridDimensions*2)].style.background = currentColor
        gridArray[currentCell-(currentGridDimensions*2)-1].style.background = currentColor
        gridArray[currentCell-(currentGridDimensions*2)-2].style.background = currentColor
    }
}
}

function startDrawing() { //stored in installEventListeners
    if(this.dataset.nocolor == 'nocolor') { 
        isDrawing=true 
    } else {
        if(pixelSizeSlider.value==1) {drawPixelValueOne(this); isDrawing=true}
        if (pixelSizeSlider.value==2) {drawPixelValueTwo(this); isDrawing=true}
        if (pixelSizeSlider.value==3) {drawPixelValueThree(this); isDrawing=true}
    }
}

function continueDrawing() { //stored in installEventListeners
    if (isDrawing) {
        if(pixelSizeSlider.value==1) {drawPixelValueOne(this)}
        if (pixelSizeSlider.value==2) {drawPixelValueTwo(this)}
        if (pixelSizeSlider.value==3) {drawPixelValueThree(this)}
    }
}

function stopDrawing() { //stored in installEventListeners
    isDrawing = false
}

function installTestAttributes() {
    for (let i = 0; i < parseInt(gridSizeUserInput)+2; i++) {
        if (i==0) {gridCells[i].dataset.topleftcorner='true';gridCells[i].dataset.topleftside='true'}
        if (i==parseInt(gridSizeUserInput)+1||i==1||i==parseInt(gridSizeUserInput)) {gridCells[i].dataset.topleftside='true'}
    }
    for (let i = 0; i < gridCells.length; i+=parseInt(gridSizeUserInput)) {// leftmost & topmost edge 
        gridCells[i].dataset.leftedge = 'true'
    }
    for (let i=0;i<parseInt(gridSizeUserInput);i++) {
        gridCells[i].dataset.topedge = 'true'
    }
    for (let i = 1; i < gridCells.length; i+=parseInt(gridSizeUserInput)) {// one cell from left & top edge
        gridCells[i].dataset.leftside = 'true'
    }
    for (let i=parseInt(gridSizeUserInput);i<parseInt(gridSizeUserInput)*2;i++) {
        gridCells[i].dataset.topside = 'true'
    }
}

function installGridEventListeners() { //stored in installEventListeners
    grid.addEventListener('click', ()=>{isDrawnOn=true})
    grid.addEventListener('mousedown', startDrawing)
    grid.addEventListener('mouseleave', stopDrawing)
    grid.addEventListener('mouseup', stopDrawing)
}

function installEventListeners() { //stored in createGridSize
    gridCells = document.getElementsByTagName('li')
    for (let item of gridCells) {
        item.addEventListener('mousedown', startDrawing)
        item.addEventListener('mouseover', continueDrawing)
        item.addEventListener('mouseup', stopDrawing)
    }
    installGridEventListeners()
    installTestAttributes()
}

function toggleQuestionDisplay() {
    body.classList.toggle('hide')
    questionContainer.classList.toggle('hide')

}

function createGridSize() {
    gridSizeUserInput = gridSizeDefiner.value
    let validGridDimensions = gridSizeUserInput > 0 && gridSizeUserInput <=55
    if (validGridDimensions && isDrawnOn) {
        question.innerText = 'Current Grid is about to be replaced'
        toggleQuestionDisplay()
    } else {
        if (validGridDimensions) {
        currentGridDimensions = gridSizeDefiner.value
        if (grid.innerHTML != '') {grid.innerText=''} //clears current grid
        let gridCell = document.createElement('li')
        let i=0
        grid.style.gridTemplateColumns = `repeat(${gridSizeUserInput},auto)`
        while (i < Math.pow(gridSizeUserInput, 2)) {
            grid.appendChild(gridCell.cloneNode())
            i++
        }
        installEventListeners()
        isDrawnOn=false
    }}
    isGrid=true
}

pixelSizeSlider.addEventListener('input' ,()=> {
    pixelSizeValue.innerText=pixelSizeSlider.value
})
clearGridButton.addEventListener('click', ()=>{
    if (isGrid && isDrawnOn) {
        question.innerText = 'Current grid is about to be erased'
        toggleQuestionDisplay()
    }
})
yesAnswerButton.addEventListener('click',()=>{
        isDrawnOn=false
        createGridSize()
        toggleQuestionDisplay()
})
noAnswerButton.addEventListener('click', toggleQuestionDisplay)
submitButton.addEventListener('click', createGridSize)
