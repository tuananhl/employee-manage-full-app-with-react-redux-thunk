import * as React from 'react';
import './create-employee.scss';
import { connect } from 'react-redux';
import { EmployeeItem } from '../../../models/employee.model';
import { createNewEmployee } from '../../../store/actions/employeeAction';
import { AppState } from '../../../store/reducers';

class CreateEmployee extends React.Component<any, any> {
    refs: any;

    createEmployee = (e: any) => {
        e.preventDefault();
        const name = this.refs.name.value;
        const email = this.refs.email.value;
        const age = this.refs.age.value;
        const address = this.refs.address.value;
        const data = {
            name, email, age, address
        }
        this.props.createNewEmployee(data);
    }

    componentWillReceiveProps(nextProps: any) {
        if(nextProps.employeeState.total > this.props.employeeState.total) {
            this.refs.name.value = '';
            this.refs.email.value = '';
            this.refs.age.value = '';
            this.refs.address.value = '';
        }
    }

    render () {
        return (
            <div className="m-t-10">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={ e => this.createEmployee(e) } className="form-create">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" ref="name" required/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" ref="email" required/>
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input type="number" className="form-control" ref="age" required/>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" ref="address" required/>
                            </div>
                            <button className="btn btn-secondary save-button">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store: AppState) => {
    return {
        employeeState: store.employeeState
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        createNewEmployee: (data: EmployeeItem) => dispatch(createNewEmployee(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployee);