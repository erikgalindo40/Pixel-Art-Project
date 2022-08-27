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

function drawBiggerPixelValue(cell) {
    let gridArray = Array.from(gridCells)
    let currentCell = gridArray.indexOf(cell)
    gridArray[currentCell-1].style.background = currentColor
    gridArray[currentCell-currentGridDimensions].style.background = currentColor
    gridArray[currentCell-currentGridDimensions-1].style.background = currentColor
}

function drawPixelValueThree(cell) {
    let gridArray = Array.from(gridCells)
    let currentCell = gridArray.indexOf(cell)
    gridArray[currentCell-1].style.background = currentColor
    gridArray[currentCell-currentGridDimensions].style.background = currentColor
    gridArray[currentCell-currentGridDimensions-1].style.background = currentColor

    gridArray[currentCell-2].style.background = currentColor
    gridArray[currentCell-currentGridDimensions-2].style.background = currentColor

    gridArray[currentCell-(currentGridDimensions*2)].style.background = currentColor
    gridArray[currentCell-(currentGridDimensions*2)-1].style.background = currentColor
    gridArray[currentCell-(currentGridDimensions*2)-2].style.background = currentColor
}

function startDrawing() { //stored in installEventListeners
    if(this.dataset.nocolor == 'nocolor') { 
        isDrawing=true 
    } else if (pixelSizeSlider.value==2) {
        this.style.background = currentColor
        drawBiggerPixelValue(this)
        isDrawing=true
    } else if (pixelSizeSlider.value==3) {
        this.style.background = currentColor
        drawPixelValueThree(this)
        isDrawing = true
    } else {
        this.style.background = currentColor
        isDrawing = true
    }
}

function continueDrawing() { //stored in installEventListeners
    if (isDrawing) {
       this.style.background = currentColor
       if (pixelSizeSlider.value==2) {
        drawBiggerPixelValue(this)
       }
       if (pixelSizeSlider.value==3) {
        drawPixelValueThree(this)
       }
    }
}

function stopDrawing() { //stored in installEventListeners
    isDrawing = false
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
}

function toggleQuestionDisplay() {
    body.classList.toggle('hide')
    questionContainer.classList.toggle('hide')

}

function createGridSize() {
    let gridSizeUserInput = gridSizeDefiner.value
    let gridDimensionsMet = gridSizeUserInput > 0 && gridSizeUserInput <=55
    if (gridDimensionsMet && isDrawnOn) {
        question.innerText = 'Current grid is about to be replaced'
        toggleQuestionDisplay()
    } else {
        if (gridDimensionsMet) {
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
