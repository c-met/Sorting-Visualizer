import { useState } from 'react';
import { Download, FileCode, FileImage, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface ExportDialogProps {
  array: number[];
  algorithm: string;
  currentStep: number;
  totalSteps: number;
  isRunning: boolean;
}

export function ExportDialog({ 
  array, 
  algorithm, 
  currentStep, 
  totalSteps, 
  isRunning 
}: ExportDialogProps) {
  const [exportType, setExportType] = useState<string>('array-data');
  const [isOpen, setIsOpen] = useState(false);

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportArrayData = () => {
    const data = {
      array: array,
      algorithm: algorithm,
      arraySize: array.length,
      currentStep: currentStep,
      totalSteps: totalSteps,
      timestamp: new Date().toISOString()
    };
    
    const content = JSON.stringify(data, null, 2);
    downloadFile(content, `sorting-array-${algorithm}-${Date.now()}.json`, 'application/json');
  };

  const exportArrayAsCSV = () => {
    const csvContent = array.join(',');
    downloadFile(csvContent, `sorting-array-${algorithm}-${Date.now()}.csv`, 'text/csv');
  };

  const exportJavaCode = () => {
    const javaCode = `// Java code for ${algorithm} sort algorithm
public class ${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)}Sort {
    
    public static void ${algorithm}Sort(int[] arr) {
        int n = arr.length;
        
        ${algorithm === 'bubble' ? `
        // Bubble Sort Implementation
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }` : algorithm === 'selection' ? `
        // Selection Sort Implementation
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            // Swap minimum element with first element
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }` : algorithm === 'insertion' ? `
        // Insertion Sort Implementation
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }` : algorithm === 'quick' ? `
        // Quick Sort Implementation
        quickSortHelper(arr, 0, n - 1);
    }
    
    private static void quickSortHelper(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSortHelper(arr, low, pi - 1);
            quickSortHelper(arr, pi + 1, high);
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;` : `
        // Merge Sort Implementation
        mergeSortHelper(arr, 0, n - 1);
    }
    
    private static void mergeSortHelper(int[] arr, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSortHelper(arr, left, mid);
            mergeSortHelper(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
    private static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];
        
        for (int i = 0; i < n1; i++)
            leftArr[i] = arr[left + i];
        for (int j = 0; j < n2; j++)
            rightArr[j] = arr[mid + 1 + j];
            
        int i = 0, j = 0, k = left;
        
        while (i < n1 && j < n2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }
        
        while (i < n1) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        
        while (j < n2) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }`}
    }
    
    // Main method for testing
    public static void main(String[] args) {
        int[] testArray = {${array.join(', ')}};
        
        System.out.println("Original array:");
        printArray(testArray);
        
        ${algorithm}Sort(testArray);
        
        System.out.println("\\nSorted array:");
        printArray(testArray);
    }
    
    private static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}`;

    downloadFile(javaCode, `${algorithm}Sort.java`, 'text/plain');
  };

  const exportReport = () => {
    const report = `Sorting Algorithm Visualization Report
========================================

Algorithm: ${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort
Generated: ${new Date().toLocaleString()}

Array Information:
- Size: ${array.length} elements
- Original Array: [${array.join(', ')}]
- Current Step: ${currentStep} of ${totalSteps}
- Status: ${isRunning ? 'Running' : 'Stopped'}

Algorithm Complexity:
${algorithm === 'bubble' || algorithm === 'selection' || algorithm === 'insertion' 
  ? '- Time Complexity: O(n²)\n- Space Complexity: O(1)' 
  : algorithm === 'quick' 
  ? '- Time Complexity: O(n log n) average, O(n²) worst case\n- Space Complexity: O(log n)' 
  : '- Time Complexity: O(n log n)\n- Space Complexity: O(n)'}

Algorithm Description:
${algorithm === 'bubble' 
  ? 'Bubble sort compares adjacent elements and swaps them if they are in the wrong order. This process is repeated until the array is sorted.'
  : algorithm === 'selection' 
  ? 'Selection sort finds the minimum element and places it at the beginning, then repeats for the remaining unsorted portion.'
  : algorithm === 'insertion' 
  ? 'Insertion sort builds the final sorted array one item at a time by inserting each element into its correct position.'
  : algorithm === 'quick' 
  ? 'Quick sort uses a divide-and-conquer approach by selecting a pivot element and partitioning the array around it.'
  : 'Merge sort divides the array into halves, sorts them recursively, and then merges the sorted halves.'}

Export Details:
- Exported from: Sorting Algorithm Visualizer
- File Format: Text Report
- Data Integrity: Complete
`;

    downloadFile(report, `sorting-report-${algorithm}-${Date.now()}.txt`, 'text/plain');
  };

  const handleExport = () => {
    switch (exportType) {
      case 'array-data':
        exportArrayData();
        break;
      case 'array-csv':
        exportArrayAsCSV();
        break;
      case 'java-code':
        exportJavaCode();
        break;
      case 'report':
        exportReport();
        break;
      default:
        exportArrayData();
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Data</DialogTitle>
          <DialogDescription>
            Choose what you'd like to export from the sorting visualizer
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Export Type</label>
            <Select value={exportType} onValueChange={setExportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="array-data">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Array Data (JSON)</span>
                  </div>
                </SelectItem>
                <SelectItem value="array-csv">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Array Values (CSV)</span>
                  </div>
                </SelectItem>
                <SelectItem value="java-code">
                  <div className="flex items-center space-x-2">
                    <FileCode className="h-4 w-4" />
                    <span>Java Source Code</span>
                  </div>
                </SelectItem>
                <SelectItem value="report">
                  <div className="flex items-center space-x-2">
                    <FileImage className="h-4 w-4" />
                    <span>Analysis Report</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Algorithm:</span>
                  <span className="font-medium">{algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Array Size:</span>
                  <span className="font-medium">{array.length} elements</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Progress:</span>
                  <span className="font-medium">{currentStep} / {totalSteps} steps</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}