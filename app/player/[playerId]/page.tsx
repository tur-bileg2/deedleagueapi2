'use client'; // Required for hooks like useState, useEffect

import { useParams } from 'next/navigation'; // Hook to get dynamic route params
import React, { useState, useEffect } from 'react';
// *** Import new types ***
import { Player, GameLog, PlayerSummaryStats, PlayerAverageStats } from '../../types'; // Import Player and GameLog types
import Image from 'next/image'; // Import Next.js Image component for optimization
import PlayerStatsChart from '../../components/PlayerStatsChart';
import AdvancedStatsTable from '../../components/AdvancedStatsTable';
import { fetchWithAuth } from '../../utils/supabase/client';

// Define the expected structure of the API response
interface PlayerDetailsResponse extends Partial<Player> {
    source?: 'cache' | 'scrape';
    error?: string;
    details?: string;
}

export default function PlayerDetailPage() {
    const params = useParams();
    const playerId = params?.playerId as string; // Get playerId from URL

    const [playerData, setPlayerData] = useState<PlayerDetailsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!playerId) {
            setError('Player ID not found in URL.');
            setLoading(false);
            return;
        }

        const fetchPlayerData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Add retries to handle transient errors
                let retries = 3;
                let response;
                let responseData;
                
                while (retries > 0) {
                    try {
                        // First try with normal fetch
                        console.log(`Attempting to fetch player data, retries left: ${retries}`);
                        response = await fetch(`/api/player-details/${playerId}`);
                        responseData = await response.json();
                        break; // If we get here without errors, exit the retry loop
                    } catch (fetchError) {
                        console.error(`Fetch attempt failed, retries left: ${retries - 1}`, fetchError);
                        retries--;
                        if (retries === 0) throw fetchError;
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
                    }
                }
                
                if (!response || !response.ok) {
                    throw new Error(`API request failed with status ${response?.status || 'unknown'}`);
                }
                
                if (responseData.error) {
                    throw new Error(responseData.error);
                }

                setPlayerData(responseData);
                console.log('Fetched Player Details:', responseData);

            } catch (err) {
                console.error("Error fetching player data:", err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setPlayerData(null); // Clear any potentially stale data
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerData();

    }, [playerId]); // Re-run effect if playerId changes

    if (loading) {
        return <div className="container mx-auto p-4 text-center text-gray-500">Loading player details...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-4 text-center text-red-600 bg-red-100 border border-red-400 rounded">Error: {error}</div>;
    }

    if (!playerData) {
        return <div className="container mx-auto p-4 text-center text-gray-500">No player data found.</div>;
    }

    // --- Render Player Details ---
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-6xl">
            {/* Ensure Name is displayed (uses playerData.name) */}
            <h1 className="text-3xl font-bold mb-6 border-b pb-2">
                {playerData.name || `Player Details (ID: ${playerData.id})`}
            </h1>

            {/* Basic Info Card */}
            <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6 flex flex-col md:flex-row items-start">
                {/* Player Image */}
                {playerData.imageUrl && (
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        {/* Use Next.js Image for optimization, or standard img */}
                        <Image
                            src={playerData.imageUrl}
                            alt={playerData.name || `Player ${playerData.id}`}
                            width={100} // Adjust width as needed
                            height={150} // Adjust height as needed
                            className="rounded border border-gray-200 object-cover" // Basic styling
                            priority // Load image sooner if it's above the fold
                            unoptimized={playerData.imageUrl.includes('Not_Available.jpg')} // Avoid optimizing the placeholder
                        />
                        {/* Or use standard img tag:
                        <img
                            src={playerData.imageUrl}
                            alt={playerData.name || `Player ${playerData.id}`}
                            className="w-24 h-auto rounded border border-gray-200" // Adjust size with w- and h- classes
                        />
                        */}
                    </div>
                )}
                {/* Player Details Text */}
                <div className="flex-grow">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Basic Information</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                        {playerData.team && <div><strong>Team:</strong> {playerData.team}</div>}
                        {playerData.league && <div><strong>League:</strong> {playerData.league}</div>}
                        {playerData.nationality && <div><strong>Nationality:</strong> {playerData.nationality}</div>}
                        {playerData.age && <div><strong>Age:</strong> {playerData.age}</div>}
                        {playerData.height && <div><strong>Height:</strong> {playerData.height}</div>}
                        {/* Ensure Position is displayed here */}
                        {playerData.position && <div><strong>Position:</strong> {playerData.position}</div>}
                    </div>
                    {playerData.bio && (
                        <div className="mt-4 pt-4 border-t">
                            <h3 className="font-semibold text-gray-600 mb-1">Bio</h3>
                            <p className="text-sm text-gray-800">{playerData.bio}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Overview Card with Chart */}
            {playerData.averageStats && playerData.averageStats.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Stats Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <PlayerStatsChart averageStats={playerData.averageStats} />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                            {playerData.averageStats[0] && (
                                <>
                                    <div className="bg-gray-50 p-2 rounded border border-gray-200">
                                        <span className="font-semibold text-gray-600 block">PPG:</span>
                                        <span className="text-gray-800">{playerData.averageStats[0].pts}</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded border border-gray-200">
                                        <span className="font-semibold text-gray-600 block">RPG:</span>
                                        <span className="text-gray-800">{playerData.averageStats[0].rebTotal}</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded border border-gray-200">
                                        <span className="font-semibold text-gray-600 block">APG:</span>
                                        <span className="text-gray-800">{playerData.averageStats[0].ast}</span>
                                    </div>
                                    {/* Add more stats as needed */}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Career History Card */}
            {playerData.careerHistory && playerData.careerHistory.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Career History</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">Year</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">Team</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">League</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {playerData.careerHistory.map((entry, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">{entry.year}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">{entry.team}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{entry.league}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Summary Stats Card */}
            {playerData.summaryStats && playerData.summaryStats.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Season Summary</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 text-xs"><thead className="bg-gray-100"><tr><th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider border-r">Team</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">G</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">MIN</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">PTS</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">2FG</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">3FG</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">FT</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">OR</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">DR</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">TR</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">AS</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">PF</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">BS</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">ST</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">TO</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider">RNK</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">{playerData.summaryStats.map((summary, index) => (
                                    <tr key={`summary-${index}`} className="hover:bg-gray-50"><td className="px-2 py-1.5 whitespace-nowrap text-gray-700 border-r">{summary.team}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.games}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.min}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.pts}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.fgp2}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.fgp3}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.ft}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.rebOff}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.rebDef}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.rebTotal}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.ast}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.pf}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.blk}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.stl}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{summary.to}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700">{summary.rank}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Average Stats Card */}
            {playerData.averageStats && playerData.averageStats.length > 0 && (
                 <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6"> {/* Added mb-6 */}
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Season Averages</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 text-xs"><thead className="bg-gray-100"><tr><th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider border-r">Team</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">G</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">MIN</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">PTS</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">2FG%</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">3FG%</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">FT%</th>
                                    {/* Corrected closing tag below */}
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">OR</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">DR</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">TR</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">AS</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">PF</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">BS</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">ST</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r">TO</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider">RNK</th>
                                </tr>
                            </thead>
                             <tbody className="bg-white divide-y divide-gray-200">{playerData.averageStats.map((avg, index) => (
                                    <tr key={`average-${index}`} className="hover:bg-gray-50"><td className="px-2 py-1.5 whitespace-nowrap text-gray-700 border-r">{avg.team}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.games}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.min}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.pts}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.fgp2Pct}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.fgp3Pct}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.ftPct}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.rebOff}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.rebDef}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.rebTotal}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.ast}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.pf}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.blk}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.stl}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r">{avg.to}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700">{avg.rank}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Advanced Stats Card */}
            {playerData.advancedStats && (
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Advanced Analytics</h2>
                    <AdvancedStatsTable 
                        stats={playerData.advancedStats}
                        id={playerId}
                    />
                </div>
            )}

            {/* Placeholder for Advanced Stats */}
            {!playerData.advancedStats && playerData.averageStats && playerData.averageStats.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Team Statistics</h2>
                    <p className="text-gray-500 text-sm italic mb-2">Advanced team percentage statistics are not available for this player.</p>
                    
                    {/* Fallback Advanced Stats with mock data */}
                    <AdvancedStatsTable
                        stats={{
                            points: { 
                                value: parseFloat(playerData.averageStats[0].pts) || 0,
                                team: 84.0,
                                percentage: ((parseFloat(playerData.averageStats[0].pts) || 0) / 84.0) * 100
                            },
                            twoPointFG: {
                                made: { value: 0.6, team: 30.3, percentage: 2.9 },
                                attempted: { value: 1.8, team: 60.2, percentage: 4.4 }
                            },
                            threePointFG: {
                                made: { value: 0.1, team: 12.0, percentage: 1.2 },
                                attempted: { value: 0.5, team: 39.7, percentage: 1.9 }
                            },
                            freeThrows: {
                                made: { value: 0.7, team: 26.6, percentage: 3.9 },
                                attempted: { value: 0.9, team: 37.7, percentage: 3.5 }
                            },
                            assists: { value: 0.8, team: 15.5, percentage: 5.2 }
                        }}
                        id={playerId}
                    />
                </div>
            )}

            {/* Game Logs Card */}
            {playerData.gameLogs && playerData.gameLogs.length > 0 ? (
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6"> {/* Added mb-6 */}
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Game Logs</h2>
                    <div className="overflow-x-auto"> {/* Make table horizontally scrollable */}
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 text-xs"><thead className="bg-gray-100"><tr><th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">Date</th>
                                    <th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">Team</th>
                                    <th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">Opp</th>
                                    <th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">Result</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">MIN</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">PTS</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">2FG</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">3FG</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">FT</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">OR</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">DR</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">TR</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">AS</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">PF</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">BS</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">ST</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">TO</th>
                                    <th className="px-1 py-2 text-center font-medium text-gray-600 uppercase tracking-wider">RNK</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">{playerData.gameLogs.map((log, index) => (
                                    <tr key={index} className="hover:bg-gray-50"><td className="px-2 py-1.5 whitespace-nowrap text-gray-700 border-r border-gray-200">{log.date}</td>
                                        <td className="px-2 py-1.5 whitespace-nowrap text-gray-700 border-r border-gray-200">{log.team}</td>
                                        <td className="px-2 py-1.5 whitespace-nowrap text-gray-700 border-r border-gray-200">{log.opponent}</td>
                                        <td className="px-2 py-1.5 whitespace-nowrap text-gray-700 border-r border-gray-200">
                                            {log.boxScoreUrl ? (
                                                <a href={log.boxScoreUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
                                                    {log.result}
                                                </a>
                                            ) : (
                                                log.result
                                            )}
                                        </td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r border-gray-200">{log.min}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r border-gray-200">{log.pts}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r border-gray-200">{log.fgp2}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r border-gray-200">{log.fgp3}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r border-gray-200">{log.ft}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r border-gray-200">{log.rebOff}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r border-gray-200">{log.rebDef}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r border-gray-200">{log.rebTotal}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r border-gray-200">{log.ast}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r border-gray-200">{log.pf}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r border-gray-200">{log.blk}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r border-gray-200">{log.stl}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700 border-r border-gray-200">{log.to}</td>
                                        <td className="px-1 py-1.5 whitespace-nowrap text-center text-gray-700">{log.rank}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                 <div className="bg-white shadow-md rounded-lg p-4 md:p-6 text-center text-gray-500 mb-6"> {/* Added mb-6 */}
                     No game logs found for this player.
                 </div>
            )}

            {/* Footer/Source Info (Optional) */}
            {playerData.source && (
                <div className="text-center text-xs text-gray-400 mt-8">
                    Data fetched via {playerData.source}
                </div>
            )}

        </div>
    );
}
