const body = document.getElementById('body')
const grid = document.getElementById('grid')
//grid function variables
const gridSizeDefiner = document.getElementById('gridSizeDefiner')
const submitButton = document.getElementById('submitButton')
const clearGridButton = document.getElementById('clearGridButton')
//question variables
const yesAnswerButton = document.getElementById('yesAnswerButton')
const noAnswerButton = document.getElementById('noAnswerButton')
const questionContainer = document.getElementById('questionContainer')
const question = document.getElementById('question')
//slider variables
const pixelSizeSlider = document.getElementById('pixelSizeSlider')
const pixelSizeDisplay = document.getElementById('pixelSizeValue')
//color selector variables
const mainColor = document.getElementById('mainColor')
const palette = Array.from(document.querySelectorAll('#paletteColors'))
//instruction variables
const instructionTitle = document.getElementById('instructionTitle')
const instructionList = document.getElementById('instructionList')
const createInstructionButton = document.getElementById('createButtonInstruction')
const colorInstructionButton = document.getElementById('colorInstruction')
const sliderInstructionButton = document.getElementById('sliderInstruction')
const createInstructionDisplay = document.getElementById('createInstructionDisplay')
const colorInstructionDisplay = document.getElementById('colorInstructionDisplay')
const sliderInstructionDisplay = document.getElementById('sliderInstructionDisplay')
const sliderInfo = document.getElementById('sliderInfo')
const colorSelectors = document.getElementById('colorSelectors')
let currentColor = '#18AFA5'
let isDrawing = false
let isDrawnOn = false
let isGrid = false
// let currentGridDimensions = 0
// let gridSizeUserInput = 0
// let gridCells = []

//on dev

function saveArt(identifier) {
    let artID = identifier.dataset.artid
    let artPieceColors = []
    let gridCells = document.querySelectorAll('[data-cell]')
    gridCells.forEach(cell=>artPieceColors.push(cell.style.background))
    const artPieceObject = {
        gridSize: gridSizeDefiner.value,
        colors: artPieceColors,
    }
    localStorage.setItem(`artPiece${artID}`, JSON.stringify(artPieceObject))
}

function loadArt(identifier) {
    //DANGEROUS
    isDrawnOn=false
    //DANGEROUS
    let artID = identifier.dataset.artid
    let artToLoad = JSON.parse(localStorage.getItem(`artPiece${artID}`))
    gridSizeDefiner.value = artToLoad.gridSize
    createGridSize(artToLoad.gridSize)
    let gridCells = document.querySelectorAll('[data-cell]')
    let i = 0
    for(let cell of gridCells) {
        cell.style.background = artToLoad.colors[i]
        i++
    }
}

const saveFiles = document.querySelectorAll('.save-file')
const saveFilesHeader = document.getElementById('saveFilesHeader')
const saveFilesContainer = document.getElementById('saveFilesContainer')

//save file buttons
const saveButtons = document.querySelectorAll('#saveButton')
const loadArtButtons = document.querySelectorAll('#loadArtButton')
//rename file variables
const fileToRenameInputs = document.querySelectorAll('#fileRename')
const renameFileButtons = document.querySelectorAll('#renameFileButton')

function renameSaveFile(identifier, input) {
    let fileToRename = document.getElementById(`saveFileName${identifier}`)
    fileToRename.innerText = input.value
    toggleSaveFileRenameInput(input.dataset.renameid)
}

function toggleSaveFileRenameInput(identifier) {
    //rename identifier not zero-indexed, so subtract 1
    let selectedFile = parseInt(identifier-1)
    fileToRenameInputs[selectedFile].classList.toggle('show-save-file-rename')
    fileToRenameInputs[selectedFile].focus()
}

fileToRenameInputs.forEach(input=>
    input.addEventListener('keypress',
    (e)=>{
        if(e.key=='Enter') {
            renameSaveFile(input.dataset.artid, input)   
        }
    }))

renameFileButtons.forEach(
    renameFileButton=>renameFileButton.addEventListener('click', 
    ()=>toggleSaveFileRenameInput(renameFileButton.dataset.renameid)))


    
for(let saveButton of saveButtons) {
    saveButton.addEventListener('click', ()=>saveArt(saveButton))
}
for(let loadButton of loadArtButtons) {
    loadButton.addEventListener('click', ()=>loadArt(loadButton))
}


saveFilesHeader.addEventListener('click', ()=> {
    for (let file of saveFiles) {
        file.classList.toggle('hide-save-file')
    }
})

//IN DEV

function drawPixelValueOne(cell) {
    // This function will change the background color 
    // of the selected grid cell
    cell.style.background = currentColor
}

function drawPixelValueTwo(cell, gridSizeUserInput , gridCells) {
    // This function changes the background color
    // of the selected cell ALONG with the cells directly above,
    // to the left, and top left(diagonal) of selected cell
    // This function also checks if the left edge cells are
    // selected and colors only the selected cell AND the cell
    // directly above so as not to color the right edge cells accidentally
    let currentGridDimensions = gridSizeUserInput //NEW USERINPUT STARTS HERE
    if(cell.dataset.topleftcorner=='true') {
        drawPixelValueOne(cell)
    } else {
        let currentCell = gridCells.indexOf(cell)//NEW GRID CELLS STARTS HERE
        if (cell.dataset.leftedge == 'true') {
            drawPixelValueOne(cell)
            gridCells[currentCell-currentGridDimensions].style.background = currentColor
        } else if (cell.dataset.topedge=='true') {
            drawPixelValueOne(cell)
            gridCells[currentCell-1].style.background = currentColor
        } else {
            cell.style.background = currentColor
            gridCells[currentCell-1].style.background = currentColor
            gridCells[currentCell-currentGridDimensions].style.background = currentColor
            gridCells[currentCell-currentGridDimensions-1].style.background = currentColor
        }
    }
}

function drawPixelValueThree(cell, gridSizeUserInput, gridCells) {
    // This function changes the background color for the selected grid cell,
    // the grid cells above, and the grid cells to the left of the selected grid cell
    // forming a small 3x3 colored box, with the selected cell, being
    // the bottom right corner cell
    // This function checks if the clicked/hovered grid cell
    // has any data attribute then calls
    // the drawing function corresponding to that attribute
    let currentGridDimensions = gridSizeUserInput //NEW GRID DIMENSIONS STARTS HERE
    if(cell.dataset.topleftside=='true') {
        drawPixelValueTwo(cell, gridSizeUserInput, gridCells)
    } else {
        let currentCell = gridCells.indexOf(cell)//NEW GRID INFO STARTS HERE
    if (cell.dataset.leftedge=='true') {
        drawPixelValueTwo(cell, gridSizeUserInput, gridCells)
        gridCells[currentCell-(currentGridDimensions*2)].style.background = currentColor
    } else if (cell.dataset.leftside=='true') {
        drawPixelValueTwo(cell, gridSizeUserInput, gridCells)
        gridCells[currentCell-(currentGridDimensions*2)].style.background = currentColor
        gridCells[currentCell-(currentGridDimensions*2)-1].style.background = currentColor
    } else if (cell.dataset.topedge=='true') {
        drawPixelValueTwo(cell, gridSizeUserInput, gridCells)
        gridCells[currentCell-2].style.background = currentColor
    } else if (cell.dataset.topside=='true') {
        drawPixelValueTwo(cell, gridSizeUserInput, gridCells)
        gridCells[currentCell-2].style.background = currentColor
        gridCells[currentCell-currentGridDimensions-2].style.background = currentColor
    } else {
        cell.style.background = currentColor
        gridCells[currentCell-1].style.background = currentColor
        gridCells[currentCell-currentGridDimensions].style.background = currentColor
        gridCells[currentCell-currentGridDimensions-1].style.background = currentColor
        
        gridCells[currentCell-2].style.background = currentColor
        gridCells[currentCell-currentGridDimensions-2].style.background = currentColor
        
        gridCells[currentCell-(currentGridDimensions*2)].style.background = currentColor
        gridCells[currentCell-(currentGridDimensions*2)-1].style.background = currentColor
        gridCells[currentCell-(currentGridDimensions*2)-2].style.background = currentColor
    }
}
}

function startDrawing(cell, gridSizeUserInput, gridCells) {
    // This function sets the isDrawing variable to true
    // and calls the respective drawing function according
    // to the slider value
    // This function also checks to see if the grid itself was selected
    // If so, only the isDrawing variable is set to true,
    // without calling a drawing function,
    // so as not to color the grid itself
    if(cell.dataset.nocolor == 'nocolor') { 
        isDrawing=true 
    } else {
        if(pixelSizeSlider.value==1) {drawPixelValueOne(cell); isDrawing=true}
        if (pixelSizeSlider.value==2) {drawPixelValueTwo(cell,gridSizeUserInput,gridCells); isDrawing=true}
        if (pixelSizeSlider.value==3) {drawPixelValueThree(cell,gridSizeUserInput,gridCells); isDrawing=true}
    }
}

function continueDrawing(cell, gridSizeUserInput,gridCells) { 
    // This function allows the drawing functions
    // to run if the isDrawing variable is set to true
    // Essentially, letting the user hold the
    // mouse button down to draw, instead of having to
    // click every cell individually
    if (isDrawing) {
        if(pixelSizeSlider.value==1) {drawPixelValueOne(cell)}
        if (pixelSizeSlider.value==2) {drawPixelValueTwo(cell,gridSizeUserInput,gridCells)}
        if (pixelSizeSlider.value==3) {drawPixelValueThree(cell,gridSizeUserInput,gridCells)}
    }
}

function stopDrawing() { 
    // This function sets the isDrawing variable to false,
    // effectively not letting the user change the 
    // background color for any grid cell
    isDrawing = false
}

function installCellAttributes(gridSizeUserInput, gridCells) {
    // This function adds data-attributes to the left & top edge grid cells,
    // adds data-attributes to the grid cells one row from the left edge & top edge, AND
    // adds a data-attribute to the grid cells at the top-left corner & diagonally
    // bottom right from the top-left corner
    // This allows the drawing functions to check if the user clicked or hovered over
    // these specified cells to prevent 'color leakage' onto right edge grid cells
    // ADDED: checks if grid size is bigger than one cell before running -> removes error message
    if (gridCells.length>1) {
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
    }}
}

function installGridEventListeners(gridSizeUserInput,gridCells) { 
    // This function adds event listeners for clicks/hovers on the grid itself,
    // so the user won't have to accurately click on a grid cell
    // to call the drawing functions
    grid.addEventListener('click', ()=>{isDrawnOn=true})
    grid.addEventListener('mousedown', ()=>{startDrawing(grid,gridSizeUserInput,gridCells)})
    grid.addEventListener('mouseleave', stopDrawing)
    grid.addEventListener('mouseup', stopDrawing)
}

function installAttributesAndListeners(gridSizeUserInput, gridCells) { 
    // This function adds event listeners for each cell in the grid
    // to call drawing functions upon event
    // This function also stores the installGridEventListeners function AND
    // the installCellAttributes function
    for (let cell of gridCells) {
        cell.addEventListener('mousedown', ()=>{startDrawing(cell,gridSizeUserInput,gridCells)})
        cell.addEventListener('mouseover', ()=>{continueDrawing(cell,gridSizeUserInput,gridCells)})
        cell.addEventListener('mouseup', stopDrawing)
    }
    installGridEventListeners(gridSizeUserInput,gridCells)
    installCellAttributes(gridSizeUserInput, gridCells)
}

function toggleQuestionDisplay() { //REFACTOR LET THIS TAKE IN TEXT/WHAT TO SAY
    // This function toggles the 'Are You Sure?' question page
    // and automatically focuses on the 'No' answer
    body.classList.toggle('hide')
    questionContainer.classList.toggle('hide')
    noAnswerButton.focus()
}

function createGridSize(gridSizeUserInput) { //REFACTORED TO LET IT TAKE IN ARG AND PASS ARG TO NESTED FUNCTIONS
    // This function brings up the question display if grid
    // is drawn on, clears grid of current color, and creates a grid if 
    // a valid number is inputted
    let validGridDimensions = gridSizeUserInput > 0 && gridSizeUserInput <=55
    if (validGridDimensions && isDrawnOn) {
        question.innerText = 'Current Grid is about to be replaced' //IMPURE
        toggleQuestionDisplay()
    } else if (validGridDimensions) {
        grid.innerText='' //clears grid
        let i=0
        let gridCell = document.createElement('li')
        grid.style.gridTemplateColumns = `repeat(${gridSizeUserInput},auto)`
        while (i < Math.pow(gridSizeUserInput, 2)) {
            gridCell.style.background = 'rgb(255,255,255)'
            gridCell.dataset.cell = 'true' //added to specify cell li's from other li's
            grid.appendChild(gridCell.cloneNode())
            i++
        }
        let gridCells = Array.from(document.querySelectorAll('[data-cell]'))
        installAttributesAndListeners(gridSizeUserInput, gridCells)
        isDrawnOn=false
    }
    isGrid=true
}

function toggleInstructionDisplay(instructionDisplay, ...args) {
    // This function toggles the display of a specific instruction menu
    // passed as an agrument,
    // along with any number of supplementary displays,
    // corresponding with that specific instruction
    // Depends on instructionDisplay variable name format not changing
    let instructionName = instructionDisplay.id.split('I')[0]
    instructionDisplay.classList.toggle(`${instructionName}-hide`)
    for (let extraDisplay of args) {
        extraDisplay.classList.toggle(`show-instruction`)
    }
}

function changePaletteColor(paletteBox) {
    // This function changes the color being currently used
    // to the selected color 
    // and displays that newly selected color
    // at the top color box
    mainColor.value = paletteBox.value
    currentColor = paletteBox.value
}

pixelSizeSlider.addEventListener('input' ,()=> {
    // Changes value of display next to slider to show what
    // value the slider is at 
    pixelSizeDisplay.innerText=pixelSizeSlider.value
})
clearGridButton.addEventListener('click', ()=>{
    // Brings up question display asking if its okay to Erase Grid
    // upon valid variable values
    if (isGrid && isDrawnOn) {
        question.innerText = 'Current grid is about to be erased'
        toggleQuestionDisplay()
    }
})

// Event Listeners to not let user escape question display and change Grid to empty upon Yes answer
yesAnswerButton.addEventListener('click',()=>{//REFACTORED ADD ARGUMENT
        isDrawnOn=false
        createGridSize(gridSizeDefiner.value) //CHECK LOAD FUNCTION RUNS WITH CORRECT VALUE
        toggleQuestionDisplay()
})
yesAnswerButton.addEventListener('keydown',(e)=>{
    if(e.shiftKey && e.key=='Tab') {
        e.preventDefault()
        noAnswerButton.focus()
    }
})
noAnswerButton.addEventListener('click', toggleQuestionDisplay)
noAnswerButton.addEventListener('keydown', (e)=>{
    if(e.key=='Tab') {
        e.preventDefault()
        yesAnswerButton.focus()
    }
})

// Event Listeners for 'Click' and 'Enter' key to submit grid size on non-empty & valid input
submitButton.addEventListener('click', ()=> {//REFACTORED ADD ARGUMENT
    createGridSize(gridSizeDefiner.value)
})
gridSizeDefiner.addEventListener('keyup', (e)=>{//REFACTORED ADD ARGUMENT
    if (e.key == 'Enter') createGridSize(gridSizeDefiner.value);
})

// Adds event Listeners to create single click and double click functionality for color selectors
palette.forEach(paletteColor=>paletteColor.addEventListener('input', ()=>{
    changePaletteColor(paletteColor)
}))
palette.forEach(paletteColor=>paletteColor.addEventListener('dblclick', ()=>{
    changePaletteColor(paletteColor)
}))

// Event Listeners to access/leave instruction menu AND prevent leaving instruction menu through shift-tabbing out
instructionTitle.addEventListener('click', ()=>{
    instructionList.classList.toggle('hide-list')
    body.classList.toggle('hide-instruction')
})
instructionTitle.addEventListener('keypress', (e)=>{
    if (e.key == 'Enter') {
        instructionList.classList.toggle('hide-list')
        body.classList.toggle('hide-instruction')
    }
})
instructionTitle.addEventListener('keydown',(e)=>{
    if(e.shiftKey && e.key=='Tab') {
        e.preventDefault()
        sliderInstructionButton.focus()
    }
})

// Event Listeners to toggle Create Grid instructions on hover & focus
createInstructionButton.addEventListener('mouseover', ()=>{
    toggleInstructionDisplay(createInstructionDisplay, submitButton, gridSizeDefiner)
})
createInstructionButton.addEventListener('mouseleave', ()=>{
    toggleInstructionDisplay(createInstructionDisplay, submitButton, gridSizeDefiner)
    createInstructionButton.blur()
})
createInstructionButton.addEventListener('focus', ()=>{
    toggleInstructionDisplay(createInstructionDisplay, submitButton, gridSizeDefiner)
})
createInstructionButton.addEventListener('blur', ()=>{
    toggleInstructionDisplay(createInstructionDisplay, submitButton, gridSizeDefiner)
})

// Event Listeners to toggle Color Palette instructions on hover & focus
colorInstructionButton.addEventListener('mouseover', ()=>{
    toggleInstructionDisplay(colorInstructionDisplay, colorSelectors)
})
colorInstructionButton.addEventListener('mouseleave', ()=>{
    toggleInstructionDisplay(colorInstructionDisplay, colorSelectors)
    colorInstructionButton.blur()
})
colorInstructionButton.addEventListener('focus', ()=>{
    toggleInstructionDisplay(colorInstructionDisplay, colorSelectors)
})
colorInstructionButton.addEventListener('blur', ()=>{
    toggleInstructionDisplay(colorInstructionDisplay, colorSelectors)
})

// Event Listeners to toggle Slider instructions on hover & focus
// and prevent leaving instruction menu through tabbing out
sliderInstructionButton.addEventListener('mouseover', ()=>{
    toggleInstructionDisplay(sliderInstructionDisplay, sliderInfo)
})
sliderInstructionButton.addEventListener('mouseleave', ()=>{
    toggleInstructionDisplay(sliderInstructionDisplay, sliderInfo)
    sliderInstructionButton.blur()
})
sliderInstructionButton.addEventListener('focus', ()=>{
    toggleInstructionDisplay(sliderInstructionDisplay, sliderInfo)
})
sliderInstructionButton.addEventListener('blur', ()=>{
    toggleInstructionDisplay(sliderInstructionDisplay, sliderInfo)
})
sliderInstructionButton.addEventListener('keydown',(e)=>{
    if(e.key=='Tab') {
        e.preventDefault()
        instructionTitle.focus()
    }
})

// Event Listener for Window to prevent Page Refresh after any User Input
// window.onbeforeunload = function(e) {
//     e.returnValue = `huh`
// }