const inquirer = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');
const cTable = require('console.table');

require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the employees_db database.`)
);

db.connect(err => {
  if (err) throw err;
  mainPrompt();
});

mainPrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Please select one of the following: ',
            name: 'main',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Done'],
        },
    ]) .then((data) => {
        switch(data.main) {
            case 'View all departments':
                showDepartments();
                break;
            case 'View all roles':
                showRoles();
                break;
            case 'View all employees':
                showEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateRole();
                break;
            case 'Done':
                process.exit();
        }
    })
}

addDepartment = () => {
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'dept'
            },
        ]) .then((data) => {
            db.query(`INSERT INTO department(name) VALUES( ? )`, data.dept)
            mainPrompt();
        })
}

addRole = () => {
    db.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the role name?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the salary?',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'Select the department',
                name: 'department_id',
                choices: function () {
                    const choiceArr = res.map(choice => ({name: choice.name, value: choice.id}));
                    return choiceArr;
                },
            }
        ]) .then((data) => {
                db.query(`INSERT INTO role SET ?`, data, function(err) {
                    if (err) throw err;
                    mainPrompt();
                })
            
        })
    })
}

addEmployee = () => {
    db.query(`SELECT * from role`, function(err, res) {
        if (err) throw err;
    db.query(`SELECT * from employee`, function(err2, res2) {
        if (err2) throw err2;
    
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee\'s first name?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is the employee\'s last name?',
            name: 'last_name'
        },
        {
            type: 'list',
            message: 'What is the employee\'s role?',
            name: 'role_id',
            choices: function () {
                const choiceArr = res.map(choice => ({name: choice.title, value: choice.id}));
                return choiceArr;
            }
        },
        {
            type: 'list',
            message: 'Who is the employee\'s manager?',
            name: 'manager_id',
            choices: function () {
                const choiceArr = res2.map(choice => ({name: choice.first_name + ' ' + choice.last_name, value: choice.id}));
                return choiceArr;
            }           
        },
    ]) .then((data) => {
        db.query(`INSERT INTO employee SET ?`, data, function(err) {
            if (err) throw err;
            mainPrompt();
        })
    })
})
})
}

showEmployees = () => {
  db.query(`SELECT * FROM employee`,
  function (err, res) {
    if (err) throw err;
    console.table(res);
    mainPrompt();
  })
}

showDepartments = () => {
  db.query(`SELECT * FROM department`,
  function (err, res) {
    if (err) throw err;
    console.table(res);
    mainPrompt();
  })
}

showRoles = () => {
  db.query(`SELECT * FROM role`,
  function (err, res) {
    if (err) throw err;
    console.table(res);
    mainPrompt();
  })
}

updateRole = () => {
    db.query(`SELECT * from role`, function(err, res) {
        if (err) throw err;
    db.query(`SELECT * from employee`, function(err2, res2) {
        if (err2) throw err2;
    
    inquirer.prompt([
        {
            type: 'list',
            message: 'Who is the employee?',
            name: 'employee_id',
            choices: function () {
                const choiceArr = res2.map(choice => ({name: choice.first_name + ' ' + choice.last_name, value: choice.id}));
                return choiceArr;
            }           
        },
        {
            type: 'list',
            message: 'What is the employee\'s role?',
            name: 'role_id',
            choices: function () {
                const choiceArr = res.map(choice => ({name: choice.title, value: choice.id}));
                return choiceArr;
            }
        },
        
    ]) .then((data) => {
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [data.employee_id, data.role_id], function(err) {
            if (err) throw err;
            mainPrompt();
        })
    })
})
})
}