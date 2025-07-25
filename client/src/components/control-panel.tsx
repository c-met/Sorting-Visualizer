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
    <div className="space-y-4 sm:space-y-6">
      {/* Algorithm Selection */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Algorithm Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
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
            <div className="bg-muted dark:bg-muted rounded-lg p-3 sm:p-4 text-xs sm:text-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <span className="font-medium text-foreground dark:text-foreground">{currentAlgorithm.displayName}</span>
              </div>
              <p className="text-muted-foreground dark:text-muted-foreground mb-2 leading-relaxed">{currentAlgorithm.description}</p>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-xs">
                <span className="text-muted-foreground dark:text-muted-foreground">Time: <span className="font-medium">{currentAlgorithm.timeComplexity}</span></span>
                <span className="text-muted-foreground dark:text-muted-foreground">Space: <span className="font-medium">{currentAlgorithm.spaceComplexity}</span></span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sorting Controls */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Sorting Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          <Button 
            onClick={isPlaying ? onPauseSorting : onStartSorting}
            className="w-full"
            size="sm"
            style={{ backgroundColor: 'hsl(122, 39%, 49%)', color: 'white' }}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="text-xs sm:text-sm">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="text-xs sm:text-sm">{isPaused ? 'Resume' : 'Start Sorting'}</span>
              </>
            )}
          </Button>
          
          <Button 
            onClick={onStopSorting}
            className="w-full"
            size="sm"
            style={{ backgroundColor: 'hsl(14, 88%, 55%)', color: 'white' }}
          >
            <Square className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="text-xs sm:text-sm">Stop & Reset</span>
          </Button>
          
          {/* Step Forward button removed */}
        </CardContent>
      </Card>

      {/* Array Controls */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Array Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-foreground dark:text-foreground mb-2">Array Size</label>
            <div className="space-y-2">
              <Slider
                value={[arraySize]}
                onValueChange={(value) => onArraySizeChange(value[0])}
                max={100}
                min={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground dark:text-muted-foreground">
                <span>10</span>
                <span className="font-medium">{arraySize}</span>
                <span>100</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-foreground dark:text-foreground mb-2">Animation Speed</label>
            <div className="space-y-2">
              <Slider
                value={[animationSpeed]}
                onValueChange={(value) => onAnimationSpeedChange(value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground dark:text-muted-foreground">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>
          </div>

          <Button onClick={onGenerateArray} className="w-full" variant="outline" size="sm">
            <Shuffle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="text-xs sm:text-sm">Generate New Array</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
