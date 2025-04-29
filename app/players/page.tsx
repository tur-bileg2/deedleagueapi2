'use client';

import { useEffect, useState, useMemo } from 'react';
import { Player } from '../types';
import Link from 'next/link';
import { useApi } from '../hooks/useApi';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, Search, Filter } from 'lucide-react';

export default function PlayersPage() {
  // Use our API hook with retry
  const { data: apiData, loading, error } = useApi<{ players: Player[] }>('/api/scrape', {
    retries: 2,
    retryDelay: 2000
  });

  // Extract players from API response
  const players = useMemo(() => apiData?.players || [], [apiData]);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [filterNationality, setFilterNationality] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 15;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterPosition, filterTeam, filterNationality]);

  // Extract unique values for filter dropdowns
  const uniquePositions = useMemo(() => {
    const positions = Array.from(new Set(players.map(p => p.position).filter(Boolean)));
    return ['', ...positions.sort()];
  }, [players]);

  const uniqueTeams = useMemo(() => {
    const teams = Array.from(new Set(players.map(p => p.team).filter(Boolean)));
    return ['', ...teams.sort()];
  }, [players]);

  const uniqueNationalities = useMemo(() => {
    const nationalities = Array.from(new Set(players.map(p => p.nationality).filter(Boolean)));
    return ['', ...nationalities.sort()];
  }, [players]);

  // Filter players
  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        (player.name && player.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Position filter
      const matchesPosition = filterPosition === '' || player.position === filterPosition;
      
      // Team filter
      const matchesTeam = filterTeam === '' || player.team === filterTeam;
      
      // Nationality filter
      const matchesNationality = filterNationality === '' || player.nationality === filterNationality;
      
      return matchesSearch && matchesPosition && matchesTeam && matchesNationality;
    });
  }, [players, searchTerm, filterPosition, filterTeam, filterNationality]);

  // Get current players
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);
  
  // Calculate page numbers
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Previous and next page handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600 font-medium">Loading player data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full text-center p-8 rounded-lg shadow-lg bg-white border-l-4 border-red-500">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">
              Deed League Players
            </h1>
            <p className="text-lg text-black mt-1">
              Explore the profiles of Mongolian basketball players.
            </p>
          </div>
          
          {/* Back link - with improved styling and animation */}
          <Link href="/" className="group flex items-center text-blue-600 hover:text-blue-800 mt-4 md:mt-0 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
  
        {/* Search and Filter Controls - with mobile-friendly toggle */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-black">Search and Filter</h2>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center text-black hover:text-blue-600"
            >
              <Filter className="h-5 w-5 mr-1" />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 ${isFilterOpen ? 'block' : 'hidden md:grid'}`}>
            {/* Search */}
            <div className="col-span-1 lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-black mb-1">Search Players</label>
              <input
                type="text"
                id="search"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter player name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Position Filter */}
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-black mb-1">Position</label>
              <select
                id="position"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filterPosition}
                onChange={e => setFilterPosition(e.target.value)}
              >
                <option value="">All Positions</option>
                {uniquePositions.map(position => position && (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
            </div>
            
            {/* Team Filter */}
            <div>
              <label htmlFor="team" className="block text-sm font-medium text-black mb-1">Team</label>
              <select
                id="team"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filterTeam}
                onChange={e => setFilterTeam(e.target.value)}
              >
                <option value="">All Teams</option>
                {uniqueTeams.map(team => team && (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
            
            {/* Nationality Filter */}
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-black mb-1">Nationality</label>
              <select
                id="nationality"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filterNationality}
                onChange={e => setFilterNationality(e.target.value)}
              >
                <option value="">All Nationalities</option>
                {uniqueNationalities.map(nationality => nationality && (
                  <option key={nationality} value={nationality}>{nationality}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Filter stats */}
          <div className="mt-3 text-sm text-black flex justify-between items-center flex-wrap gap-2">
            <span>Showing {filteredPlayers.length} of {players.length} players</span>
            {(searchTerm || filterPosition || filterTeam || filterNationality) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterPosition('');
                  setFilterTeam('');
                  setFilterNationality('');
                }}
                className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            )}
          </div>
        </div>
        
        {/* Player Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">Player Name</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">Team</th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-black uppercase tracking-wider">League</th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-black uppercase tracking-wider">Nationality</th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-black uppercase tracking-wider">Age</th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-black uppercase tracking-wider">Height</th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-black uppercase tracking-wider">Position</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPlayers.map((player, index) => (
                  <tr key={player.id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/player/${player.id}`} className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                          {player.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{player.team || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-black">{player.league || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-black">{player.nationality || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-black">{player.age || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-black">
                      {player.height ? `${player.height} cm` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-black">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        player.position ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {player.position || 'Unknown'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPlayers.length === 0 && players.length > 0 && (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="mt-4 text-lg text-black">No players match your filters</p>
              <p className="text-sm text-black mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
        
        {/* Pagination Controls */}
        {filteredPlayers.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow">
            <div className="flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-black">
                  Showing <span className="font-medium">{indexOfFirstPlayer + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(indexOfLastPlayer, filteredPlayers.length)}</span> of{" "}
                  <span className="font-medium">{filteredPlayers.length}</span> players
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  {/* Previous Page Button */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Page Numbers */}
                  {[...Array(Math.min(totalPages, 7))].map((_, idx) => {
                    let pageNum;
                    if (totalPages <= 7) {
                      // Show all pages if total is 7 or fewer
                      pageNum = idx + 1;
                    } else {
                      // Show pages around current page
                      if (currentPage <= 3) {
                        if (idx < 5) pageNum = idx + 1;
                        else if (idx === 5) pageNum = -1; // Ellipsis
                        else pageNum = totalPages;
                      } else if (currentPage >= totalPages - 2) {
                        if (idx === 0) pageNum = 1;
                        else if (idx === 1) pageNum = -1; // Ellipsis
                        else pageNum = totalPages - (6 - idx);
                      } else {
                        if (idx === 0) pageNum = 1;
                        else if (idx === 1) pageNum = -1; // Ellipsis
                        else if (idx === 5) pageNum = -1; // Ellipsis
                        else if (idx === 6) pageNum = totalPages;
                        else pageNum = currentPage + (idx - 3);
                      }
                    }
                    
                    if (pageNum === -1) {
                      // Ellipsis
                      return (
                        <span key={`ellipsis-${idx}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-black ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                          ...
                        </span>
                      );
                    }
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => paginate(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          pageNum === currentPage
                            ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                            : 'text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {/* Next Page Button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-5 text-center text-sm text-gray-500">
          Data is updated periodically
        </div>
      </div>
    </main>
  );
}