import React, { useState, useEffect } from "react";
import CanvasComponent from "./components/CanvasComponent";
import Game from "./components/game";
import SettingsMenu from "./components/SettingsMenu"; // Новый компонент для настроек

function App() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [game, setGame] = useState(null);
    const [canvasSize, setCanvasSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [selectedPlayer, setSelectedPlayer] = useState(null); // Для отслеживания выбранного игрока

    useEffect(() => {
        const handleResize = () => {
            setCanvasSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
            if (game) {
                game.updateCanvasSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [game]);

    const startGame = (canvas) => {
        if (canvas && !game) {
            const newGame = new Game(canvas, canvasSize.width, canvasSize.height, setSelectedPlayer);
            newGame.initialize();
            setGame(newGame);
            setIsGameStarted(true);
        }
    };

    const handleMouseMove = (position) => {
        if (game) {
            game.setMousePosition(position);
        }
    };

    const handleClick = (event) => {
        if (game) {
            game.handleClick(event);
        }
    };

    const handleSettingsChange = (playerIndex, settings) => {
        if (game) {
            game.updatePlayerSettings(playerIndex, settings);
        }
    };

    return (
        <div className="app-container">
            {!isGameStarted ? (
                <button onClick={() => setIsGameStarted(true)}>Start the Game</button>
            ) : (
                <>
                    <CanvasComponent
                        width={canvasSize.width}
                        height={canvasSize.height}
                        onMount={startGame}
                        onMouseMove={handleMouseMove}
                        onClick={handleClick}
                    />
                    {selectedPlayer !== null && (
                        <SettingsMenu
                            playerIndex={selectedPlayer}
                            onChange={handleSettingsChange}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default App;
