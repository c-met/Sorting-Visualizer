import { useState, useEffect, useCallback, useRef } from 'react';
import { SortStep, getSortingSteps, generateRandomArray } from '@/lib/sorting-algorithms';

export interface SortingStats {
  comparisons: number;
  arrayAccesses: number;
  timeElapsed: number;
  progress: number;
}

export function useSorting() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(30);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [stats, setStats] = useState<SortingStats>({
    comparisons: 0,
    arrayAccesses: 0,
    timeElapsed: 0,
    progress: 0
  });
  const [stepHistory, setStepHistory] = useState<string[]>([]);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const generateNewArray = useCallback(() => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    setCurrentStep(0);
    setSteps([]);
    setStats({
      comparisons: 0,
      arrayAccesses: 0,
      timeElapsed: 0,
      progress: 0
    });
    setStepHistory([]);
    setIsPlaying(false);
    setIsPaused(false);
  }, [arraySize]);

  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  const prepareSteps = useCallback(() => {
    const sortingSteps = getSortingSteps(algorithm, array);
    setSteps(sortingSteps);
    setCurrentStep(0);
  }, [algorithm, array]);

  const startSorting = useCallback(() => {
    if (steps.length === 0) {
      prepareSteps();
    }
    
    if (!isPlaying && !isPaused) {
      startTimeRef.current = Date.now();
    }
    
    setIsPlaying(true);
    setIsPaused(false);
  }, [steps.length, prepareSteps, isPlaying, isPaused]);

  const pauseSorting = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(true);
  }, []);

  const stopSorting = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    setStats(prev => ({ ...prev, timeElapsed: 0, progress: 0 }));
    setStepHistory([]);
    generateNewArray();
  }, [generateNewArray]);

  const stepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      const step = steps[nextStep];
      setStepHistory(prev => [...prev.slice(-4), step.action]);
      
      setStats(prev => ({
        ...prev,
        comparisons: prev.comparisons + (step.comparing.length > 0 ? 1 : 0),
        arrayAccesses: prev.arrayAccesses + step.comparing.length + step.swapping.length,
        progress: Math.round((nextStep / (steps.length - 1)) * 100)
      }));
    }
  }, [currentStep, steps]);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const delay = Math.max(50, 1000 - (animationSpeed * 100));
      intervalRef.current = setTimeout(() => {
        stepForward();
      }, delay);
    } else if (isPlaying && currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length, animationSpeed, stepForward]);

  useEffect(() => {
    if (isPlaying) {
      const updateTimer = setInterval(() => {
        setStats(prev => ({
          ...prev,
          timeElapsed: (Date.now() - startTimeRef.current) / 1000
        }));
      }, 100);

      return () => clearInterval(updateTimer);
    }
  }, [isPlaying]);

  const getCurrentState = useCallback(() => {
    if (steps.length === 0 || currentStep >= steps.length) {
      return {
        array,
        comparing: [],
        swapping: [],
        sorted: [],
        action: 'Ready to sort'
      };
    }
    return steps[currentStep];
  }, [steps, currentStep, array]);

  return {
    array,
    arraySize,
    setArraySize,
    algorithm,
    setAlgorithm,
    animationSpeed,
    setAnimationSpeed,
    isPlaying,
    isPaused,
    stats,
    stepHistory,
    getCurrentState,
    generateNewArray,
    startSorting,
    pauseSorting,
    stopSorting,
    stepForward,
    canStepForward: currentStep < steps.length - 1
  };
}
