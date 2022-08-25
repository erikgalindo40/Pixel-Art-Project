const body = document.getElementById('body')
const grid = document.getElementById('grid')
const gridSizeDefiner = document.getElementById('gridSizeDefiner')
const submitButton = document.getElementById('submitButton')
const initButton = document.getElementById('initButton')
const yesAnswerButton = document.getElementById('yesAnswerButton')
const noAnswerButton = document.getElementById('noAnswerButton')
const questionContainer = document.getElementById('questionContainer')
const clearGridButton = document.getElementById('clearGridButton')
const penSizeSlider = document.getElementById('penSizeSlider')
let penSizeValue = document.getElementById('penSizeValue')
let currentColor = '#18AFA5'
let isDrawing = false
let isDrawnOn = false
let isGrid = false
let currentGridDimensions = 0
let listItems = []

// Work In Progress
penSizeValue.innerText = penSizeSlider.value
penSizeSlider.addEventListener('input' ,()=> {
    penSizeValue.innerText=penSizeSlider.value
})

function testDrawBig(cell) {
    let arr = Array.from(listItems)
    let test = arr.indexOf(cell)
    arr[test-1].style.background = currentColor
    arr[test-currentGridDimensions].style.background = currentColor
    arr[test-currentGridDimensions-1].style.background = currentColor
}

function startDrawing() { //stored in installEventListeners
    if(this.dataset.nocolor == 'nocolor') { 
        isDrawing=true 
    } else if (penSizeValue.innerText==2) {
        this.style.background = currentColor
        testDrawBig(this)
        isDrawing=true
    } else {
        this.style.background = currentColor
        isDrawing = true
    }
}

function continueDrawing() { //stored in installEventListeners
    if (isDrawing) {
       this.style.background = currentColor
       if (penSizeValue.innerText==2) {
        testDrawBig(this)
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
    penSizeSlider.addEventListener('input' ,()=> {
        penSizeValue.innerText=penSizeSlider.value
    })
}

function toggleQuestionDisplay() {
    body.classList.toggle('hide')
    questionContainer.classList.toggle('hide')

}

function createGridSize() {
    if (isDrawnOn) {
        toggleQuestionDisplay()
    } else {
    let gridSizeUserInput = gridSizeDefiner.value
    currentGridDimensions = gridSizeDefiner.value
    if (gridSizeUserInput > 0 && gridSizeUserInput <= 70) {
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
