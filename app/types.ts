// *** NEW: Interface for a single game log entry ***
export interface GameLog {
    date: string;
    team: string;
    opponent: string;
    result: string; // e.g., "88-85"
    boxScoreUrl?: string; // URL from the result link
    min: string; // Or number if consistently numeric
    pts: string; // Or number
    fgp2: string; // e.g., "1-4"
    fgp3: string; // e.g., "1-1"
    ft: string;   // e.g., "0-0"
    rebOff: string; // Or number
    rebDef: string; // Or number
    rebTotal: string; // Or number
    ast: string; // Or number
    pf: string; // Or number
    blk: string; // Or number
    stl: string; // Or number
    to: string; // Or number
    rank: string; // Or number
}

// *** NEW: Interface for Summary Stats ***
export interface PlayerSummaryStats {
    team: string;
    games: string; // G
    min: string;
    pts: string;
    fgp2: string; // 2FGP
    fgp3: string; // 3FGP
    ft: string;
    rebOff: string; // RO
    rebDef: string; // RD
    rebTotal: string; // RT
    ast: string; // AS
    pf: string;
    blk: string; // BS
    stl: string; // ST
    to: string;
    rank: string; // RNK
}

// *** NEW: Interface for Average Stats ***
export interface PlayerAverageStats {
    team: string;
    games: string; // G
    min: string;
    pts: string;
    fgp2Pct: string; // 2FGP %
    fgp3Pct: string; // 3FGP %
    ftPct: string;   // FT %
    rebOff: string; // RO
    rebDef: string; // RD
    rebTotal: string; // RT
    ast: string; // AS
    pf: string;
    blk: string; // BS
    stl: string; // ST
    to: string;
    rank: string; // RNK
}

// New Advanced Stats interface
export interface AdvancedStats {
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

export interface Player {
    id: string;
    name: string;
    profileUrl: string;
    team: string;
    league: string;
    nationality: string;
    age: string;
    height: string;
    position: string;
    imageUrl?: string; // *** ADDED: Optional field for player image URL ***
    // Add fields for detailed info scraped from profile page
    bio?: string; // Example: A short biography or career summary
    stats?: Record<string, string | number>; // Example: Key-value pairs for stats
    careerHistory?: { year: string; team: string; league: string }[]; // Example: Career history
    gameLogs?: GameLog[]; // *** ADDED: Array to hold game logs ***
    summaryStats?: PlayerSummaryStats[]; // *** ADDED: Array for summary stats (could be multiple teams/seasons) ***
    averageStats?: PlayerAverageStats[]; // *** ADDED: Array for average stats ***
    advancedStats?: AdvancedStats; // Add advanced stats
    // Add other fields as needed
}
