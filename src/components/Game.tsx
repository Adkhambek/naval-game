import React from "react";
import {
    GameGridInterface,
    GameInterface,
    GameSquareGridInterface,
} from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor } from "@fortawesome/free-solid-svg-icons";

class Game extends React.Component<GameInterface> {
    getResult = () => {
        if (this.props.result) {
            if (this.props.result === "killed") {
                return <h2 hidden={false}>🎉 You killed</h2>;
            } else {
                return <h2>😔 You missed</h2>;
            }
        }
    };
    render() {
        return (
            <div className="game">
                <h2 className="player-name" hidden={this.props.hasStarted}>
                    Player {this.props.player}
                </h2>
                <button
                    name="button"
                    onClick={this.props.startMove}
                    className="btn btn-start btn-green"
                    hidden={this.props.hasStarted}
                >
                    Start move
                </button>
                {this.props.hasStarted && (
                    <>
                        <div className="attack-result">
                            {this.getResult()}
                            <button
                                onClick={this.props.attack}
                                className="btn btn-green"
                                hidden={!this.props.isSelected}
                            >
                                Attack
                            </button>
                            <button
                                onClick={this.props.endTurn}
                                className="btn btn-red"
                                hidden={!(this.props.result === "missed")}
                            >
                                End Turn
                            </button>
                        </div>
                        <div className="fields">
                            <div className="my-field">
                                <h3>My field</h3>
                                <Grid
                                    field={"my"}
                                    locations={this.props.locations}
                                    player={this.props.player}
                                />
                            </div>
                            <div className="enemy-filed">
                                <h3>Enemy field</h3>
                                <Grid
                                    player={this.props.player}
                                    field={"enemy"}
                                    locations={this.props.locations}
                                    selectCell={this.props.selectCell}
                                    attacks={this.props.attacks}
                                    isSelected={this.props.isSelected}
                                    result={this.props.result}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

class Grid extends React.Component<GameGridInterface> {
    checkSelection(cell: number) {
        const attacks = this.props.attacks;
        const index = attacks?.findIndex(
            (attack) =>
                attack.cell === cell &&
                attack.result === null &&
                attack.player === this.props.player
        );
        return index !== -1;
    }
    render() {
        const squares = [];
        for (let i = 1; i <= 25; i++) {
            squares.push(
                <Square
                    key={i}
                    cell={i}
                    field={this.props.field}
                    locations={this.props.locations}
                    player={this.props.player}
                    selectCell={this.props.selectCell}
                    isSelected={this.checkSelection(i)}
                    result={this.props.result}
                    attack={this.props.attacks?.find(
                        (attack) =>
                            attack.cell === i &&
                            attack.player === this.props.player
                    )}
                />
            );
        }
        return <div className="grid">{squares}</div>;
    }
}

class Square extends React.Component<GameSquareGridInterface> {
    selectCell = () => {
        if (this.props.selectCell) {
            this.props.selectCell(this.props.cell as number);
        }
    };
    render() {
        let square;
        if (this.props.field === "my") {
            const locations = this.props.locations;
            const index = locations.findIndex(
                (location) =>
                    location.cell === this.props.cell &&
                    location.player === this.props.player
            );
            square = (
                <div className="grid-square" aria-label="grid square">
                    {index !== -1 && <FontAwesomeIcon icon={faAnchor} />}
                </div>
            );
        } else {
            let classNames = "grid-square";
            if (this.props.isSelected) classNames += " selected";
            else if (this.props.attack)
                classNames += " " + this.props.attack.result;

            square = (
                <div
                    onClick={this.selectCell}
                    className={classNames}
                    aria-label="grid square"
                >
                    {this.props.attack?.result === "killed" && (
                        <FontAwesomeIcon icon={faAnchor} />
                    )}
                </div>
            );
        }

        return square;
    }
}

export default Game;
