import { combineReducers } from 'redux';
import { employeeReducer } from './employeeReducer';
const reducer = combineReducers({
    employeeState: employeeReducer
});

export type AppState = ReturnType<typeof reducer>;

export default reducer;