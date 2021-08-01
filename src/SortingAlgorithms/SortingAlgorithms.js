import { waitForElementToBeRemoved } from "@testing-library/react";

function swap(auxillaryArray, firstIdx, secondIdx) {
    let temp = auxillaryArray[firstIdx];
    auxillaryArray[firstIdx] = auxillaryArray[secondIdx];
    auxillaryArray[secondIdx] = temp;
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function floor_log(a) {
    return (Math.floor(Math.log(a)/Math.log(2))) << 0;
}

// ###########################################################################################################################################
// merge sort

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
// insertion sort

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
// quick sort

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




// #############################################################################################################################################
// bubble sort

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
// heap sort

export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSort(array, array.length, animations);
    //heapSort(array, 0, array.length-1, animations)
    return animations

}


function heapSort(array, n, animations) {

    for (var i = Math.floor(n / 2); i >= 0; i--)      {
        heap_root(array, i, n, animations);
      }

    for (i = n - 1; i >= 0; i--) {
        animations.push(["comparison1", i, 0]);
        animations.push(["swap", 0, array[i]]);
        animations.push(["swap", i, array[0]]);
        animations.push(["comparison2", i, 0]);
        swap(array, 0, i);
        n--;      
        heap_root(array, 0, i, animations);
    }

    console.log(array)
}

function heap_root(array, i, len, animations) {
    var left = 2 * i + 1;
    var right = left + 1;
    var max = i; 
    
    if (left < len){
        animations.push(["comparison1", left, max]);
        animations.push(["comparison2", left, max]);
        if (array[left] > array[max]) {
            max = left;
        }
    }

    if (right < len) {
        animations.push(["comparison1", right, max]);
        animations.push(["comparison2", right, max]);
        if (array[right] > array[max]) {
            max = right;
        }
    }
    
    if (max != i) {
        animations.push(["comparison1", i, max]);
        animations.push(["swap", max, array[i]]);
        animations.push(["swap", i, array[max]]);
        animations.push(["comparison2", i, max]);
        
        swap(array, i, max);
        heap_root(array, max, len, animations);
    }
}

// function heapSort(array, startIdx, endIdx, animations){
//     var n = endIdx - startIdx, i;
//     for (i = Math.floor(n/2); i>=1; i--) {
//         downheap(array, i, n, startIdx, animations);
//     }
//     for (i = n; i>1; i--) {
        
//         animations.push(["comparison1", startIdx, startIdx+i-1]);
//         animations.push(["swap", startIdx, array[startIdx+i-1]]);
//         animations.push(["swap", startIdx+i-1, array[startIdx]]);
//         animations.push(["comparison2", startIdx, startIdx+i-1]); 
//         swap(array, startIdx, startIdx+i-1);
//         downheap(array, 1, i-1, startIdx, animations);
//     }
    
//     console.log(array)
// }

// function downheap(array, i, n, startIdx, animations){
//     var d = array[startIdx+i-1];
//     var child;
//     while (i <= Math.floor(n/2-1)) {
//         child = 2*i;
//         if (child >= n){
//             child = child-1
//         }
//         animations.push(["comparison1", child, n]);
//         animations.push(["comparison1", startIdx+child-1, startIdx + child]);
//         animations.push(["comparison2", child, n]);
//         animations.push(["comparison2", startIdx+child-1, startIdx + child]);
//         if (child < n && array[startIdx+child-1] < array[startIdx + child]){
//             child++;
//         }
        
//         animations.push(["comparison1", startIdx+child-1, startIdx+i-1]);
//         animations.push(["comparison2", startIdx+child-1, startIdx+i-1]);
//         if (d >= array[startIdx+child-1]) break;
//         animations.push(["overwrite", startIdx+i-1, array[startIdx+child-1]]);
//         array[startIdx+i-1] = array[startIdx+child-1];
//         i = child;
//     }
//     array[startIdx + i - 1] = d;
// }



// #############################################################################################################################################
// tim sort GEEKS FOR GEEKS VERSION.

export function getTimSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    timSort(array, array.length, animations);
    console.log(array);
    return animations

}



let MIN_MERGE = 32;

function minRunLength(n) {
    let r = 0;
    while (n >= MIN_MERGE)
    {
        r |= (n & 1);
        n >>= 1;
    }
    return n + r;
}

function timsertionSort(array, left, right, animations) {
    for(let i = left + 1; i <= right; i++) {
        let key = array[i];
        let j = i - 1;
        animations.push(["comparison1",j,i]);
        animations.push(["comparison2",j,i]);
        while (j >= left && array[j] > key) {
            animations.push(["overwrite",j+1, array[j]]);
            array[j + 1] = array[j];
            j--;
            if(j>=0) {
                animations.push(["comparison1",j,i]);
                animations.push(["comparison2",j,i]);
            }
        }
        animations.push(["overwrite",j+1,key])
        array[j + 1] = key;
    }
}

function merge(array, startIdx, middleIdx, endIdx, animations) {
    let halfLength1 = middleIdx - startIdx + 1;
    let halfLength2 = endIdx - middleIdx;
    let left = new Array(halfLength1);
    let right = new Array(halfLength2);
    for(let x = 0; x < halfLength1; x++) {
        //animations.push(["overwrite", x, array[startIdx + x]])
        left[x] = array[startIdx + x];
    }
    for(let x = 0; x < halfLength2; x++) {
        //animations.push(["overwrite", middleIdx + x, array[middleIdx + 1 + x]])
        right[x] = array[middleIdx + 1 + x];
    }

    let i = 0;
    let j = 0;
    let k = startIdx;
 
    while (i < halfLength1 && j < halfLength2) {
        animations.push(["comparison1",i,middleIdx + j]);
        animations.push(["comparison2",i,middleIdx + j]);
        if (left[i] <= right[j]) {
            animations.push(["overwrite", k, left[i]])
            array[k] = left[i];
            i++;
        }
        else {
            animations.push(["overwrite", k, right[j]])
            array[k] = right[j];
            j++;
        }
        k++;
    }

    while (i < halfLength1) {
        animations.push(["comparison1",i,i]);
        animations.push(["comparison2",i,i]);
        animations.push(["overwrite", k, left[i]])
        array[k] = left[i];
        k++;
        i++;
    }
    while (j < halfLength2) {
        animations.push(["comparison1",middleIdx + j, middleIdx + j]);
        animations.push(["comparison2",middleIdx + j, middleIdx + j]);
        animations.push(["overwrite", k, right[j]])
        array[k] = right[j];
        k++;
        j++;
    }
}
function  timSort(array, n, animations)
{
    let minRun = minRunLength(MIN_MERGE);
     
    for(let i = 0; i < n; i += minRun){
        timsertionSort(array, i, Math.min((i + MIN_MERGE - 1), (n - 1)), animations);
    }

    for (let size = minRun; size < n; size = 2 * size) {
        for (let left = 0; left < n; left += 2 * size) {
            let mid = left + size - 1;
            let right = Math.min((left + 2 * size - 1),(n - 1));
            if (mid < right) merge(array, left, mid, right, animations);
        }
    }
}

// #############################################################################################################################################
// intro sort

//var size_threshold = 16;

const iParent = i => Math.floor((i - 1) / 2);
const iLeftChild = i => 2 * i + 1;

export function getIntroSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const len = array.length;
    let maxdepth = Math.floor(Math.log(len)) * 2;
    introSort(array, 0, len - 1, maxdepth, (a, b) => (a - b), animations);
    //introSort(array, 0, array.length, 2 * floor_log(array.length), animations);
    console.log(array)
    return animations

}

function introSort(array, startIdx, endIdx, maxdepth, cmpf, animations) {
    if (endIdx - startIdx < 16) {
      introsertionSort(array, startIdx, endIdx, cmpf, animations);
      return;
    }

    if (maxdepth === 0) {
      heapSort2(array, startIdx, endIdx, cmpf, animations);
      return;
    }

    const p = partition(array, startIdx, endIdx, cmpf, animations);
    introSort(array, startIdx, p, maxdepth - 1, cmpf, animations);
    introSort(array, p + 1, endIdx, maxdepth - 1, cmpf, animations);
  }

function partition(array, startIdx, endIdx, cmpf, animations) {
    const pv = pivot(array, startIdx, endIdx, cmpf, animations);
    let i = startIdx - 1,
        j = endIdx + 1;
    while (i < j) {
        do i++; while (cmpf(array[i], pv) < 0);
        do j--; while (cmpf(array[j], pv) > 0);
        animations.push(["comparison1", i, j]);
        animations.push(["comparison2", i, j]);
        if (i >= j) break;
        animations.push(["comparison1", i, j]);
        animations.push(["swap", i, array[j]]);
        animations.push(["swap", j, array[i]]);
        animations.push(["comparison2", i, j]);
        swap(array, i, j);
    }
    return j;
  }



function pivot(array, startIdx, endIdx, cmpf, animations) {
    const mid = Math.floor((startIdx + endIdx) / 2);
    animations.push(["comparison1", mid, startIdx]);
    animations.push(["comparison2", mid, startIdx]);
    if (cmpf(array[mid], array[startIdx]) < 0) {
        animations.push(["comparison1", mid, startIdx]);
        animations.push(["swap", mid, array[startIdx]]);
        animations.push(["swap", startIdx, array[mid]]);
        animations.push(["comparison2", mid, startIdx]);
        swap(array, startIdx, mid);
    }
    animations.push(["comparison1", endIdx, startIdx]);
    animations.push(["comparison2", endIdx, startIdx]);
    if (cmpf(array[endIdx], array[startIdx]) < 0) {
        animations.push(["comparison1", endIdx, startIdx]);
        animations.push(["swap", endIdx, array[startIdx]]);
        animations.push(["swap", startIdx, array[endIdx]]);
        animations.push(["comparison2", endIdx, startIdx]);
        swap(array, startIdx, endIdx);
    }
    animations.push(["comparison1", endIdx, mid]);
    animations.push(["comparison2", endIdx, mid]);
    if (cmpf(array[mid], array[endIdx]) < 0) {
        animations.push(["comparison1", endIdx, mid]);
        animations.push(["swap", endIdx, array[mid]]);
        animations.push(["swap", mid, array[endIdx]]);
        animations.push(["comparison2", endIdx, mid]);
        swap(array, mid, endIdx);
    }
    return array[endIdx];
}

function introsertionSort(array, left, right, cmpf, animations) {
    let i, j, key;
    for (i = left + 1; i <= right; i++) {
        key = array[i];
        j = i - 1;
        animations.push(["comparison1",j,i]);
        animations.push(["comparison2",j,i]);
        while (j >= left && cmpf(array[j], key) > 0) {
            animations.push(["overwrite",j+1, array[j]]);
            array[j + 1] = array[j];
            j = j - 1;
            if(j>=0) {
                animations.push(["comparison1",j,i]);
                animations.push(["comparison2",j,i]);
            }
        }
        animations.push(["overwrite",j+1,key])
        array[j + 1] = key;
    }
  }



  function heapSort2(array, startIdx, endIdx, cmpf, animations) {
    heapify(array, startIdx, endIdx, cmpf, animations);
    let end = endIdx;
    while (end > startIdx) {
        animations.push(["comparison1", endIdx, startIdx]);
        animations.push(["swap", endIdx, array[startIdx]]);
        animations.push(["swap", startIdx, array[endIdx]]);
        animations.push(["comparison2", endIdx, startIdx]);
        swap(array, end, startIdx);
        //animations.push(["overwrite",end,end-1])
        end = end - 1;
        siftDown(array, startIdx, end, cmpf, animations);
    }
  }

  function heapify(array, startIdx, endIdx, cmpf, animations) {
    let start = iParent(endIdx);

    while (start >= startIdx) {
      siftDown(array, start, endIdx, cmpf, animations);
      //animations.push(["overwrite",start,start-1])
      start = start - 1;
    }
  }

  function siftDown(array, start, end, cmpf, animations) {
    let root = start, child, toSwap;

    while (iLeftChild(root) <= end) {
        child = iLeftChild(root);
        toSwap = root;
        animations.push(["comparison1", toSwap, child]);
        animations.push(["comparison2", toSwap, child]);
        if (cmpf(array[toSwap], array[child]) < 0) {
            //animations.push(["overwrite",toSwap,child])
            toSwap = child;
        }
        //animations.push(["comparison1", end, child + 1]);
        //animations.push(["swap", end, array[child + 1]]);
        //animations.push(["swap", child + 1, array[end]]);
        //animations.push(["comparison2", end, child + 1]);
        animations.push(["comparison1", toSwap, child]);
        animations.push(["comparison2", toSwap, child]);
        if ((child + 1) <= end && cmpf(array[toSwap], array[child+1]) < 0){
            animations.push(["overwrite",toSwap,child+1])
            toSwap = child + 1;
        }
        animations.push(["comparison1", toSwap, root]);
        animations.push(["comparison1", toSwap, root]);
        if (toSwap === root)
            return;
        animations.push(["comparison1", root, toSwap]);
        animations.push(["swap", root, array[toSwap]]);
        animations.push(["swap", toSwap, array[root]]);
        animations.push(["comparison2", root, toSwap]);
        swap(array, root, toSwap);
        animations.push(["overwrite", root, toSwap])
        root = toSwap;
    }
  }




