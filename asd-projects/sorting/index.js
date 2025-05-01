/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
async function bubbleSort(array){          //compares one value at a time to every other value to determine it's place in fromt or behind that value
for(var i = 0; i <= array.length -1; i++){
    for(var j = array.length -1; j >= i + 1; j--){
        if(array[j].value < array[j - 1].value){
            swap(array, j, (j - 1))
            updateCounter(bubbleCounter)
            await sleep()
        }
    }
}
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){      //determines what to do with the two given values

    if ((right - left) > 0){
    var index =  await partition(array, left, right)
        if(left < (index - 1)){
           await quickSort(array, left, index - 1)
        } 
        if(index < right){
           await quickSort(array, index, right)
        }
    }
    return
}

// TODOs 4 & 5: Implement partition
async function partition(array, left, right){             //creates the pivit point needed to compare, and changes the places of points depending on value
    var pivot = array[Math.floor((right + left) / 2)].value  
    while (left < right){
        while(array[left].value < pivot) {left ++}

        while(array[right].value > pivot) {right --}

        if(left < right){
            swap(array, left, right)
            updateCounter(quickCounter)
            await sleep()
        }
    }
    return left + 1
}

// TODO 1: Implement swap
function swap(array, i, j){
var temp = array[i]         //temperary variable that saves i
 array[i] = array[j]        // changes the value of i to j
array[j] = temp              // changes j to the origonal value of i
drawSwap(array, i, j)         //displays it
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}