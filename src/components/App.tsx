import React from "react";
import State from "../types";

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            start: false,
        };
    }

    startGame = () => {
        this.setState({ start: true });
    };

    render() {
        return (
            <>
                <header className="game-header">
                    <h1 className="game-title">Naval Game</h1>
                </header>
                <button
                    name="button"
                    onClick={this.startGame}
                    className="btn btn-start"
                    hidden={this.state.start}
                >
                    Start game
                </button>
            </>
        );
    }
}

export default App;
