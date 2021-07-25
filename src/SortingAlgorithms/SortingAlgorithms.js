function swap(auxillaryArray, firstIdx, secondIdx) {
    let temp = auxillaryArray[firstIdx];
    auxillaryArray[firstIdx] = auxillaryArray[secondIdx];
    auxillaryArray[secondIdx] = temp;
}


export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx)/2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations)
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
){
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx){
        animations.push([i,j]);
        animations.push([i,j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]){
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } 
        else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx){
        animations.push([i,i]);
        animations.push([i,i]);
        animations.push([k,auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx){
        animations.push([j,j]);
        animations.push([j,j]);
        animations.push([k,auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }

}

// ###########################################################################################################################################

export function getInsertionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    insertionSort(array, array.length, animations);
    return animations

}

function insertionSort(arr, n, animations) 
{ 
    let i, key, j; 
    for (i = 1; i < n; i++)
    { 
        key = arr[i]; 
        j = i - 1; 
        animations.push(["comparison1",j,i]);
        animations.push(["comparison2",j,i]);
        while (j >= 0 && arr[j] > key)
        { 
            animations.push(["overwrite",j+1, arr[j]]);
            arr[j + 1] = arr[j]; 
            j = j - 1; 
            if(j>=0) {
                animations.push(["comparison1",j,i]);
                animations.push(["comparison2",j,i]);
            }
        } 
        animations.push(["overwrite",j+1,key])
        arr[j + 1] = key; 
    } 
}

// ###########################################################################################################################################


export function getQuickSortAnimations(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    if (array.length <= 1) return array;
    quickSort(array, 0, auxiliaryArray.length - 1,  animations);
    return animations

}

function quickSort(auxiliaryArray, startIdx, endIdx, animations) { 
    let pivotIdx;
    if (startIdx < endIdx) {
        pivotIdx = partitionArray(auxiliaryArray, startIdx, endIdx, animations);
        quickSort(auxiliaryArray, startIdx, pivotIdx - 1, animations);
        quickSort(auxiliaryArray, pivotIdx + 1, endIdx, animations);
    }
}

function partitionArray(auxiliaryArray, startIdx, endIdx, animations){
    let pivotIdx = randomIntFromInterval(startIdx,endIdx);
    let s = startIdx;
    let p = pivotIdx;
    let e = endIdx;

    animations.push(["comparison1", p, e]);
    animations.push(["swap", p, auxiliaryArray[e]]);
    animations.push(["swap", e, auxiliaryArray[p]]);
    animations.push(["comparison2", p, e]);
    swap(auxiliaryArray, p, e)
    
    let lessTailIdx = s;
    
    for (let i= s; i<e; ++i){
        animations.push(["comparison1", i, e]);
        animations.push(["comparison2", i, e]);
        if (auxiliaryArray[i] <= auxiliaryArray[e]){
            animations.push(["comparison1", i, lessTailIdx]);
            animations.push(["swap", i, auxiliaryArray[lessTailIdx]]);
            animations.push(["swap", lessTailIdx, auxiliaryArray[i]]);
            animations.push(["comparison2", i, lessTailIdx]);
            swap(auxiliaryArray, i, lessTailIdx);
            lessTailIdx++;
        }
    }
    animations.push(["comparison1", lessTailIdx, e]);
    animations.push(["swap", lessTailIdx, auxiliaryArray[e]]);
    animations.push(["swap", e, auxiliaryArray[lessTailIdx]]);
    animations.push(["comparison2", lessTailIdx, e]);
    swap(auxiliaryArray, lessTailIdx, e);
    return lessTailIdx

}




function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// #############################################################################################################################################


export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSort(array, animations);
    return animations

}

function bubbleSort(arr,animations){
    const N = arr.length;
    let iters = N - 1;
    while(iters > 0) {
        let swapped = false;
        for(let i = 0; i < iters; ++i) {
            animations.push(["comparison1", i, i + 1]);
            animations.push(["comparison2", i, i + 1]);
            if(arr[i] > arr[i + 1]) {
                swapped = true;
                animations.push(["swap", i, arr[i+1]]);
                animations.push(["swap", i + 1, arr[i]]);
                swap(arr, i, i + 1);
            }
        }
        if(swapped === false) break;
        iters--;
    }
  }

// #############################################################################################################################################

//heap sort
export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSort(array, animations);
    return animations

}

function heap_root(array, i, animations) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;
    
    if (left < array.length && array[left] > array[max]) {
        if (animations){
            animations.push(["comparison1", left, max]);
            animations.push(["comparison2", left, max]);
        }
        max = left;
    }

    if (right < array.length && array[right] > array[max]) {
        if (animations){
            animations.push(["comparison1", right, max]);
            animations.push(["comparison2", right, max]);
        }
        max = right;
    }

    if (max != i) {
        if(animations){
            animations.push(["comparison1", i, max]);
            animations.push(["swap", i, array[max]]);
            animations.push(["swap", max, array[i]]);
            animations.push(["comparison2", i, max]);
        }
        swap(array, i, max);
        heap_root(array, max);
    }
    console.log("animazioni heap_root")
    console.log(animations)
}

function heapSort(array, animations) {
    console.log("animazioni heapSort");
    console.log(animations);
    array.length = array.length;

    for (var i = Math.floor(array.length / 2); i >= 0; i -= 1)      {
        heap_root(array, i, animations);
      }

    for (i = array.length - 1; i > 0; i--) {
        animations.push(["comparison1", i, 0]);
        animations.push(["swap", i, array[0]]);
        animations.push(["swap", 0, array[i]]);
        animations.push(["comparison2", i, 0]);
        swap(array, 0, i);
        array.length--;
      
      
        heap_root(array, 0, animations);
    }
}

