export const shuffle = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
};

export const resetArrayColour = (containerRef, arr) => {
  const arrayBars = containerRef.current.children;
  for (let i = 0; i < arr.length; i++) {
    const arrayBarStyle = arrayBars[i].style;
    arrayBarStyle.backgroundColor = "";
  }
};

export function swap(arr, index1, index2) {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}
