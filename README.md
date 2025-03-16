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
If you need Heroicons for icons in your project, run:
	-	`yarn add @heroicons/react`
4. Install Firebase SDK
If you plan to use Firebase, install it with either npm or yarn:
- **npm**:
	-	`npm install firebase`
- **yarn**:
	-	`yarn add firebase`
5. Install React Router
To install React Router, use one of the following commands:
`yarn add react-router-dom@^7.3.0`
6.  Start the Development Server
Once the installation is complete, run this command to start the development server:
	`yarn dev`

```
[https://react-xo-game-orcin.vercel.app/]
