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
        };
    }

    startGame = () => {
        this.setState({ stage: "arrangement" });
    };

    render() {
        const stage = this.state.stage;
        let block;

        if (stage === "arrangement") {
            block = <Arrangement />;
        } else if (stage === "game") {
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
                    onClick={this.startGame}
                    className="btn btn-start"
                    hidden={stage !== "start"}
                >
                    Start game
                </button>
                {block}
            </>
        );
    }
}

export default App;
