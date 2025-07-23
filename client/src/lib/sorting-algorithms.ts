/**
 * JAVA-STYLE SORTING ALGORITHMS IMPLEMENTATION
 * 
 * This file contains sorting algorithms implemented using Java programming patterns and conventions:
 * - Explicit type declarations (like Java's int[] arr)
 * - Manual swapping with temporary variables (Java style)
 * - Detailed comments explaining Java equivalents
 * - Recursive helper methods (Java style)
 * - Traditional loop structures with explicit variable declarations
 * - Method naming conventions similar to Java
 * 
 * While written in TypeScript for web compatibility, the logic follows Java conventions.
 */

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

// Java-style Bubble Sort implementation
export function bubbleSort(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr: number[] = [...array]; // Java: int[] arr = array.clone();
  const n: number = arr.length;
  const sorted: number[] = [];

  // Java-style nested loops with explicit variable declarations
  for (let i: number = 0; i < n - 1; i++) {
    for (let j: number = 0; j < n - i - 1; j++) {
      // Add comparison step
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        action: `Comparing elements at positions ${j} and ${j + 1}`
      });

      // Java-style comparison and swap
      if (arr[j] > arr[j + 1]) {
        // Manual swap (Java style: temp variable)
        const temp: number = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        
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

// Java-style Selection Sort implementation
export function selectionSort(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr: number[] = [...array]; // Java: int[] arr = array.clone();
  const n: number = arr.length;
  const sorted: number[] = [];

  // Java-style outer loop
  for (let i: number = 0; i < n - 1; i++) {
    let minIdx: number = i; // Find minimum element index
    
    // Java-style inner loop to find minimum
    for (let j: number = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        swapping: [],
        sorted: [...sorted],
        action: `Comparing elements at positions ${minIdx} and ${j}, finding minimum`
      });

      // Java-style comparison
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // Java-style swap if needed
    if (minIdx !== i) {
      const temp: number = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      
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

// Java-style Insertion Sort implementation
export function insertionSort(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr: number[] = [...array]; // Java: int[] arr = array.clone();
  const n: number = arr.length;
  const sorted: number[] = [0];

  // Java-style main loop starting from second element
  for (let i: number = 1; i < n; i++) {
    const key: number = arr[i]; // Current element to be inserted
    let j: number = i - 1;       // Start from previous element

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [...sorted],
      action: `Inserting element ${key} into sorted portion`
    });

    // Java-style while loop to shift elements
    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        action: `Comparing ${arr[j]} with ${key}`
      });

      // Java-style element shift
      arr[j + 1] = arr[j];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [j, j + 1],
        sorted: [...sorted],
        action: `Moving ${arr[j + 1]} one position right`
      });
      j--; // Move to previous element
    }

    // Java-style insertion
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

// Java-style Quick Sort implementation with recursive helper methods
export function quickSort(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr: number[] = [...array]; // Java: int[] arr = array.clone();
  const sorted: Set<number> = new Set();

  // Java-style partition method
  function partition(low: number, high: number): number {
    const pivot: number = arr[high]; // Choose last element as pivot
    let i: number = low - 1;         // Index of smaller element

    steps.push({
      array: [...arr],
      comparing: [high],
      swapping: [],
      sorted: Array.from(sorted),
      action: `Choosing pivot ${pivot} at position ${high}`
    });

    // Java-style partitioning loop
    for (let j: number = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        swapping: [],
        sorted: Array.from(sorted),
        action: `Comparing ${arr[j]} with pivot ${pivot}`
      });

      // Java-style comparison and swap
      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          // Manual swap (Java style)
          const temp: number = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          
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

    // Place pivot in correct position (Java style)
    const temp: number = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
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

  // Java-style recursive helper method
  function quickSortRecursive(low: number, high: number): void {
    if (low < high) {
      const partitionIndex: number = partition(low, high);
      quickSortRecursive(low, partitionIndex - 1);  // Sort left subarray
      quickSortRecursive(partitionIndex + 1, high); // Sort right subarray
    } else if (low === high) {
      sorted.add(low);
    }
  }

  // Java-style method call
  quickSortRecursive(0, arr.length - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    action: "Sorting complete!"
  });

  return steps;
}

// Java-style Merge Sort implementation with divide and conquer
export function mergeSort(array: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr: number[] = [...array]; // Java: int[] arr = array.clone();
  const sorted: Set<number> = new Set();

  // Java-style merge method to combine two sorted subarrays
  function merge(left: number, mid: number, right: number): void {
    // Create temporary arrays (Java style)
    const leftArr: number[] = arr.slice(left, mid + 1);
    const rightArr: number[] = arr.slice(mid + 1, right + 1);
    
    let i: number = 0;     // Initial index of left subarray
    let j: number = 0;     // Initial index of right subarray  
    let k: number = left;  // Initial index of merged subarray

    steps.push({
      array: [...arr],
      comparing: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      swapping: [],
      sorted: Array.from(sorted),
      action: `Merging subarrays from ${left} to ${mid} and ${mid + 1} to ${right}`
    });

    // Java-style merge loop
    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        swapping: [],
        sorted: Array.from(sorted),
        action: `Comparing ${leftArr[i]} and ${rightArr[j]}`
      });

      // Java-style comparison and assignment
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

    // Copy remaining elements of left array (Java style)
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }

    // Copy remaining elements of right array (Java style)
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }

    // Mark elements as sorted
    for (let idx: number = left; idx <= right; idx++) {
      sorted.add(idx);
    }
  }

  // Java-style recursive helper method
  function mergeSortRecursive(left: number, right: number): void {
    if (left < right) {
      // Find the middle point (Java style)
      const mid: number = Math.floor((left + right) / 2);
      
      // Sort first and second halves recursively
      mergeSortRecursive(left, mid);
      mergeSortRecursive(mid + 1, right);
      
      // Merge the sorted halves
      merge(left, mid, right);
    }
  }

  // Java-style method call
  mergeSortRecursive(0, arr.length - 1);

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
