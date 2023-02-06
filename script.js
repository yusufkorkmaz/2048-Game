let cellMatrix;
let anyMoveHappened;
let delayingForAnimation;

const rowCount = 4;
const columnCount = 4;
const delayMilliseconds = 250;
const emptyCellBackgroundColor = '#CDC0B4';
const backgroundColors = {
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
};

function generateRandomIndexNumber(upperLimit) {
    return Math.floor(Math.random() * upperLimit);
}

function chooseTwoOrFour() {
    const twoAndFourNumbers = [2, 4];
    const index = generateRandomIndexNumber(2);
    return twoAndFourNumbers[index];
}

function generateNewNumber(number) {
    let twoOrFour;

    if (!number) {
        twoOrFour = chooseTwoOrFour();
    }
    else {
        twoOrFour = number;
    }

    const rowIndex = generateRandomIndexNumber(4);
    const columnIndex = generateRandomIndexNumber(4);

    if (cellMatrix[rowIndex][columnIndex] == null) {
        cellMatrix[rowIndex][columnIndex] = twoOrFour;
    } else {
        generateNewNumber(twoOrFour)
    }
}

function fillInTheCellMatrix() {
    cellMatrix =
        [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ];

    const randomFirstNumberRowIndex = generateRandomIndexNumber(4);
    const randomSecondNumberRowIndex = generateRandomIndexNumber(4);
    const randomFirstNumberColumnIndex = generateRandomIndexNumber(4);
    const randomSecondNumberColumnIndex = generateRandomIndexNumber(4);

    if (randomFirstNumberRowIndex === randomSecondNumberRowIndex && randomFirstNumberColumnIndex === randomSecondNumberColumnIndex) {
        fillInTheCellMatrix();
    }

    cellMatrix[randomFirstNumberRowIndex][randomFirstNumberColumnIndex] = 2;
    cellMatrix[randomSecondNumberRowIndex][randomSecondNumberColumnIndex] = 2;
}

function getCellNumberColor(numberInCell) {
    if (numberInCell === 2 || numberInCell === 4) {
        return '#776e65';
    } else {
        return '#f9f6f2';
    }
}

function getCellBackgroundColor(numberInCell) {
    return backgroundColors[numberInCell];
}

function paintCells() {
    for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
            const numberInCell = cellMatrix[row][column];
            const cell = document.getElementById(row + "-" + column);

            if (cellMatrix[row][column] != null) {
                cell.style.color = getCellNumberColor(numberInCell);
                cell.style.background = getCellBackgroundColor(numberInCell);
            } else {
                cell.style.removeProperty('color');
                cell.style.background = emptyCellBackgroundColor;
            }
        }
    }
}

function getNumbersInColumn(columnIndex) {
    const tempArray = [];
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        tempArray.push(cellMatrix[rowIndex][columnIndex]);
    }
    return tempArray;
}

function setNumbersInColumn(columnIndex, numbersArray) {
    let rowIndex, index;
    for (rowIndex = 0, index = 0; rowIndex, index < rowCount; rowIndex++, index++) {
        cellMatrix[rowIndex][columnIndex] = numbersArray[index];
    }
}

function arrowUpPressed() {
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        const columnArray = getNumbersInColumn(columnIndex);
        const collectionColumnArray = sumNumbersInArray('up', columnArray);
        setNumbersInColumn(columnIndex, collectionColumnArray);
    }
}

function arrowDownPressed() {
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        const columnArray = getNumbersInColumn(columnIndex);
        const collectionColumnArray = sumNumbersInArray('down', columnArray);
        setNumbersInColumn(columnIndex, collectionColumnArray);
    }
}

function arrowRightPressed() {
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        sumNumbersInArray('right', cellMatrix[rowIndex]);
    }
}

function arrowLeftPressed() {
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        sumNumbersInArray('left', cellMatrix[rowIndex]);
    }
}

function scrollTheArrayToLeft(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] === null) {
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] != null) {
                    array[i] = array[j];
                    array[j] = null;
                    anyMoveHappened = true;
                    break;
                }
            }
        }
    }
    return array;
}

function scrollTheArrayToRight(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] === null) {
            for (let j = i - 1; j >= 0; j--) {
                if (array[j] != null) {
                    array[i] = array[j];
                    array[j] = null;
                    anyMoveHappened = true;
                    break;
                }
            }
        }
    }
    return array;
}

function sumNumbersInArray(direction, array) {
    if (direction === 'up' || direction === 'left') {
        for (let i = 0; i < array.length - 1; i++) {
            scrollTheArrayToLeft(array);
            for (let j = i; j < array.length - 1; j++) {
                if (array[j] === array[j + 1] && array[j] != null && array[j + 1] != null) {
                    array[j] += array[j + 1];
                    array[j + 1] = null;
                    anyMoveHappened = true;
                    i++;
                }
            }
        }
    }
    else if (direction === 'down' || direction === 'right') {
        for (let i = array.length - 1; i >= 0; i--) {
            scrollTheArrayToRight(array);
            for (let j = i; j > 0; j--) {
                if (array[j] === array[j - 1] && array[j] != null && array[j - 1] != null) {
                    array[j] += array[j - 1];
                    array[j - 1] = null;
                    anyMoveHappened = true;
                    i--;
                }
            }
        }
    }
    return array;
}

function matrixToOneDimensionNumbersOnSceneArray(matrix) {
    const tempNumsArray = [];
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            tempNumsArray.push(matrix[rowIndex][columnIndex]);
        }
    }
    return tempNumsArray;
}

function drawNumbersOnScene() {
    const cellElementsArray = document.getElementsByClassName("cell");

    const oneDimensionNumbersOnSceneArray = matrixToOneDimensionNumbersOnSceneArray(cellMatrix);

    for (let index = 0; index < oneDimensionNumbersOnSceneArray.length; index++) {
        cellElementsArray[index].innerHTML = oneDimensionNumbersOnSceneArray[index];
    }

    paintCells();
}

function gameInit() {
    delayingForAnimation = false;
    fillInTheCellMatrix();
    drawNumbersOnScene();
    paintCells();
}

function isCellMatrixFullControl() {
    let counter = 0;
    for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
            if (cellMatrix[row][column] === null) {
                return false;
            } else {
                counter++;
            }
        }
    }

    if (counter === rowCount * columnCount) {
        return true;
    } else {
        return false;
    }
}

function hasNextMove() {
    let counter = 0;

    //row control
    for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount - 1; column++) {
            if (cellMatrix[row][column] === cellMatrix[row][column + 1]) {
                return true;
            } else {
                counter++;
            }
        }
    }
    //column control
    for (let row = 0; row < rowCount - 1; row++) {
        for (let column = 0; column < columnCount; column++) {
            if (cellMatrix[row][column] === cellMatrix[row + 1][column]) {
                return true;
            } else {
                counter++;
            }
        }
    }

    if (counter === ((rowCount - 1) * columnCount) + (rowCount * (columnCount - 1))) {
        return false;
    } else {
        return true;
    }
}

function drawTheMove() {
    drawNumbersOnScene();
    delayingForAnimation = true;
    setTimeout(() => {
        generateNewNumber();
        drawNumbersOnScene();
        anyMoveHappened = false;
        delayingForAnimation = false;
    }, delayMilliseconds);
}

function gameOverControl() {
    if (isCellMatrixFullControl() && !hasNextMove()) {
        setTimeout(function () {
            alert('Game Over');
        }, delayMilliseconds);
    }
}

gameInit();

document.addEventListener('keydown', (event) => {
    var code = event.code;
    if (!delayingForAnimation) {
        switch (code) {
            case 'ArrowUp':
                arrowUpPressed();
                break;
            case 'ArrowDown':
                arrowDownPressed();
                break;
            case 'ArrowRight':
                arrowRightPressed();
                break;
            case 'ArrowLeft':
                arrowLeftPressed();
                break;
        }

        if (anyMoveHappened) {
            drawTheMove();
            gameOverControl();
        }
    }
}, false); 