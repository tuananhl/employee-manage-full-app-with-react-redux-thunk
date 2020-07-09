const Employee = require('./../models/employee.model');
const ResponseData = require('./../utils/response.util');

const createEmployee = async (req, res) => {
    try {
        const body = req.body;
        if(!body.name) {
            throw new Error("Name of Employee can not be empty");
        }
        const employee = new Employee({
            name: body.name,
            email: body.email || null,
            age: body.age || null,
            address: body.address || null
        });
        const result = await employee.save();
        // Check result and return response
        if(result && result._id) {
            return ResponseData.responseData(res, 201, 'Create an employee successful', result);
        } else {
            throw new Error("Some error occurred while creating Employee.");
        }
    } catch(err) {
        return ResponseData.responseData(res, 500, err.message || "Some error occurred while creating Employee.");
    }
}

const updateEmployee = async (req, res) => {
    try {
        const params = req.params;
        if(params && params.employeeId) {
            const result = await Employee.findOneAndUpdate({ _id: params.employeeId }, req.body, { rawResult: true });
            if(!!result.ok) {
                return ResponseData.responseData(res, 200, "Update successfull", Object.assign(result.value, req.body));
            } else {
                throw new Error("Some error occurred while update Employee. ");
            }
        } 
    } catch(err) {
        return ResponseData.responseData(res, 500, err.message || "Some error occurred while update Employee.");
    }
}

const deleteEmployee = async (req,res) => {
    try {
        const params = req.params;
        if(params && params.employeeId) {
            await Employee.findOneAndRemove({ _id: params.employeeId });
            return ResponseData.responseData(res, 200, 'Remove successfull');
        } 
    } catch(err) {
        return ResponseData.responseData(res, 500, err.message || "Some error occurred while retrieving Employee.");
    }
}

const getListEmployees = async (req, res) => {
    try {
        const query = req.query;
        // Check query params and add to condition to get list.
        const find = query && query.offset && query.limit 
                ? Employee.find().skip(+query.offset).limit(+query.limit).sort({ _id: -1 })
                : Employee.find().sort({ _id: -1 });
        const count = Employee.countDocuments();
        const result = await Promise.all([find, count]);
        // Check result and return response
        if(result && result[0] && result[0].length >= 0) {
            return ResponseData.responseData(res, 200, 'Load successfull', { employees: result[0], total: result[1] || 0 });
        } else {
            throw new Error("Some error occurred while retrieving Employee.");
        }
    } catch(err) {
        return ResponseData.responseData(res, 500, err.message || "Some error occurred while retrieving Employee.");
    }
}

const findOneEmployee = async (req, res) => {
    try {
        const params = req.params;
        if(params && params.employeeId) {
            const data = await Employee.findById(params.employeeId)
            if(data && data._id) {
                return ResponseData.responseData(res, 200, 'Load successfull', data)
            } else {
                throw new Error("Some error occurred while retrieving Employee with id" + params.employeeId);
            }
        }
    } catch(err) {
        return ResponseData.responseData(res, 500, err.message || "Some error occurred while retrieving Employee with id" + params.employeeId)
    }
}
module.exports = { createEmployee, updateEmployee, deleteEmployee, getListEmployees, findOneEmployee };