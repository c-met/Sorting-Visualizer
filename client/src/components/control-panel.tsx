import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Shuffle, Play, Pause, Square, SkipForward, Info } from 'lucide-react';
import { algorithms } from '@/lib/sorting-algorithms';

interface ControlPanelProps {
  algorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  animationSpeed: number;
  onAnimationSpeedChange: (speed: number) => void;
  isPlaying: boolean;
  isPaused: boolean;
  canStepForward: boolean;
  onGenerateArray: () => void;
  onStartSorting: () => void;
  onPauseSorting: () => void;
  onStopSorting: () => void;
  onStepForward: () => void;
}

export function ControlPanel({
  algorithm,
  onAlgorithmChange,
  arraySize,
  onArraySizeChange,
  animationSpeed,
  onAnimationSpeedChange,
  isPlaying,
  isPaused,
  canStepForward,
  onGenerateArray,
  onStartSorting,
  onPauseSorting,
  onStopSorting,
  onStepForward
}: ControlPanelProps) {
  const currentAlgorithm = algorithms[algorithm];

  return (
    <div className="space-y-6">
      {/* Algorithm Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Algorithm Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={algorithm} onValueChange={onAlgorithmChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(algorithms).map((algo) => (
                <SelectItem key={algo.name} value={algo.name}>
                  {algo.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {currentAlgorithm && (
            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="h-4 w-4 text-primary" />
                <span className="font-medium">{currentAlgorithm.displayName}</span>
              </div>
              <p className="text-gray-600 mb-2">{currentAlgorithm.description}</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Time: <span className="font-medium">{currentAlgorithm.timeComplexity}</span></span>
                <span className="text-gray-500">Space: <span className="font-medium">{currentAlgorithm.spaceComplexity}</span></span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Array Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Array Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Array Size</label>
            <div className="space-y-2">
              <Slider
                value={[arraySize]}
                onValueChange={(value) => onArraySizeChange(value[0])}
                max={100}
                min={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10</span>
                <span className="font-medium">{arraySize}</span>
                <span>100</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Animation Speed</label>
            <div className="space-y-2">
              <Slider
                value={[animationSpeed]}
                onValueChange={(value) => onAnimationSpeedChange(value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>
          </div>

          <Button onClick={onGenerateArray} className="w-full" variant="outline">
            <Shuffle className="w-4 h-4 mr-2" />
            Generate New Array
          </Button>
        </CardContent>
      </Card>

      {/* Sorting Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sorting Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={isPlaying ? onPauseSorting : onStartSorting}
            className="w-full"
            style={{ backgroundColor: 'hsl(122, 39%, 49%)', color: 'white' }}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {isPaused ? 'Resume' : 'Start Sorting'}
              </>
            )}
          </Button>
          
          <Button 
            onClick={onStopSorting}
            className="w-full"
            style={{ backgroundColor: 'hsl(14, 88%, 55%)', color: 'white' }}
          >
            <Square className="w-4 h-4 mr-2" />
            Stop & Reset
          </Button>
          
          <Button 
            onClick={onStepForward}
            disabled={!canStepForward || isPlaying}
            className="w-full"
            variant="outline"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Step Forward
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
