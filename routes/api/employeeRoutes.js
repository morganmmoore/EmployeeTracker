const router = require('express').Router();
const Employee = require('../../models/employees');

router.get('/', async (req, res) => {
    const employeeData = await Employee.findAll();

    return res.json(employeeData);
});

router.post('/', async (req, res) => {
    const employeeData = await Employee.create(req.body);

    return res.json(bookData);
});

