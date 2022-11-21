type Stage = "start" | "arrangement" | "game" | "winner";

type ShipLocation = { player: 1 | 2; cell: number };

export default interface State {
    stage: Stage;
    currentPlayer: 1 | 2;
    locations: ShipLocation[];
}

export interface ArrangementInterface {
    player: number;
    locations: ShipLocation[];
    placeShip: (cell: number) => void;
    confirm: () => void;
    hasEightShip: () => boolean;
}

export interface GridInterface {
    placeShip: (cell: number) => void;
    player: number;
    locations: ShipLocation[];
}

export interface SquareInterface {
    placeShip: (cell: number) => void;
    player: number;
    locations: ShipLocation[];
    cell: number;
    hasShip: boolean;
}
