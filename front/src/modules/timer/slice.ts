import { createSlice } from "@reduxjs/toolkit";
import { TimerStatus } from "../../constants/timerStatus"

const initialState = {
    state: TimerStatus.INITIAL,
    startTime: new Date().getTime(),
    milliseconds: 0
};

const slice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        abortTimer: (state, action) => {
            state.state = TimerStatus.ABORT;
        },
        startTimer: (state, action) => {
            state.startTime = new Date().getTime();
            state.state = TimerStatus.WORKING;
        },
        resetTimer: (state, action) => {
            state.state = TimerStatus.RESETTING;
            state.milliseconds = 0;
        },
        stopTimer: (state, action) => {
            state.state = TimerStatus.FINISH;
            state.milliseconds = new Date().getTime() - state.startTime;
        },
    }
});
export const actions = {
    ...slice.actions
};
export default slice.reducer;
