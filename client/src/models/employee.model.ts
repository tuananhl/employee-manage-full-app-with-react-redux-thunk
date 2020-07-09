export interface EmployeeItem {
    _id: string;
    name: string;
    email: string;
    age: number;
    address: string;
}
export interface EmployeeState {
    employees: EmployeeItem[],
    total: number;
    needToReload: boolean;
}

export interface EmployeeComponentState {
    handleAction: string | null;
    currentItem: EmployeeItem | null;
    currentPage: number;
}