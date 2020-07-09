const mongoose = require('mongoose');
const EmployeeSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    address: String
}, {
    timestamps: true
});

module.exports = mongoose.model('employees', EmployeeSchema);