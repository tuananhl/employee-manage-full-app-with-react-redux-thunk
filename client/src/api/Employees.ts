import { client, getUrl } from './Axios';
import { EmployeeItem } from '../models/employee.model';
import { AppConstant } from '../utils/constant';

export const getEmployees = async (offset: number = 0, limit: number = AppConstant.intemPerpage): Promise<any> => {
    const url = getUrl(`/employees`, `offset=${ offset }`, `limit=${ limit }`);
    const response = await client.get<any>(url);
    return response;
}

export const addNewEmployee = async (data: any): Promise<any> => {
    const url = getUrl(`/employee`);
    const response = await client.post<any>(url, data);

    return response;
}

export const deleteEmployee = async (employeeId: string | number): Promise<any> => {
    const url = getUrl(`/employee/${ employeeId }`);
    return await client.delete<any>(url);
}

export const updateEmployee = async (emplyeeId: string | number, data: EmployeeItem): Promise<any>  => {
    const url = getUrl(`/employee/${ emplyeeId }`);
    return await client.put<any>(url, data);
}

export const createEmployee = async (data: EmployeeItem): Promise<any> => {
    const url = getUrl(`/employee`);
    return await client.post<any, any>(url, data);
}