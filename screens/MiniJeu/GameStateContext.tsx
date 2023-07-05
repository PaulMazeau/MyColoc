import React, { createContext, useState } from "react";

// Création du context
export const GameStateContext = createContext(null);

// Création du fournisseur de context
export const GameStateProvider = ({ children }) => {
    const [gameState, setGameState] = useState({
        // Ici, définissez les propriétés initiales de votre état de jeu.
        // par exemple, si votre jeu a des joueurs et un score:
        players: [],
        score: 0,
        // Ajoutez d'autres propriétés de l'état du jeu si nécessaire.
    });

    return (
        <GameStateContext.Provider value={[gameState, setGameState]}>
            {children}
        </GameStateContext.Provider>
    );
};
