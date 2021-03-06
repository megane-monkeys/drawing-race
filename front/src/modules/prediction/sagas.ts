import { actions } from "./slice";
import axios from "axios"
import { put, call, select, takeLatest } from 'redux-saga/effects';
import { Endpoints } from "../../constants/endpoints";
import {predictionSelectors} from "../../modules/prediction";

const fetchAnswersAjax = () => {
    return (axios.get(Endpoints.answer,
    )
        .then((res) => {
            const data = res.data;
            return { data }
        })
        .catch((error) => {
            return { error }
        }));

};

function* fetchAnswers() {
    const { data, error } = yield call(fetchAnswersAjax);
    if (data) {
        yield put(actions.setAnswers(data));
        const { answers } = yield select(predictionSelectors);
        yield put(actions.setAnswer(answers[0]));
    } else {
        console.log(error);
    }
}

const fetchPredictionAjax = (strokes: number[][][]) => {
    return (axios.post(Endpoints.prediction,
        strokes
)
        .then((res) => {
            const data = res.data;
            return { data }
        })
        .catch((error) => {
            return { error }
        }));

};

function* fetchPrediction(action: ReturnType <typeof actions.fetchPrediction>) {
    const strokes = action.payload;
    const { data, error } = yield call(fetchPredictionAjax, strokes);
    if (data) {
        yield put(actions.setPrediction(data.label));
    } else {
        console.log(error);
    }
}
export const sagas = [
    takeLatest(actions.fetchAnswers.toString(), fetchAnswers),
    takeLatest(actions.fetchPrediction.toString(), fetchPrediction)
];

