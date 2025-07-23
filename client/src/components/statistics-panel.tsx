import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SortingStats } from '@/hooks/use-sorting';

interface StatisticsPanelProps {
  stats: SortingStats;
  stepHistory: string[];
}

export function StatisticsPanel({ stats, stepHistory }: StatisticsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Comparisons:</span>
          <span className="font-medium">{stats.comparisons}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Array Accesses:</span>
          <span className="font-medium">{stats.arrayAccesses}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Time Elapsed:</span>
          <span className="font-medium">{stats.timeElapsed.toFixed(1)}s</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Progress:</span>
            <span className="font-medium">{stats.progress}%</span>
          </div>
          <Progress value={stats.progress} className="w-full" />
        </div>
        
        {stepHistory.length > 0 && (
          <div className="border-t pt-3">
            <h4 className="font-medium mb-2">Recent Steps:</h4>
            <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto text-sm space-y-1">
              {stepHistory.slice(-5).map((step, index) => (
                <div key={index} className="text-gray-600">
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
