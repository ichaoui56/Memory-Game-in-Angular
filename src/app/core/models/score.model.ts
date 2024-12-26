export interface ScoreModel {
  finalScore: number;
  maxLevel: number;
  timestamp: Date;
  duration?: number;  // Optional: time taken in seconds
  playerName?: string;  // Optional: for future leaderboard feature
} 