import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@/components/bar-chart';
import { ControlPanel } from '@/components/control-panel';
import { ThemeToggle } from '@/components/theme-toggle';
import { ExportDialog } from '@/components/export-dialog';
import { useSorting } from '@/hooks/use-sorting';
import { algorithms } from '@/lib/sorting-algorithms';
import { BarChart3, HelpCircle } from 'lucide-react';

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
    stats,
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

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* Header */}
      <header className="bg-card dark:bg-card shadow-sm border-b border-border dark:border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-lg sm:text-xl font-medium text-foreground dark:text-foreground">Sorting Algorithm Visualizer</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="hidden sm:inline text-sm text-muted-foreground dark:text-muted-foreground">Educational Tool</span>
              <ExportDialog 
                array={currentState.array}
                algorithm={algorithm}
                currentStep={stats.progress}
                totalSteps={100}
                isRunning={isPlaying}
              />
              <ThemeToggle />
              <button className="p-2 rounded-lg hover:bg-muted dark:hover:bg-muted transition-colors">
                <HelpCircle className="h-4 w-4 text-muted-foreground dark:text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Control Panel */}
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
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Status Header */}
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

            {/* Main Visualization */}
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
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card dark:bg-card border-t border-border dark:border-border mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground text-center sm:text-left">
              Educational sorting algorithm visualizer for learning computational concepts
            </div>
            <div className="flex items-center justify-center sm:justify-end space-x-4">
              <button className="text-muted-foreground dark:text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
