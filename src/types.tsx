type stage = "start" | "arrangement" | "game" | "winner";

export default interface State {
    stage: stage;
}
