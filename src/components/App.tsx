import React from "react";
import State from "../types";
import Arrangement from "./Arrangement";
import Game from "./Game";
import Winner from "./Winner";

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            stage: "start",
            currentPlayer: 1,
            locations: [],
        };
    }

    placeShip = (cell: number) => {
        const player = this.state.currentPlayer;
        const locations = [...this.state.locations];
        const index = locations.findIndex(
            (locations) =>
                locations.cell === cell && locations.player === player
        );
        if (index === -1) {
            if (this.checkEightShip()) return;
            locations.push({ player, cell });
        } else locations.splice(index, 1);

        this.setState({ locations });
    };

    startGame = () => {
        this.setState({ stage: "arrangement" });
    };

    restartGame = () => {
        this.setState({ stage: "start" });
    };

    confirm = () => {
        if (!this.checkEightShip()) return;
        if (this.state.currentPlayer !== 2) {
            this.setState({ currentPlayer: 2 });
        } else {
            this.setState({
                currentPlayer: 1,
                stage: "game",
            });
        }
    };

    checkEightShip = () => {
        const locations = this.state.locations;
        const chosenLocations = locations.filter(
            (location) => location.player === this.state.currentPlayer
        );
        return chosenLocations.length === 8;
    };

    render() {
        const stage = this.state.stage;
        let block;

        if (stage === "arrangement") {
            block = (
                <Arrangement
                    placeShip={this.placeShip}
                    player={this.state.currentPlayer}
                    locations={this.state.locations}
                    confirm={this.confirm}
                    hasEightShip={this.checkEightShip}
                />
            );
        } else if (stage === "game") {
            console.log(this.state);
            block = <Game />;
        } else if (stage === "winner") {
            block = <Winner />;
        }

        return (
            <>
                <header className="game-header">
                    <h1 className="game-title">Naval Game</h1>
                </header>
                <button
                    name="button"
                    onClick={
                        stage === "start" ? this.startGame : this.restartGame
                    }
                    className={
                        stage === "start" ? "btn btn-start" : "btn btn-restart"
                    }
                >
                    {stage === "start" ? "Start Game" : "Restart"}
                </button>
                {block}
            </>
        );
    }
}

export default App;
