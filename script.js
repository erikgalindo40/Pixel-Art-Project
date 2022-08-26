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
let pixelSizeValue = document.getElementById('pixelSizeValue')
let currentColor = '#18AFA5'
let isDrawing = false
let isDrawnOn = false
let isGrid = false
let currentGridDimensions = 0
let listItems = []
pixelSizeValue.innerText = pixelSizeSlider.value

function drawBiggerPixelValue(cell) {
    let arr = Array.from(listItems)
    let test = arr.indexOf(cell)
    arr[test-1].style.background = currentColor
    arr[test-currentGridDimensions].style.background = currentColor
    arr[test-currentGridDimensions-1].style.background = currentColor
}

function drawPixelValueThree(cell) {
    let arr = Array.from(listItems)
    let test = arr.indexOf(cell)
    arr[test-1].style.background = currentColor
    arr[test-currentGridDimensions].style.background = currentColor
    arr[test-currentGridDimensions-1].style.background = currentColor

    arr[test-2].style.background = currentColor
    arr[test-currentGridDimensions-2].style.background = currentColor

    arr[test-(currentGridDimensions*2)].style.background = currentColor
    arr[test-(currentGridDimensions*2)-1].style.background = currentColor
    arr[test-(currentGridDimensions*2)-2].style.background = currentColor
}

function startDrawing() { //stored in installEventListeners
    if(this.dataset.nocolor == 'nocolor') { 
        isDrawing=true 
    } else if (pixelSizeValue.innerText==2) {
        this.style.background = currentColor
        drawBiggerPixelValue(this)
        isDrawing=true
    } else if (pixelSizeValue.innerText==3) {
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
       if (pixelSizeValue.innerText==2) {
        drawBiggerPixelValue(this)
       }
       if (pixelSizeValue.innerText==3) {
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
    listItems = document.getElementsByTagName('li')
    for (let item of listItems) {
        item.addEventListener('mousedown', startDrawing)
        item.addEventListener('mouseover', continueDrawing)
        item.addEventListener('mouseup', stopDrawing)
    }
    installGridEventListeners()
    pixelSizeSlider.addEventListener('input' ,()=> {
        pixelSizeValue.innerText=pixelSizeSlider.value
    })
}

function toggleQuestionDisplay() {
    body.classList.toggle('hide')
    questionContainer.classList.toggle('hide')

}

function createGridSize() {
    let gridSizeUserInput = gridSizeDefiner.value
    let gridDimensionsMet = gridSizeUserInput > 0 && gridSizeUserInput <=55
    if (gridDimensionsMet && isDrawnOn) {
        toggleQuestionDisplay()
    } else {
        if (gridDimensionsMet) {
        currentGridDimensions = gridSizeDefiner.value
        if (grid.innerHTML != '') {grid.innerText=''} //clears current grid
        let gridUnit = document.createElement('li')
        let i=0
        grid.style.gridTemplateColumns = `repeat(${gridSizeUserInput},auto)`
        while (i < Math.pow(gridSizeUserInput, 2)) {
            grid.appendChild(gridUnit.cloneNode())
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
