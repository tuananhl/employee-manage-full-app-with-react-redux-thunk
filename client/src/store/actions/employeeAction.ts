import { EmployeeItem } from '../../models/employee.model';
import { getEmployees, deleteEmployee, updateEmployee, createEmployee } from '../../api/Employees';
import { toast } from 'react-toastify';
import { AppConstant } from '../../utils/constant';

export enum EmployeeActionType {
    LOAD_LIST_EMPLOYEES = "[Employee] Load list employee",
    LOAD_LIST_EMPLOYEES_SUCCESS = "[Employee] Load list employee success",
    LOAD_LIST_EMPLOYEES_FAILURE = "[Employee] Load list employee failure",
    CREAT_AN_EMPLOYEE = "[Employee] Create new an employee",
    CREAT_AN_EMPLOYEE_SUCCESS = "[Employee] Create new an employee success",
    CREAT_AN_EMPLOYEE_FAILURE = "[Employee] Create new an employee failure",
    DELETE_AN_EMPLOYEE = "[Employee] Delete an employee",
    DELETE_AN_EMPLOYEE_SUCCESS = "[Employee] Delete an employee success",
    DELETE_AN_EMPLOYEE_FAILURE = "[Employee] Delete an employee failure",
    UPDATE_AN_EMPLOYEE = "[Employee] Update an employee",
    UPDATE_AN_EMPLOYEE_SUCCESS = "[Employee] Update an employee success",
}

export const loadListEmployee = (payload: { offset:number, limit: number }) => {
    return async (dispatch?: any) => {
        const result: any = await getEmployees(payload.offset, payload.limit);
        if(result && result.data && result.data.data && result.data.status === 200) {
            dispatch(loadListEmployeeSuccess(result.data.data.employees, result.data.data.total));
        } else {
            dispatch(loadListEmployeeFailure(result.message));
        }
    }
}


export const loadListEmployeeSuccess = (data: EmployeeItem[], total: number) => ({
    type: EmployeeActionType.LOAD_LIST_EMPLOYEES_SUCCESS,
    payload: {
        data,
        total
    }
});

export const loadListEmployeeFailure = (err: any) => ({
    type: EmployeeActionType.LOAD_LIST_EMPLOYEES_FAILURE,
    payload: {
        err
    }
});

export const deleteAnEmployee = (employeeId: string | number, currentPage: number) => {
    return async (dispatch: any, getState: any) => {
        const result: any = await deleteEmployee(employeeId);
        if(result && result.status === 200) {
            toast.success('Remove successfull !', {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(deleteEmployeeSuccess(currentPage));
        } else {
            dispatch(deleteEmployeeFailure(result.message));
        }
    }
}

export const deleteEmployeeSuccess = (currentPage: number) => {
    return async (dispatch?: any) => {
        dispatch(loadListEmployee({ offset: (currentPage - 1) * AppConstant.intemPerpage, limit: AppConstant.intemPerpage }));
    }
}

export const deleteEmployeeFailure = (message: string | null) => ({
    type: EmployeeActionType.DELETE_AN_EMPLOYEE_FAILURE,
    payload: {
        message
    }
})

export const updateAnEmployee = (itemId: number | string, data: EmployeeItem) => {
    return async (dispatch?: any) => {
        const result = await updateEmployee(itemId, data);
        if(result && result.status === 200 && result.data) {
            toast.success('Update successfull !', {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(updateAnEmployeeSuccess(itemId, result.data));
        } else {
            toast.error('Update Fail. Please try or check again !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
}

export const updateAnEmployeeSuccess = (itemId: number | string, data: EmployeeItem) => ({
    type: EmployeeActionType.UPDATE_AN_EMPLOYEE_SUCCESS,
    payload: {
        data,
        itemId
    }
});

export const createNewEmployee = (data: EmployeeItem) => {
    return async (dispatch?: any) => {
        const result: any = await createEmployee(data);
        if(result && result.status === 201 && result.data) {
            toast.success('Create successfull !', {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(createEmployeeSuccess(result.data));
        }
    }
}

export const createEmployeeSuccess = (data: EmployeeItem) => ({
    type: EmployeeActionType.CREAT_AN_EMPLOYEE_SUCCESS,
    payload: {
        data
    }
})