const Employees = require('./../controllers/employee.controller');

module.exports = (app) => {
    // Router for employees
    app.get('/employees', Employees.getListEmployees);
    app.post('/employee', Employees.createEmployee);
    app.put('/employee/:employeeId', Employees.updateEmployee);
    app.get('/employee/:employeeId', Employees.findOneEmployee);
    app.delete('/employee/:employeeId', Employees.deleteEmployee);
}