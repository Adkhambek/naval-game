import React from "react";
import State from "../types";
import Arrangement from "./Arrangement";
import Game from "./Game";
import Winner from "./Winner";

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            stage: "game",
            currentPlayer: 1,
            locations: [],
            startMove: false,
            isSelected: false,
            result: null,
            attacks: [],
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
        this.setState({
            stage: "start",
            currentPlayer: 1,
            locations: [],
            startMove: false,
            isSelected: false,
            attacks: [],
        });
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

    startMove = () => {
        this.setState({ startMove: true });
    };

    selectCell = (cell: number) => {
        const player = this.state.currentPlayer;
        let isSelected = true;
        let result = this.state.result;
        const attacks = [...this.state.attacks];
        const index = attacks.findIndex(
            (attack) =>
                attack.cell === cell &&
                attack.result === null &&
                attack.player === player
        );

        const selectedCell = attacks.find(
            (attack) =>
                attack.cell === cell &&
                attack.result !== null &&
                attack.player === player
        );
        if (result === "missed" || selectedCell) return;

        if (index === -1) {
            result = null;
            const index = attacks.findIndex(
                (attacks) => attacks.result === null
            );

            if (index !== -1) {
                attacks.splice(index, 1);
            }

            attacks.push({ player, cell, result: null });
        } else {
            isSelected = false;
            result = null;
            attacks.splice(index, 1);
        }

        this.setState({ attacks, isSelected, result });
    };

    attack = () => {
        const attacks = [...this.state.attacks];
        const locations = this.state.locations;
        let result = this.state.result;

        const index = attacks.findIndex(
            (attack) =>
                attack.result === null &&
                attack.player === this.state.currentPlayer
        );
        let player = this.state.currentPlayer === 1 ? 2 : 1;
        const ship = locations.find(
            (location) =>
                location.cell === attacks[index].cell &&
                location.player === player
        );

        if (ship) {
            result = "killed";
            attacks[index].result = "killed";
        } else {
            result = "missed";
            attacks[index].result = "missed";
        }

        this.setState({ attacks, isSelected: false, result });
    };

    endTurn = () => {
        let player = this.state.currentPlayer;
        if (player === 1) player = 2;
        else player = 1;

        this.setState({
            stage: "game",
            currentPlayer: player,
            startMove: false,
            isSelected: false,
            result: null,
        });
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
            block = (
                <Game
                    startMove={this.startMove}
                    player={this.state.currentPlayer}
                    hasStarted={this.state.startMove}
                    locations={this.state.locations}
                    attacks={this.state.attacks}
                    selectCell={this.selectCell}
                    isSelected={this.state.isSelected}
                    attack={this.attack}
                    result={this.state.result}
                    endTurn={this.endTurn}
                />
            );
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
                        stage === "start"
                            ? "btn btn-start btn-green"
                            : "btn btn-restart btn-red"
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
