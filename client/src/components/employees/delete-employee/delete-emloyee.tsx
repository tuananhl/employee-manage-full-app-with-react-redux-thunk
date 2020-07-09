import * as React from 'react';
import './delete-employee.scss';

export default class DeleteEmployee extends React.Component<any, any> {

    render(): any {
        return (
            <React.Fragment>
                <div className="container delete-employee">
                    <div className="title-modal-delete">Do you want to delete this employee?</div>
                    <div className="list-button-action">
                        <button className="delete" onClick={ () => { this.props.removeEmployee(); this.props.closeModal() } }>Delete</button>
                        <button className="cancel" onClick={ () => this.props.closeModal() }>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}