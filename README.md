# Build an XO game with React Web
A dynamic Tic-Tac-Toe web app built with React. Features customizable grid sizes, AI opponents, and game history with replay functionality. Includes database integration using Firebase and a clean, responsive UI.
# Setup and Run Project
### Step 1: Install Dependencies

1.  **Install Visual Studio Code**  
    If you don't have Visual Studio Code (VSCode) installed, download it from [here](https://code.visualstudio.com/).
    
2.  **Install Node.js**  
    Download and install Node.js from [here](https://nodejs.org/). This includes npm (Node Package Manager), which is required to manage project dependencies.
    
3.  **Create a Vite React Project with TypeScript**
Open a terminal and run the following command to create a new React project with TypeScript using Vite:
 -	With NPM:
	   -	`npm create vite@latest`
-	With Yarn:
	   -	`yarn create vite`

	For more information about Vite, you can visit the [Vite Documentation](https://vite.dev/guide/).
    
5.  **Install TailwindCSS**  
    TailwindCSS is a utility-first CSS framework. To install TailwindCSS in your Vite project, follow the official instructions:
    
  - Install Tailwind CSS: 
	  -  `npm install tailwindcss @tailwindcss/vite`
     
     You can find more installation and setup details in the [TailwindCSS Documentation](https://tailwindcss.com/docs/installation/using-vite).
        
6.  **Install Yarn**  
    If you don't have Yarn installed, you can install it globally using npm:
	- `npm install -g yarn` 
   
	Alternatively, you can follow the installation guide from [Yarn Installation Guide](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable).
   ### Step 2 : Open the Project
   1.  **Clone the Repository**  
To clone the project, open your terminal and run the following command:
		-	`git clone https://github.com/minaq575/React-Xo-Game.git`

		This will create a copy of the `React-Xo-Game` project on your local machine.
   2. **Open the Project Folder**
-   Open Visual Studio Code (VSCode).
-   Go to `File > Open Folder`.
-   Navigate to the folder where you cloned the project `React-Xo-Game` and select it.
### Step 3 : Run the Development Server
1.  go to  `Terminal > New Terminal`
2. Install Dependencies (if not done already)
Open your terminal and run the following command to install dependencies:
	-	`yarn`
3. Install @heroicons/react  
For icons in the project, run:
	-	`yarn add @heroicons/react`
4. Install Firebase SDK
Firebase will be used as the database storage. Install with npm or yarn:
- **npm**:
	-	`npm install firebase`
- **yarn**:
	-	`yarn add firebase`
5. Install React Router
Install React Router, use one of the following commands:
	-	`yarn add react-router-dom@^7.3.0`
6.  Start the Development Server
Once the installation is complete, run this command to start the development server:
	-	`yarn dev`

# Step 2 : How to design programs and algorithms used

### Home
<div align="center">
  <img src="https://github.com/user-attachments/assets/29cd2029-f53c-4944-a621-e3554958fa52" alt="Home">
</div>

#

### Game
<div align="center">
  <img src="https://github.com/user-attachments/assets/41e6e498-00a6-4786-881d-05f1b143181d" alt="Home">
</div>

#

### CheckWinner
<div align="center">
  <img src="https://github.com/user-attachments/assets/4a50a662-8727-49b3-ae98-9684918c36f6" alt="Home">
  
#

### BoardControls
<div align="center">
  <img src="https://github.com/user-attachments/assets/a7706476-7d0a-4794-b3e9-5a54355394fd" alt="Home">
  
  #
  
### History
<div align="center">
  <img src="https://github.com/user-attachments/assets/dd0a0ec5-5f74-428a-b976-08a670492ef3" alt="Home" >

# Firebase Data
This project uses **Firebase Firestore** to store game history. Each completed game is saved in the `gameHistory` collection with the following data:
-   **`round`**: The game number (auto-incremented).
-   **`boardState`**: The final state of the Tic-Tac-Toe board.
-   **`winner`**: `"Player"`, `"AI"`, or `null` (for a draw).
-   **`playerMoves` / `aiMoves`**: The number of moves made by each side.
-   **`timestamp`**: The date and time when the game ended.
-   **`isFinished`**: `true` when the game is complete.

 **How It Works**:

1.  When a game ends, the data is automatically saved to Firestore.
2.  Players can view past game history for replay or analysis.
# AI Opponent (Random Move AI)
The AI in this Tic-Tac-Toe game uses a **Random Move AI** strategy. It follows these steps:

1.  **Find empty cells:** The AI looks for all available empty spaces on the board.
    
2.  **Select a move randomly:** It picks a random available cell to place its mark (`X` or `O`).
    
3.  **Check for a winner:** If the move results in a win, the game ends.
    
4.  **Switch turn:** If no one wins, the turn passes back to the player.


#  Try It Out! (Free to Play)
I have brought XO game to **Vercel + Firebase**  You can play online without setting up.
**Play now:** [React XO Game](https://react-xo-game-orcin.vercel.app/)
 **Note:** The Firebase database has usage limitations, but you can still enjoy the game.
