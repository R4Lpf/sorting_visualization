import { arrayExpression, throwStatement } from '@babel/types';
import React from 'react'
import './SortingVisualizer.css'
import * as SortingAlgorithms from '../SortingAlgorithms/SortingAlgorithms.js'


// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 420;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for (let i = 0; i<NUMBER_OF_ARRAY_BARS; i++){
            array.push(randomIntFromInterval(5,730));
        }
        this.setState({array});
    }

    mergeSort(){
        const animations = SortingAlgorithms.getMergeSortAnimations(this.state.array);
        console.log(animations)
        for (let i = 0; i<animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 != 2;
            if (isColorChange){
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort(){
        const animations = SortingAlgorithms.getQuickSortAnimations(this.state.array);
        console.log(animations)
        for (let i = 0; i<animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = (animations[i][0] === "comparison1") || (animations[i][0] === "comparison2");
            if (isColorChange == true){
                const [temp, barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = (animations[i][0] === "comparison1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barOneIdx, newHeight] = animations[i];
                if (barOneIdx === -1) {
                    continue
                }
                const barOneStyle = arrayBars[barOneIdx].style;
                setTimeout(() => {
                    barOneStyle.height = `${newHeight}px`
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    insertSort(){
        const animations = SortingAlgorithms.getInsertionSortAnimations(this.state.array);
        console.log(animations)
        for (let i = 0; i<animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = (animations[i][0] === "comparison1") || (animations[i][0] === "comparison2");
            if (isColorChange == true){
                const [temp, barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = (animations[i][0] === "comparison1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                setTimeout(() => {
                    barOneStyle.height = `${newHeight}px`
                }, i * ANIMATION_SPEED_MS);
            }
        }
        // for (let i = 0; i<animations.length; i++){
        //     const [barOneIdx, barTwoIdx] = animations[i];
        //     setTimeout(() => {
        //         const arrayBars = document.getElementsByClassName('array-bar');
        //         console.log(arrayBars[barOneIdx])
        //         console.log(arrayBars[barTwoIdx])
        //         arrayBars[barTwoIdx].style.backgroundColor = SECONDARY_COLOR;
        //         arrayBars[barOneIdx].style.backgroundColor = SECONDARY_COLOR;
        //         setTimeout(() => {
        //             const arrayBars = document.getElementsByClassName('array-bar');
        //             arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
        //             arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
        //         }, (i + 1) * 10);
        //     }, i * 10);
        // }
            
    }

    bubbleSort(){
        const animations = SortingAlgorithms.getBubbleSortAnimations(this.state.array);
        console.log(animations)
        for (let i = 0; i<animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = (animations[i][0] === "comparison1") || (animations[i][0] === "comparison2");
            if (isColorChange == true){
                const [comparison, barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = (animations[i][0] === "comparison1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [swap, barOneIdx, newHeight] = animations[i];
                if (barOneIdx === -1) {
                    continue;
                }
                const barOneStyle = arrayBars[barOneIdx].style;
                setTimeout(() => {
                    barOneStyle.height = `${newHeight}px`
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    heapSort(){
        const animations = SortingAlgorithms.getHeapSortAnimations(this.state.array);
        console.log(animations)
        for (let i = 0; i<animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = (animations[i][0] === "comparison1") || (animations[i][0] === "comparison2");
            if (isColorChange == true){
                const [comparison, barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = (animations[i][0] === "comparison1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [swap, barOneIdx, newHeight] = animations[i];
                if (barOneIdx === -1) {
                    continue;
                }
                const barOneStyle = arrayBars[barOneIdx].style;
                setTimeout(() => {
                    barOneStyle.height = `${newHeight}px`
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }
    
    
    render(){
        const {array} = this.state;

        return (
            <body>

                <header>
                    <div class = "title">Sorting Visualization</div>
                </header>
                
                <div className="array-container">
                {array.map((value,idx) => (
                    <div 
                        className = "array-bar" 
                        key = {idx}
                        style = {{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`
                        }}
                    >
                    </div>
                ))}
                    <div class = "buttons">
                        <button onClick = {() => this.resetArray()}>Generate New Array</button>
                        <button onClick = {() => this.mergeSort()}>Merge Sort</button>
                        <button onClick = {() => this.quickSort()}>Quick Sort</button>
                        <button onClick = {() => this.insertSort()}>Insert Sort</button>
                        <button onClick = {() => this.bubbleSort()}>Bubble Sort</button>
                        <button onClick = {() => this.heapSort()}>Heap Sort</button>
                    </div>
                </div>
            </body>
        );
    }
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1) + min)
}