import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@/components/bar-chart';
import { ControlPanel } from '@/components/control-panel';
import { ThemeToggle } from '@/components/theme-toggle';
import { useSorting } from '@/hooks/use-sorting';
import { algorithms } from '@/lib/sorting-algorithms';
import { RollerCoaster, HelpCircle } from 'lucide-react';
import React, { Suspense, useState } from 'react';
import avatarImg from './avatar.webp';



export default function Home() {
  const {
    array,
    arraySize,
    setArraySize,
    algorithm,
    setAlgorithm,
    animationSpeed,
    setAnimationSpeed,
    isPlaying,
    isPaused,
    getCurrentState,
    generateNewArray,
    startSorting,
    pauseSorting,
    stopSorting,
    stepForward,
    canStepForward
  } = useSorting();

  const currentState = getCurrentState();
  const currentAlgorithm = algorithms[algorithm];
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <header className="bg-card dark:bg-card shadow-sm border-b border-border dark:border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-12 h-12 bg-transparent rounded-lg flex items-center justify-center">
                <RollerCoaster className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-lg sm:text-xl font-medium text-foreground dark:text-foreground">Sorting Visualizer</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <ControlPanel
              algorithm={algorithm}
              onAlgorithmChange={setAlgorithm}
              arraySize={arraySize}
              onArraySizeChange={setArraySize}
              animationSpeed={animationSpeed}
              onAnimationSpeedChange={setAnimationSpeed}
              isPlaying={isPlaying}
              isPaused={isPaused}
              canStepForward={canStepForward}
              onGenerateArray={generateNewArray}
              onStartSorting={startSorting}
              onPauseSorting={pauseSorting}
              onStopSorting={stopSorting}
              onStepForward={stepForward}
            />
            {/* Additional grid for mobile devices, under the array config grid */}
            <div className="grid lg:hidden grid-cols-1 gap-4 mt-6">
              <Card>
                <CardContent>
                  <div className="flex items-start">
                    <div className="flex-1 mt-2 text-sm text-muted-foreground">
                    If you have any questions, please contact me.
                    </div>
                    <div className="flex flex-row items-center gap-3 mt-2">
                        {/* LinkedIn Icon */}
                        <a href="https://www.linkedin.com/in/soumikg60" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 448 512" fill="currentColor" className="text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
                            <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340.7C24.12 107.3 0 83.2 0 53.6A53.6 53.6 0 0 1 53.6 0a53.6 53.6 0 0 1 53.6 53.6c0 29.6-24.12 53.7-53.36 53.7zM447.8 448h-92.4V302.4c0-34.7-12.4-58.4-43.3-58.4-23.6 0-37.6 15.9-43.7 31.3-2.3 5.6-2.8 13.4-2.8 21.2V448h-92.4s1.2-242.1 0-267.1h92.4v37.9c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.7 39.8 106.7 125.4V448z"/>
                          </svg>
                        </a>
                        {/* Gmail Icon */}
                        <a href="mailto:soumikgh60@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
                            <path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2 0v.01L12 13l8-8.99V4H4zm16 2.41l-7.29 7.3a1 1 0 0 1-1.42 0L4 6.41V20h16V6.41z"/>
                          </svg>
                        </a>
                      </div>
                    <div className="relative">
                      <img
                        src={avatarImg}
                        alt="Avatar"
                        className="w-20 h-20 ml-4 object-cover bg-white dark:bg-card border-none lg:w-40 lg:h-40 lg:-mt-16"
                        style={{ zIndex: 10 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-3 order-1 lg:order-2">
            <Card className="mb-4 sm:mb-6">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:space-x-4 sm:gap-0">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(207, 90%, 54%)' }}></div>
                      <span className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">Unsorted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(14, 88%, 55%)' }}></div>
                      <span className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">Comparing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(45, 100%, 51%)' }}></div>
                      <span className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">Swapping</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(122, 39%, 49%)' }}></div>
                      <span className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">Sorted</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-foreground dark:text-foreground text-center sm:text-right">
                    {currentState.action}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">
                  {currentAlgorithm ? currentAlgorithm.displayName : 'Algorithm'} Visualization
                </CardTitle>
                <p className="text-muted-foreground dark:text-muted-foreground text-xs sm:text-sm">
                  {currentState.action}
                </p>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <BarChart
                  array={currentState.array}
                  comparing={currentState.comparing}
                  swapping={currentState.swapping}
                  sorted={currentState.sorted}
                />
              </CardContent>
            </Card>
            {/* New single-column grid at the bottom of the right column, with a large gap, hidden on mobile */}
            <div className="hidden lg:grid grid-cols-1 gap-4 mt-24">
              <Card>
          
                <CardContent>
                
                  <div className="flex items-start">
                    <div className="flex-1 ml-2 mt-2 text-sm text-muted-foreground hidden lg:block">
                      This is a project that helps people learn about sorting algorithms. If you have any questions, please contact me.
                      <div className="flex flex-row items-center gap-3 mt-2">
                        {/* LinkedIn Icon */}
                        <a href="https://www.linkedin.com/in/soumikg60" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 448 512" fill="currentColor" className="text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
                            <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340.7C24.12 107.3 0 83.2 0 53.6A53.6 53.6 0 0 1 53.6 0a53.6 53.6 0 0 1 53.6 53.6c0 29.6-24.12 53.7-53.36 53.7zM447.8 448h-92.4V302.4c0-34.7-12.4-58.4-43.3-58.4-23.6 0-37.6 15.9-43.7 31.3-2.3 5.6-2.8 13.4-2.8 21.2V448h-92.4s1.2-242.1 0-267.1h92.4v37.9c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.7 39.8 106.7 125.4V448z"/>
                          </svg>
                        </a>
                        {/* Gmail Icon */}
                        <a href="mailto:soumikgh60@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
                            <path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2 0v.01L12 13l8-8.99V4H4zm16 2.41l-7.29 7.3a1 1 0 0 1-1.42 0L4 6.41V20h16V6.41z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                   
                    <div className="relative">
                      <img
                        src={avatarImg}
                        alt="Avatar"
                        className="w-20 h-20 lg:w-40 lg:h-40 -mt-8 lg:-mt-16 ml-4 object-cover bg-white dark:bg-card border-none"
                        style={{ zIndex: 10 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-card dark:bg-card border-t border-border dark:border-border mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground text-center sm:text-left">
              Educational sorting algorithm visualizer for learning computational concepts
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
