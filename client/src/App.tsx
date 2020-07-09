import React from 'react';
import './App.scss';
import Employee from './components/employees/employees/Employee';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateEmployee from './components/employees/create-employee/Create-Employee';

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <div className="container m-t-10 content-app">
                    <div className="header col-12">
                        <Link to="/" className="title-page">Employee</Link>
                    </div>
                    <div className="content">
                        <Switch>
							<Route path="/" component={ Employee }  exact/>
							<Route path="/create" component={ CreateEmployee } exact />
						</Switch>
                    </div>
                </div>
            </Router>
            <ToastContainer />
        </div>
    );
}

export default App;
