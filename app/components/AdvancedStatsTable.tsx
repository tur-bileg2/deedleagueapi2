"use client";

import React, { useState } from 'react';

interface AdvancedStats {
  points: { value: number, team: number, percentage: number };
  twoPointFG: { 
    made: { value: number, team: number, percentage: number },
    attempted: { value: number, team: number, percentage: number }
  };
  threePointFG: {
    made: { value: number, team: number, percentage: number },
    attempted: { value: number, team: number, percentage: number }
  };
  freeThrows: {
    made: { value: number, team: number, percentage: number },
    attempted: { value: number, team: number, percentage: number }
  };
  assists: { value: number, team: number, percentage: number };
}

interface AdvancedStatsTableProps {
  stats: AdvancedStats;
  id?: string;
}

export default function AdvancedStatsTable({ stats, id = 'advStats' }: AdvancedStatsTableProps) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="mt-4 border-t pt-4">
      <span 
        onClick={toggleVisibility} 
        className="block text-center py-2 text-sm text-blue-500 font-medium uppercase cursor-pointer hover:text-blue-700"
        id={`adstatsspan${id}`}
      >
        {visible ? 'Hide Advanced Stats ↑' : 'Click for Advanced Stats ↓'}
      </span>

      {visible && (
        <div className="overflow-x-auto mt-2">
          <table className="my_Title min-w-full border-collapse text-black">
            <tbody>
              <tr className="my_Headers bg-gray-100 text-black">
                <td colSpan={24} className="px-2 py-1.5 text-sm font-bold">
                  Player Percentage of Team's offensive stats
                </td>
              </tr>
              <tr className="my_Headers bg-gray-50 text-black">
                <td colSpan={3} className="px-2 py-1.5 text-xs font-medium">Total Points</td>
                <td colSpan={6} className="px-2 py-1.5 text-xs font-medium">2FGP</td>
                <td colSpan={6} className="px-2 py-1.5 text-xs font-medium">3FGP</td>
                <td colSpan={6} className="px-2 py-1.5 text-xs font-medium">FT</td>
                <td colSpan={3} className="px-2 py-1.5 text-xs font-medium">Assists</td>
              </tr>
              <tr className="my_Headers bg-gray-50 text-xs text-black">
                <td className="px-1 py-1 text-center">PTS</td>
                <td className="px-1 py-1 text-center">Tm</td>
                <td className="px-1 py-1 text-center">Tm%</td>
                <td className="px-1 py-1 text-center">2FGM</td>
                <td className="px-1 py-1 text-center">Tm</td>
                <td className="px-1 py-1 text-center">Tm%</td>
                <td className="px-1 py-1 text-center">2FGA</td>
                <td className="px-1 py-1 text-center">Tm</td>
                <td className="px-1 py-1 text-center">Tm%</td>
                <td className="px-1 py-1 text-center">3FGM</td>
                <td className="px-1 py-1 text-center">Tm</td>
                <td className="px-1 py-1 text-center">Tm%</td>
                <td className="px-1 py-1 text-center">3FGA</td>
                <td className="px-1 py-1 text-center">Tm</td>
                <td className="px-1 py-1 text-center">Tm%</td>
                <td className="px-1 py-1 text-center">FTM</td>
                <td className="px-1 py-1 text-center">Tm</td>
                <td className="px-1 py-1 text-center">Tm%</td>
                <td className="px-1 py-1 text-center">FTA</td>
                <td className="px-1 py-1 text-center">Tm</td>
                <td className="px-1 py-1 text-center">Tm%</td>
                <td className="px-1 py-1 text-center">AS</td>
                <td className="px-1 py-1 text-center">Tm</td>
                <td className="px-1 py-1 text-center">Tm%</td>
              </tr>
              <tr className="adstatscolor my_pStats1 text-xs text-black">
                <td className="px-1 py-1.5 text-center">{stats.points.value.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.points.team.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.points.percentage.toFixed(1)}%</td>
                
                <td className="px-1 py-1.5 text-center">{stats.twoPointFG.made.value.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.twoPointFG.made.team.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.twoPointFG.made.percentage.toFixed(1)}%</td>
                <td className="px-1 py-1.5 text-center">{stats.twoPointFG.attempted.value.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.twoPointFG.attempted.team.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.twoPointFG.attempted.percentage.toFixed(1)}%</td>
                
                <td className="px-1 py-1.5 text-center">{stats.threePointFG.made.value.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.threePointFG.made.team.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.threePointFG.made.percentage.toFixed(1)}%</td>
                <td className="px-1 py-1.5 text-center">{stats.threePointFG.attempted.value.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.threePointFG.attempted.team.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.threePointFG.attempted.percentage.toFixed(1)}%</td>
                
                <td className="px-1 py-1.5 text-center">{stats.freeThrows.made.value.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.freeThrows.made.team.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.freeThrows.made.percentage.toFixed(1)}%</td>
                <td className="px-1 py-1.5 text-center">{stats.freeThrows.attempted.value.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.freeThrows.attempted.team.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.freeThrows.attempted.percentage.toFixed(1)}%</td>
                
                <td className="px-1 py-1.5 text-center">{stats.assists.value.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.assists.team.toFixed(1)}</td>
                <td className="px-1 py-1.5 text-center">{stats.assists.percentage.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
