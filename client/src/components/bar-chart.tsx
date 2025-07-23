import { cn } from '@/lib/utils';

interface BarChartProps {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
}

export function BarChart({ array, comparing, swapping, sorted }: BarChartProps) {
  const maxValue = Math.max(...array, 100);

  const getBarState = (index: number) => {
    if (sorted.includes(index)) return 'sorted';
    if (swapping.includes(index)) return 'swapping';
    if (comparing.includes(index)) return 'comparing';
    return 'default';
  };

  return (
    <div className="relative h-64 sm:h-80 lg:h-96 bg-muted dark:bg-muted rounded-lg p-2 sm:p-4 overflow-hidden">
      <div className="flex items-end justify-center h-full space-x-0.5 sm:space-x-1">
        {array.map((value, index) => {
          const height = Math.max((value / maxValue) * 100, 5);
          const state = getBarState(index);
          
          return (
            <div
              key={index}
              className={cn(
                "bar-element flex-1 max-w-4 sm:max-w-6 lg:max-w-8 rounded-t-md relative group cursor-pointer",
                {
                  'bar-default': state === 'default',
                  'bar-comparing': state === 'comparing',
                  'bar-swapping': state === 'swapping',
                  'bar-sorted': state === 'sorted'
                }
              )}
              style={{ height: `${height}%`, minHeight: '15px' }}
            >
              <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 bg-popover dark:bg-popover text-popover-foreground dark:text-popover-foreground text-xs px-1 sm:px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                <span>{value}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-center mt-2 sm:mt-4 space-x-0.5 sm:space-x-1">
        {array.map((_, index) => (
          <div key={index} className="flex-1 max-w-4 sm:max-w-6 lg:max-w-8 text-center">
            <span className="text-xs text-muted-foreground dark:text-muted-foreground hidden sm:inline">{index}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
