let cellMatrix;
let rowCount;
let columnCount;

function generateRandomIndexNumber() {
    return Math.floor(Math.random() * 4);
}

function fillInTheCellMatrix() {
    rowCount = 4;
    columnCount = 4;
    cellMatrix =
        [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ];

    const randomFirstNumberRowIndex = generateRandomIndexNumber();
    const randomSecondNumberRowIndex = generateRandomIndexNumber();
    const randomFirstNumberColumnIndex = generateRandomIndexNumber();
    const randomSecondNumberColumnIndex = generateRandomIndexNumber();

    if (randomFirstNumberRowIndex === randomSecondNumberRowIndex && randomFirstNumberColumnIndex === randomSecondNumberColumnIndex) {
        fillInTheCellMatrix();
    }

    cellMatrix[randomFirstNumberRowIndex][randomFirstNumberColumnIndex] = 2;
    cellMatrix[randomSecondNumberRowIndex][randomSecondNumberColumnIndex] = 2;

    console.log(document.getElementById(randomFirstNumberRowIndex + "-" + randomFirstNumberColumnIndex));

    changeCellTextAndBackgroundColor(document.getElementById(randomFirstNumberRowIndex + "-" + randomFirstNumberColumnIndex), "#776E65", "#EEE4DA");
    changeCellTextAndBackgroundColor(document.getElementById(randomSecondNumberRowIndex + "-" + randomSecondNumberColumnIndex), "#776E65", "#EEE4DA");
}


function didPressAnyDirectionKey() {
    document.addEventListener('keydown', (event) => {
        var name = event.key;
        var code = event.code;
        // Alert the key name and key code on keydown
        console.log(`Key pressed ${name}`);

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
    }, false);
}

function changeCellTextAndBackgroundColor(element, textColor, backgroundColor) {
    element.style.color = textColor;
    element.style.background = backgroundColor;
}

function arrowUpPressed() {

}

function arrowDownPressed() {

}

function arrowRightPressed() {

}

function arrowLeftPressed() {

}

function deleteNullItemsBetweenNumbersInArray(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] != null) {
            continue;
        }
        else {
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] != null) {
                    dizi[i] = dizi[j];
                    dizi[j] = null;
                }
            }
        }
    }
    return array;
}

function sumNumbersInArray(array) {
    deleteNullsBetweenNumbers(array);
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] === array[i + 1]) {
            array[i] += array[i + 1];
            array[i + 1] = null;
            deleteNullsBetweenNumbers(array);
        }
    }
    return array;
}

function matrixToOneDimensionNumbersOnSceneArray(matrix) {
    const tempNumsArray = [];
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            tempNumsArray.push(cellMatrix[rowIndex][columnIndex]);
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

}

function gameInit() {
    fillInTheCellMatrix();
    drawNumbersOnScene();
}

gameInit();
didPressAnyDirectionKey();
