'use client';

import React, { useMemo } from 'react';
import { PlayerAverageStats } from '../types';

interface PlayerStatsChartProps {
  averageStats: PlayerAverageStats[];
}

export default function PlayerStatsChart({ averageStats }: PlayerStatsChartProps) {
  const chartData = useMemo(() => {
    if (!averageStats || averageStats.length === 0) return null;
    
    // Use the first stats entry (most recent/relevant)
    const stats = averageStats[0];
    
    // Convert string stats to numbers for visualization and provide labels
    const chartValues = [
      { label: 'PTS', value: parseFloat(stats.pts) || 0, color: 'bg-blue-600' },
      { label: 'AST', value: parseFloat(stats.ast) || 0, color: 'bg-green-600' },
      { label: 'REB', value: parseFloat(stats.rebTotal) || 0, color: 'bg-purple-600' },
      { label: 'STL', value: parseFloat(stats.stl) || 0, color: 'bg-yellow-600' },
      { label: 'BLK', value: parseFloat(stats.blk) || 0, color: 'bg-red-600' },
    ];
    
    // Find the maximum for scaling
    const maxValue = Math.max(...chartValues.map(item => item.value));
    
    return { values: chartValues, maxValue: maxValue > 0 ? maxValue : 10 };
  }, [averageStats]);
  
  if (!chartData) return null;

  // Calculate relative percentages
  const percentValues = chartData.values.map(stat => ({
    ...stat,
    percentage: (stat.value / chartData.maxValue) * 100
  }));
  
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-4">Key Stats</h3>
      <div className="space-y-3">
        {percentValues.map((stat) => (
          <div key={stat.label} className="flex items-center">
            <div className="w-12 font-medium text-gray-700">{stat.label}</div>
            <div className="flex-grow">
              <div className="h-6 bg-gray-200 rounded-full flex items-center">
                <div 
                  className={`h-6 ${stat.color} rounded-full flex items-center justify-end pr-2`}
                  style={{ width: `${stat.percentage}%` }}
                >
                  {stat.percentage > 20 && (
                    <span className="text-xs font-medium text-white">{stat.value.toFixed(1)}</span>
                  )}
                </div>
                {stat.percentage <= 20 && (
                  <span className="text-xs font-medium text-gray-700 ml-2">{stat.value.toFixed(1)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500">
        Stats from last {averageStats[0].games} games
      </div>
    </div>
  );
}
