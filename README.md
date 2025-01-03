# Memory Game

## Project Description
The Memory Game is an interactive web application where players challenge their memory by reproducing sequences of colors. Each level introduces a more complex sequence, with a new color added at every stage. The game emphasizes speed and accuracy, making it both engaging and challenging. Developed using Angular, the project leverages modern web technologies to provide an immersive user experience with animations and a responsive interface.

## Features
1. **Interactive Gameplay**:
   - Start the game by clicking the "Commencer" button.
   - Memorize sequences of colors displayed for 15 seconds.
   - Reproduce the sequence by clicking color buttons in the correct order.
   - Validate or reset your choices.
2. **Progression System**:
   - Levels increase in difficulty as new colors are added to the sequence.
   - Game ends if a mistake is made, displaying the final score.
3. **Score Calculation**:
   - Scores are based on accuracy and speed.
   - Higher levels and faster responses yield better scores.
4. **Dynamic Animations**:
   - Color buttons flash or zoom during sequence displays.
   - User actions trigger interactive visual feedback.

## Technologies Used
- Angular (version 15+)
- HTML5 / CSS3
- TypeScript
- RxJS
- @angular/animations
- Angular CLI

## How to Play
1. **Start the Game**:
   - Click the "Commencer" button to begin.
   - A sequence of two colors is displayed for 15 seconds. Memorize it.
2. **Reproduce the Sequence**:
   - After the display, color buttons reappear.
   - Click the buttons in the correct order to replicate the sequence.
3. **Validate or Reset**:
   - Click "Valider" to submit your answer.
   - Use "Réinitialiser" to start over if needed.
4. **Advance Through Levels**:
   - Correctly replicate the sequence to proceed to the next level.
   - Each new level adds one more color to the sequence.
5. **Game Over**:
   - A mistake ends the game, showing the final score and restart options.

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd memory-game
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   ng serve
   ```
5. Open the application in your browser at:
   ```
   http://localhost:4200
   ```

## Project Structure
- **Components**:
  - Game Component: Manages game logic and interactions.
  - Interface Component: Displays color buttons and controls.
  - Score/Status Component: Shows score, level, and game status.
- **Services**:
  - Game Service: Handles sequence generation, validation, scoring, and state management.

## Key Methods in Game Service
- `genererSequence()`: Generates a new random color sequence.
- `ajouterCouleur()`: Adds a new color to the existing sequence.
- `verifierReponse()`: Compares the user's input with the sequence.
- `resetGame()`: Resets the game for a new round.

## Future Enhancements
- Add sound effects for user interactions and sequence displays.
- Introduce difficulty settings (e.g., faster sequence display times).
- Implement user authentication to track high scores globally.

## Acknowledgments
Special thanks to the Angular community and contributors for their comprehensive documentation and tools that made this project possible.

