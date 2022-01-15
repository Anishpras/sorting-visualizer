import { useEffect, useRef, useState } from "react";
import { getbubbleSortAnimations } from "../algorithms/bubbleSort";
import { getInsertionSortAnimations } from "../algorithms/insertionSort";
import { getMergeSortAnimations } from "../algorithms/mergeSort";
import { getQuickSortAnimations } from "../algorithms/quickSort";
import {
  ACCESSED_COLOUR,
  ARR_LEN,
  DELAY,
  MAX_NUM,
  MIN_NUM,
  SORTED_COLOUR,
} from "../constants";
import { resetArrayColour, shuffle } from "../utils";

const SortingVisulaizer = () => {
  const [arr, setArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const containerRef = useRef(null);

  const initialiseArray = () => {
    if (isSorting) return;
    if (isSorted) resetArrayColour(containerRef, arr);
    setIsSorted(false);
    const newArr = [];
    for (let i = 0; i < ARR_LEN; i++) {
      newArr.push((MAX_NUM - MIN_NUM) * (i / ARR_LEN) + MIN_NUM);
    }
    shuffle(newArr);
    setArr(newArr);
  };

  const bubbleSort = () => {
    const animations = getbubbleSortAnimations(arr);
    animateArrayUpdate(animations);
  };

  const insertionSort = () => {
    const animations = getInsertionSortAnimations(arr);
    animateArrayUpdate(animations);
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(arr);
    animateArrayUpdate(animations);
  };

  const quickSort = () => {
    const animations = getQuickSortAnimations(arr);
    animateArrayUpdate(animations);
  };

  useEffect(initialiseArray, []);

  function animateArrayUpdate(animations) {
    if (isSorting) return;
    setIsSorting(true);
    animations.forEach(([comparison, swapped], index) => {
      setTimeout(() => {
        if (!swapped) {
          if (comparison.length === 2) {
            const [i, j] = comparison;
            animateArrayAccess(i);
            animateArrayAccess(j);
          } else {
            const [i] = comparison;
            animateArrayAccess(i);
          }
        } else {
          setArr((prevArr) => {
            const [k, newValue] = comparison;
            const newArr = [...prevArr];
            newArr[k] = newValue;
            return newArr;
          });
        }
      }, index * DELAY);
    });
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * DELAY);
  }

  function animateArrayAccess(index) {
    const arrayBars = containerRef.current.children;
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = ACCESSED_COLOUR;
    }, DELAY);
    setTimeout(() => {
      arrayBarStyle.backgroundColor = "";
    }, DELAY * 2);
  }

  function animateSortedArray() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = SORTED_COLOUR),
        i * DELAY + DELAY
      );
    }
    setTimeout(() => {
      setIsSorted(true);
      setIsSorting(false);
    }, arrayBars.length * DELAY);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="justify-center">
        <h1 className="text-4xl py-3 bg-gray-700 text-center text-white">
          Sorting Visualizer
        </h1>
      </header>
      <div className="flex flex-1 mt-auto" ref={containerRef}>
        {arr.map((barHeight, index) => (
          <div
            className="bg-violet-600 mx-[0.15%]"
            style={{
              height: `${barHeight}vmin`,
              width: `${100 / ARR_LEN}vw`,
            }}
            key={index}></div>
        ))}
      </div>
      <footer className="flex justify-evenly py-6 space-x-2 px-1 bg-gray-700 ">
        <button
          className="text-white outline-dotted  hover:text-gray-700 hover:bg-white p-2"
          onClick={initialiseArray}>
          Create new array
        </button>

        <button className="text-white outline-dotted  hover:text-gray-700 hover:bg-white p-2" onClick={bubbleSort}>
          Bubble sort
        </button>

        <button className="text-white outline-dotted  hover:text-gray-700 hover:bg-white p-2" onClick={insertionSort}>
          Insertion sort
        </button>

        <button className="text-white outline-dotted  hover:text-gray-700 hover:bg-white p-2" onClick={mergeSort}>
          Merge sort
        </button>

        <button className="text-white outline-dotted  hover:text-gray-700 hover:bg-white p-2" onClick={quickSort}>
          Quick sort
        </button>
      </footer>
    </div>
  );
};

export default SortingVisulaizer;
