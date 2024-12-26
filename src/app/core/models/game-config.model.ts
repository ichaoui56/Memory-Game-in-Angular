export interface GameSettings {
    initialLevel: number;
    basePointsPerLevel: number;
    countdownDuration: number;
    animationDelay: number;
    timeBonus: {
        fast: number;    
        normal: number;  
        slow: number;    
    };
} 