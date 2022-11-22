type Stage = "start" | "arrangement" | "game" | "winner";

type ShipLocation = { player: 1 | 2; cell: number };

type result = null | "missed" | "killed";

type attack = {
    player: 1 | 2;
    cell: number;
    result: result;
};

export default interface State {
    stage: Stage;
    currentPlayer: 1 | 2;
    locations: ShipLocation[];
    startMove: boolean;
    isSelected: boolean;
    result: result;
    attacks: attack[];
    winner: 0 | 1 | 2;
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

export interface GameSquareGridInterface {
    field: "my" | "enemy";
    cell: number;
    locations: ShipLocation[];
    player: number;
    selectCell?: (cell: number) => void;
    isSelected?: boolean;
    attack?: attack;
    result?: result;
}

export interface GameGridInterface {
    field: "my" | "enemy";
    locations: ShipLocation[];
    player: number;
    selectCell?: (cell: number) => void;
    attacks?: attack[];
    isSelected?: boolean;
    result?: result;
}

export interface GameInterface {
    startMove: () => void;
    hasStarted: boolean;
    player: number;
    locations: ShipLocation[];
    attacks: attack[];
    selectCell: (cell: number) => void;
    isSelected: boolean;
    attack: () => void;
    result: result;
    endTurn: () => void;
}

export interface WinnerInterface {
    winner: 0 | 1 | 2;
}
