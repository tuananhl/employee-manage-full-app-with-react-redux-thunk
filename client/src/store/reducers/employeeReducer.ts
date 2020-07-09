import { EmployeeActionType } from "../actions/employeeAction";
import { EmployeeState, EmployeeItem } from "../../models/employee.model";

const inititalState: EmployeeState = {
    employees: [],
    total: 0,
    needToReload: false
}

export const employeeReducer = (state: EmployeeState = inititalState, action: any) => {
    switch(action.type) {
        case EmployeeActionType.LOAD_LIST_EMPLOYEES_SUCCESS : {
            return {
                ...state,
                employees: action.payload.data,
                total: action.payload.total,
                needToReload: false
            }
        }
        case EmployeeActionType.DELETE_AN_EMPLOYEE_SUCCESS : {
            return {
                ...state,
                errorMessage: action.payload.message,
                needToReload: true
            }
        }
        case EmployeeActionType.UPDATE_AN_EMPLOYEE_SUCCESS: {
            const { itemId, data } = action.payload;
            const newEmployees = state.employees.map((item: EmployeeItem) => {
                if(item._id === itemId) {
                    item = data.data;
                }

                return item;
            });

            return {
                ...state,
                employees: newEmployees,
                needToReload: false
            }
        }
        case EmployeeActionType.CREAT_AN_EMPLOYEE_SUCCESS: {
            return {
                ...state,
                total: state.total + 1,
                needToReload: true
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}