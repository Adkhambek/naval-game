import React from "react";
import { ArrangementInterface, GridInterface, SquareInterface } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor } from "@fortawesome/free-solid-svg-icons";

class Arrangement extends React.Component<ArrangementInterface> {
    render() {
        const locations = this.props.locations;
        return (
            <div className="arrangement">
                <h2 className="player-name">Player {this.props.player}</h2>
                <p>
                    Choose 8 positions that you would like to place your ships:
                </p>
                <Grid
                    placeShip={this.props.placeShip}
                    player={this.props.player}
                    locations={locations}
                />
                <button
                    name="button"
                    onClick={this.props.confirm}
                    className={
                        this.props.hasEightShip()
                            ? "btn btn-confirm"
                            : "btn btn-confirm disabled"
                    }
                >
                    Confirm
                </button>
            </div>
        );
    }
}

class Grid extends React.Component<GridInterface> {
    render() {
        const squares = [];
        for (let i = 1; i <= 25; i++) {
            squares.push(
                <Square
                    key={i}
                    cell={i}
                    placeShip={this.props.placeShip}
                    player={this.props.player}
                    locations={this.props.locations}
                    hasShip={
                        this.props.locations.findIndex(
                            (location) =>
                                location.cell === i &&
                                location.player === this.props.player
                        ) !== -1
                    }
                />
            );
        }
        return <div className="grid">{squares}</div>;
    }
}

class Square extends React.Component<SquareInterface> {
    placeShip = () => {
        this.props.placeShip(this.props.cell as number);
    };
    render() {
        return (
            <div
                onClick={this.placeShip}
                className="grid-square"
                aria-label="grid square"
            >
                {this.props.hasShip && <FontAwesomeIcon icon={faAnchor} />}
            </div>
        );
    }
}

export default Arrangement;
