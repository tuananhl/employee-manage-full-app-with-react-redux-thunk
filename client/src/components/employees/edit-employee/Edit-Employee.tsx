import * as React from 'react';

export default class EditEmployee extends React.Component<any, any> {
    refs: any;

    editEmployee = (e: any) => {
        e.preventDefault();
        const name = this.refs.name.value;
        const email = this.refs.email.value;
        const age = this.refs.age.value;
        const address = this.refs.address.value;
        const data = {
            name, email, age, address
        }
        
        this.props.updateEmployee(this.props.employee._id, data);
        this.props.closeModal();
    }

    render(): any {
        return (
            <div className="m-t-10">
                <h1 className="text-center">Edit Employee</h1>
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={ e => this.editEmployee(e) }>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" ref="name" defaultValue={this.props.employee?this.props.employee.name:''} required/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" ref="email" defaultValue={this.props.employee?this.props.employee.email:''} required/>
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input type="number" className="form-control" ref="age" defaultValue={this.props.employee?this.props.employee.age:''} required/>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" ref="address" defaultValue={this.props.employee?this.props.employee.address:''} required/>
                            </div>
                            <button className="btn btn-secondary save-button" type="submit">Save</button>{' '}
                            <button type="button" onClick={ () => this.props.closeModal() } className="btn btn-danger save-button" >Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}