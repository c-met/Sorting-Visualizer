export interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  action: string;
}

export interface AlgorithmInfo {
  name: string;
  displayName: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export const algorithms: Record<string, AlgorithmInfo> = {
  bubble: {
    name: "bubble",
    displayName: "Bubble Sort",
    description: "Compares adjacent elements and swaps them if they're in wrong order.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)"
  },
  selection: {
    name: "selection",
    displayName: "Selection Sort",
    description: "Finds the minimum element and places it at the beginning.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)"
  },
  insertion: {
    name: "insertion",
    displayName: "Insertion Sort",
    description: "Builds the final sorted array one item at a time.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)"
  },
  quick: {
    name: "quick",
    displayName: "Quick Sort",
    description: "Divides array into partitions and sorts them recursively.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)"
  },
  merge: {
    name: "merge",
    displayName: "Merge Sort",
    description: "Divides array into halves and merges them in sorted order.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)"
  }
};

export function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 10);
}

export function bubbleSort(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...array];
  const n = arr.length;
  const sorted: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        action: `Comparing elements at positions ${j} and ${j + 1}`
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          action: `Swapping elements ${arr[j + 1]} and ${arr[j]} at positions ${j} and ${j + 1}`
        });
      }
    }
    sorted.unshift(n - 1 - i);
  }
  sorted.unshift(0);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    action: "Sorting complete!"
  });

  return steps;
}

export function selectionSort(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...array];
  const n = arr.length;
  const sorted: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        swapping: [],
        sorted: [...sorted],
        action: `Comparing elements at positions ${minIdx} and ${j}, finding minimum`
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted],
        action: `Swapping minimum element ${arr[i]} to position ${i}`
      });
    }

    sorted.push(i);
  }
  sorted.push(n - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    action: "Sorting complete!"
  });

  return steps;
}

export function insertionSort(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...array];
  const n = arr.length;
  const sorted: number[] = [0];

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [...sorted],
      action: `Inserting element ${key} into sorted portion`
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        action: `Comparing ${arr[j]} with ${key}`
      });

      arr[j + 1] = arr[j];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [j, j + 1],
        sorted: [...sorted],
        action: `Moving ${arr[j + 1]} one position right`
      });
      j--;
    }

    arr[j + 1] = key;
    sorted.push(i);
    
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      action: `Placed ${key} at position ${j + 1}`
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    action: "Sorting complete!"
  });

  return steps;
}

export function quickSort(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...array];
  const sorted: Set<number> = new Set();

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      comparing: [high],
      swapping: [],
      sorted: Array.from(sorted),
      action: `Choosing pivot ${pivot} at position ${high}`
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        swapping: [],
        sorted: Array.from(sorted),
        action: `Comparing ${arr[j]} with pivot ${pivot}`
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            array: [...arr],
            comparing: [],
            swapping: [i, j],
            sorted: Array.from(sorted),
            action: `Swapping ${arr[i]} and ${arr[j]}`
          });
        }
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [i + 1, high],
      sorted: Array.from(sorted),
      action: `Placing pivot ${pivot} at correct position ${i + 1}`
    });

    sorted.add(i + 1);
    return i + 1;
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      sorted.add(low);
    }
  }

  quickSortHelper(0, arr.length - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    action: "Sorting complete!"
  });

  return steps;
}

export function mergeSort(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...array];
  const sorted: Set<number> = new Set();

  function merge(left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    steps.push({
      array: [...arr],
      comparing: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      swapping: [],
      sorted: Array.from(sorted),
      action: `Merging subarrays from ${left} to ${mid} and ${mid + 1} to ${right}`
    });

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        swapping: [],
        sorted: Array.from(sorted),
        action: `Comparing ${leftArr[i]} and ${rightArr[j]}`
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k - 1],
        sorted: Array.from(sorted),
        action: `Placed ${arr[k - 1]} at position ${k - 1}`
      });
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }

    for (let idx = left; idx <= right; idx++) {
      sorted.add(idx);
    }
  }

  function mergeSortHelper(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  }

  mergeSortHelper(0, arr.length - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    action: "Sorting complete!"
  });

  return steps;
}

export function getSortingSteps(algorithm: string, array: number[]): SortStep[] {
  switch (algorithm) {
    case 'bubble':
      return bubbleSort(array);
    case 'selection':
      return selectionSort(array);
    case 'insertion':
      return insertionSort(array);
    case 'quick':
      return quickSort(array);
    case 'merge':
      return mergeSort(array);
    default:
      return [];
  }
}
