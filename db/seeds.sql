use employees_db;

INSERT into department (name) VALUES ('Sales');
INSERT into department (name) VALUES ('Engineering');
INSERT into department (name) VALUES ('Finance');
INSERT into department (name) VALUES ('Legal');

INSERT into role (title, salary, department_id) VALUES ('Sales Lead', 80000, 1);
INSERT into role (title, salary, department_id) VALUES ('Lead Engineer', 150000, 2);
INSERT into role (title, salary, department_id) VALUES ('Software Engineer', 120000, 2);
INSERT into role (title, salary, department_id) VALUES ('Accountant', 100000, 3);
INSERT into role (title, salary, department_id) VALUES ('Laywer', 110000, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Fred', 'Greene', 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Gretchen', 'Johnson', 1, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Erin', 'Vasquez', 1, 1);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Richards', 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Karen', 'Smith', 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Josh', 'Willis', 4, 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Baldwin', 2, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Robert', 'Roberts', 2, 2);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Jessica', 'Wilson', 3, 2);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Kelly', 'Robinson', 4, null);
