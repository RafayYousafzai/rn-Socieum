import { all, fork } from "redux-saga/effects";
import saga from "./saga";

export default function* rootSaga() {
  yield all([fork(saga)]);
}
