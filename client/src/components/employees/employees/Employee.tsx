import * as React from 'react';
import { loadListEmployee, deleteAnEmployee, updateAnEmployee } from '../../../store/actions/employeeAction';
import { connect } from 'react-redux';
import { EmployeeItem, EmployeeComponentState } from './../../../models/employee.model';
import employeeIcon from './../../../assets/employee.png';
import deleteIcon from './../../../assets/delete.png';
import editIcon from './../../../assets/edit.png';
import Modal from 'react-bootstrap/Modal';
import './employee.scss';
import { Link } from 'react-router-dom';
import DeleteEmployee from '../delete-employee/delete-emloyee';
import EditEmployee from '../edit-employee/Edit-Employee';
import Pagination from '../../../shared/pagination/Pagination';
import { AppConstant } from '../../../utils/constant';
import { AppState } from '../../../store/reducers';

class Employee extends React.Component<any, EmployeeComponentState> {
    state: EmployeeComponentState = {
        handleAction: null,
        currentItem: null,
        currentPage: 0
    }

    constructor(props: any) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.setState({ currentPage: this.getParamsPageInRoute(this.props.location.search) })
    }

    getParamsPageInRoute(locationSearch: any): number {
        const search = new URLSearchParams(locationSearch);
        const result = search.get('page');
        return result && typeof +result === 'number' ?  +result : 1
    }

    handleRouteParamPageChange() {
        const resultPage = this.getParamsPageInRoute(this.props.location.search);
        this.setState({ currentPage: resultPage });
    }

    handleActionWithModal(item: EmployeeItem, modalItem: string): void {
        if(this.state.handleAction !== modalItem) {
            this.setState({ handleAction: modalItem });
            this.setState({ currentItem: item })
        }
    }

    closeModal(): void {
        this.setState({ handleAction: null, currentItem: null });
    }

    renderListEmployees(employees: Array<EmployeeItem>): any {
        return employees.map((item: EmployeeItem, key: number) => {
            return (
                <React.Fragment key={key}>
                    <div className="col-md-4 employee-item">
                        <div className="card">
                            <img className="card-img-top" src={ employeeIcon } alt="Avatar" />
                            <h5 className="card-title text-center">{ item.name }</h5>
                            <div className="card-body">
                                <h5>Age: { item.age }</h5>
                                <h5>Email: { item.email }</h5>
                                <h5>Address: { item.address }</h5>
                                <div className="float-right list-input-action">
                                    <button onClick={ () => this.handleActionWithModal(item, 'delete') }><img style={{ width: '40px', border: 'thin solid black', borderRadius: '5px' }} src={ deleteIcon } alt="Delete" /></button>
                                    <button onClick={ () => this.handleActionWithModal(item, 'update') }><img style={{ width: '40px', border: 'thin solid black', borderRadius: '5px' }} src={ editIcon } alt="Edit" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        })
    }

    renderModalEdit(): any {
        return (
            <Modal
                onHide={ this.closeModal }
                show={this.state.handleAction === "update"}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <EditEmployee
                        employee={ this.state.currentItem }
                        updateEmployee={ this.props.updateEmployee.bind(this) }
                        closeModal={ () => this.closeModal() }
                    >
                    </EditEmployee>
                </Modal.Body>
            </Modal>
        );
    }

    renderModalDelete(): any {
        const itemId: any = this.state.currentItem && this.state.currentItem._id ? this.state.currentItem._id : null;
        return (
            <Modal
                onHide={ this.closeModal }
                show={ this.state.handleAction === "delete" && this.state.currentItem !== null }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <DeleteEmployee
                        removeEmployee={ () => this.props.removeEmployee(itemId, this.state.currentPage) }
                        closeModal={ () => this.closeModal() }
                    >
                    </DeleteEmployee>
                </Modal.Body>
            </Modal>
        );
    }

    changePageCurrent(page: number): void {
        this.setState({ currentPage: page });
    }

    loadListEmployees(page: number) {
        this.props.loadList((page - 1) * AppConstant.intemPerpage, AppConstant.intemPerpage);
    }

    render(): any {
        return (
            <div className="employees">
                <Link to="/create" className="create-new">
                    + Create New
                </Link>
                <div className="row m-0">
                    { this.renderListEmployees(this.props.employeeState.employees || null) }
                    { this.renderModalEdit() }
                    { this.renderModalDelete() }
                </div>
                <div className="row m-0">
                    <Pagination
                        total={ this.props.employeeState.total }
                        changePageCurrent={ this.changePageCurrent.bind(this) }
                        loadListEmployees={ this.loadListEmployees.bind(this) }
                        currentPage={ this.state.currentPage }
                        needToReload={ this.props.employeeState }
                        totalPage={ Math.ceil(this.props.employeeState.total / AppConstant.intemPerpage) }
                    >
                    </Pagination>
                </div>
            </div> 
        );
    }
}

const mapStateToProps = (store: AppState): any => {
    return {
        employeeState: store.employeeState
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadList: (offset: number, limit: number) => dispatch(loadListEmployee({ offset, limit })),
        removeEmployee: (employeeId: string | number, currentPage: number) => dispatch(deleteAnEmployee(employeeId, currentPage)),
        updateEmployee: (employeeId: string | number, data: EmployeeItem) => dispatch(updateAnEmployee(employeeId, data))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Employee);