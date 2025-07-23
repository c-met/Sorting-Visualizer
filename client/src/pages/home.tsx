import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@/components/bar-chart';
import { ControlPanel } from '@/components/control-panel';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-medium text-gray-900">Sorting Algorithm Visualizer</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Educational Tool</span>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <HelpCircle className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
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
          <div className="lg:col-span-3">
            {/* Status Header */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(207, 90%, 54%)' }}></div>
                      <span className="text-sm text-gray-600">Unsorted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(14, 88%, 55%)' }}></div>
                      <span className="text-sm text-gray-600">Comparing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(45, 100%, 51%)' }}></div>
                      <span className="text-sm text-gray-600">Swapping</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(122, 39%, 49%)' }}></div>
                      <span className="text-sm text-gray-600">Sorted</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {currentState.action}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {currentAlgorithm ? currentAlgorithm.displayName : 'Algorithm'} Visualization
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  {currentState.action}
                </p>
              </CardHeader>
              <CardContent>
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
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Educational sorting algorithm visualizer for learning computational concepts
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
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
