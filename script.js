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
//saved file variables
const saveFiles = document.querySelectorAll('.save-file')
const saveFilesHeader = document.getElementById('saveFilesHeader')
const saveFilesContainer = document.getElementById('saveFilesContainer')
//save file buttons
const saveButtons = document.querySelectorAll('#saveButton')
const loadArtButtons = document.querySelectorAll('#loadArtButton')
const yesAnswerSaveFileButton = document.getElementById('yesAnswerSaveFileButton')
const noAnswerSaveFileButton = document.getElementById('noAnswerSaveFileButton')
const yesAnswerLoadFileButton = document.getElementById('yesAnswerLoadFileButton')
const noAnswerLoadFileButton = document.getElementById('noAnswerLoadFileButton')
//rename file variables
const fileToRenameInputs = document.querySelectorAll('#fileRename')
const renameFileButtons = document.querySelectorAll('#renameFileButton')
const saveFileQuestionName = document.getElementById('saveFileQuestionName')
const loadFileQuestionName = document.getElementById('loadFileQuestionName')
//saved files question variables
const savedFilesQuestionDisplay = document.getElementById("savedFilesQuestionDisplay")
const loadFileQuestionDisplay = document.getElementById("loadFileQuestionDisplay")
let currentColor = '#52E0BD'
let isDrawing = false
let isDrawnOn = false
let isGrid = false

//TO DO 

// CHANGE PALETTE COLORS ON BOOT TO BEACH COLORS

localStorage.getItem(`artPieceOne`) //sets file name 1 to saved file name if there is a saved file 1
? document.getElementById('saveFileNameOne').innerText = JSON.parse(localStorage.getItem(`artPieceOne`)).artworkName
: document.getElementById(`saveFileNameOne`). innerText = 'File 1'

localStorage.getItem(`artPieceTwo`) //sets file name 2 to saved file name if there is a saved file 2
? document.getElementById('saveFileNameTwo').innerText = JSON.parse(localStorage.getItem(`artPieceTwo`)).artworkName
: document.getElementById(`saveFileNameTwo`). innerText = 'File 2'

localStorage.getItem(`artPieceThree`) //sets file name 3 to saved file name if there is a saved file 3
? document.getElementById('saveFileNameThree').innerText = JSON.parse(localStorage.getItem(`artPieceThree`)).artworkName
: document.getElementById(`saveFileNameThree`). innerText = 'File 3'

//FUNCTIONS

//drawing functions
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

//grid cell functions
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

//question display and grid creation functions
function toggleQuestionDisplay() {
    // This function toggles the 'Are You Sure?' question page
    // and automatically focuses on the 'No' answer
    body.classList.toggle('hide')
    questionContainer.classList.toggle('hide')
    noAnswerButton.focus()
}

function createGridSize(gridSizeUserInput) {
    // This function brings up the question display if grid
    // is drawn on, clears grid of current color, and creates a grid if 
    // a valid number is inputted
    let validGridDimensions = gridSizeUserInput > 0 && gridSizeUserInput <=55
    if (validGridDimensions && isDrawnOn) {
        question.innerText = 'Current Grid is about to be replaced'
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

//instruction display functions
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

//color palette functions
function changePaletteColor(paletteBox) {
    // This function changes the color being currently used
    // to the selected color 
    // and displays that newly selected color
    // at the top color box
    mainColor.value = paletteBox.value
    currentColor = paletteBox.value
}

//saved files functions
function removeSaveConfirmation(selectedFile) {
    //This function takes in the selected file's element and
    // removes save success confirmation styling after 3 seconds
    // so styling doesn't stay after closing saved files display 
    setTimeout(()=>{
        selectedFile.classList.remove('save-success')
        let saveSuccessText = document.getElementById('saveSuccessText')
        saveSuccessText.classList.remove('show-success-confirmation')
    },3000)
}

function showSaveConfirmation(selectedFile) {
    //This function takes in a selected File Element
    // and adds the save success class to said element,
    // along with displaying 'Save Success' text, 
    // to let the user know their work is saved
    selectedFile.classList.add('save-success')
    let saveSuccessText = document.getElementById('saveSuccessText')
    saveSuccessText.classList.add('show-success-confirmation')
}

function saveArt(identifier) {
    //This function takes in an element with a data attribute that we use to identify which file to save the current art to.
    //This function then creates an object which stores the current grid's size, the selected file's name, and an array that stores the 
    // background color for each grid cell
    //That new object is then set as the value for the selected save file
    //ADDED: Now grabs the selected file element and passes said element to showSaveConfirmation
    // & removeSaveConfirmation functions
    let artID = identifier.dataset.artid
    let artPieceColors = []
    let gridCells = document.querySelectorAll('[data-cell]')
    gridCells.forEach(cell=>artPieceColors.push(cell.style.background))

    let selectedFile = document.getElementById(`saveFileName${artID}`)
    let selectedFileElement = document.getElementById(`saveFile${artID}`)

    showSaveConfirmation(selectedFileElement)
    removeSaveConfirmation(selectedFileElement)

    const artPieceObject = {
        gridSize: gridSizeDefiner.value,
        artworkName: selectedFile.innerText,
        colors: artPieceColors,
    }
    localStorage.setItem(`artPiece${artID}`, JSON.stringify(artPieceObject))
}

function loadArt(identifier) {
    //This function loads in the selected file by grabbing the object value
    //from local storage that matches the art's ID
    //The art ID is grabbed from the element passed in as an argument
    //The stringified object that is returned gets parsed,
    // the stored gridSize value is used to call createGridSize with said value,
    // then the cells from that grid are looped through and given the background color
    // corresponding to its index value
    //isDrawnOn gets set to false to prevent two question displays from popping up at same time 
    isDrawnOn=false

    let artID = identifier.dataset.artid
    let artToLoad = JSON.parse(localStorage.getItem(`artPiece${artID}`))
    gridSizeDefiner.value = artToLoad.gridSize || 0 //prevents undefined value from showing in grid size user input if no saved file
    createGridSize(gridSizeDefiner.value)
    let gridCells = document.querySelectorAll('[data-cell]')
    let i = 0
    for(let cell of gridCells) {
        cell.style.background = artToLoad.colors[i]
        i++
    }
}

function renameSaveFile(identifier, input) {
    //This Function takes in an element which has a data-attribute that has the selected file's ID
    // and it also takes in the new file name to add
    //The current file name is grabbed by element ID and is set to the input value(new file name)
    //The saveArtName function is then called to save the artwork's new name to local storage
    //The rename input display is then toggled off to show the new file's Name
    let fileToRename = document.getElementById(`saveFileName${identifier}`)
    fileToRename.innerText = input.value
    saveArtName(identifier)
    toggleSaveFileRenameInputDisplay(input.dataset.renameid)
}

function saveArtName(artID) {
    //This function takes in the artID as argument
    //The file matching the ID is grabbed,
    // the object returned from the selected file gets parsed,
    // the old object properties get spread into a new object with spread syntax,
    // the New File Name gets passed into the new object as the new value for the artworkName Key,
    // then that newly created object gets set as the selected File's new value
    let selectedFile = document.getElementById(`saveFileName${artID}`)
    let newSaveFileName = selectedFile.innerText
    
    let selectedFilePreviousInfo = JSON.parse(localStorage.getItem(`artPiece${artID}`))
    let newFileInfo = { ...selectedFilePreviousInfo, artworkName: newSaveFileName}

    localStorage.setItem(`artPiece${artID}`, JSON.stringify(newFileInfo))
}

function toggleSaveFileRenameInputDisplay(identifier) {
    //This function takes in an element with a data-attribute
    // that specifies which file-rename-input to display
    //The selected rename-input is then set to be focused

    let selectedFile = parseInt(identifier-1) //rename identifier not zero-indexed, so subtract 1
    fileToRenameInputs[selectedFile].classList.toggle('show-save-file-rename')
    fileToRenameInputs[selectedFile].focus()
}


// EVENT LISTENERS //

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
    //checks if grid size input is > 55 to display error styling
    if (gridSizeDefiner.value>55) {
        gridSizeDefiner.focus()
        gridSizeDefiner.classList.add('show-error')
        setTimeout(()=>{
            gridSizeDefiner.classList.remove('show-error')
        },2000)
    }
    createGridSize(gridSizeDefiner.value)
})
gridSizeDefiner.addEventListener('keyup', (e)=>{//REFACTORED ADD ARGUMENT
    if (e.key == 'Enter') createGridSize(gridSizeDefiner.value);
})
gridSizeDefiner.addEventListener('keyup', (e)=>{
    //checks if grid size input is > 55 to display error styling
    if (e.key == 'Enter' & gridSizeDefiner.value>55) {
        gridSizeDefiner.focus()
        gridSizeDefiner.classList.add('show-error')
        setTimeout(()=>{
            gridSizeDefiner.classList.remove('show-error')
        },2000)
    };
})

// Adds event Listeners to create single click and double click functionality for color selectors
palette.forEach(paletteColor=>paletteColor.addEventListener('input', ()=>{
    changePaletteColor(paletteColor)
}))
palette.forEach(paletteColor=>paletteColor.addEventListener('contextmenu', (e)=>{
    e.preventDefault()
    changePaletteColor(paletteColor)
    return false
}, false))

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

// rename file button and input event listeners
fileToRenameInputs.forEach(input=>
    input.addEventListener('keypress',
    (e)=>{
        if(e.key=='Enter') {
            renameSaveFile(input.dataset.artid, input)   
        }
    })
)

renameFileButtons.forEach(renameFileButton=>
    renameFileButton.addEventListener('click', 
    ()=>{
        document.querySelectorAll('#fileRename').forEach(renameInput=>renameInput.placeholder="Press 'Enter' To Submit")
        toggleSaveFileRenameInputDisplay(renameFileButton.dataset.renameid)
    })
)

// save buttons event listeners
saveButtons.forEach(saveButton => 
    saveButton.addEventListener('click', ()=>{
        let artID = saveButton.dataset.artid
        yesAnswerSaveFileButton.dataset.artid = artID

        saveFileQuestionName.innerText = 
        JSON.parse(localStorage.getItem(`artPiece${artID}`)) 
        ? JSON.parse(localStorage.getItem(`artPiece${artID}`)).artworkName
        : `File ${artID}` 

        saveFilesContainer.classList.toggle('dim-background')
        savedFilesQuestionDisplay.classList.toggle('show-saved-files-question-container')
    })
)

yesAnswerSaveFileButton.addEventListener('click', ()=> {
    saveArt(yesAnswerSaveFileButton)

    saveFilesContainer.classList.toggle('dim-background')
    savedFilesQuestionDisplay.classList.toggle('show-saved-files-question-container')
}
)

noAnswerSaveFileButton.addEventListener('click', ()=>{
    saveFilesContainer.classList.toggle('dim-background')
    savedFilesQuestionDisplay.classList.toggle('show-saved-files-question-container')
})

// load buttons event listeners
loadArtButtons.forEach(loadButton=>
    loadButton.addEventListener('click', ()=>{
        let artID = loadButton.dataset.artid
        yesAnswerLoadFileButton.dataset.artid = artID

        loadFileQuestionName.innerText = 
        JSON.parse(localStorage.getItem(`artPiece${artID}`)) //if there's a saved project
        ? JSON.parse(localStorage.getItem(`artPiece${artID}`)).artworkName //display its name
        : `File ${artID}` //or its file number if there is no saved work

        saveFilesContainer.classList.toggle('dim-background')
        loadFileQuestionDisplay.classList.toggle('show-load-file-question-container')
    })
)

yesAnswerLoadFileButton.addEventListener('click', ()=>{
    loadArt(yesAnswerLoadFileButton)

    saveFilesContainer.classList.toggle('dim-background')
    loadFileQuestionDisplay.classList.toggle('show-load-file-question-container')
})

noAnswerLoadFileButton.addEventListener('click', ()=>{
    saveFilesContainer.classList.toggle('dim-background')
    loadFileQuestionDisplay.classList.toggle('show-load-file-question-container')
})

// saved files container event listener
saveFilesHeader.addEventListener('click', ()=> {
    for (let file of saveFiles) {
        file.classList.toggle('hide-save-file')
    }
})
