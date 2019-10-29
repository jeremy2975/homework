create table departments(
	dept_no VARCHAR PRIMARY KEY,
	dept_name VARCHAR
);

create table employees(
	emp_no VARCHAR PRIMARY KEY, 
	birth_date DATE,
	first_name VARCHAR,
	last_name VARCHAR,
	gender VARCHAR(5),
	hire_date DATE
);

CREATE Table dept_emp(
	emp_no VARCHAR,
	FOREIGN KEY(emp_no) REFERENCES employees(emp_no),
	dept_no VARCHAR,
	FOREIGN KEY(dept_no) REFERENCES departments(dept_no),
	from_date DATE,
	to_date DATE
);

CREATE TABLE dept_manager(
	dept_no VARCHAR,
	FOREIGN KEY(dept_no) REFERENCES departments(dept_no),
	emp_no VARCHAR,
	FOREIGN KEY(emp_no) REFERENCES employees(emp_no),
	from_date DATE,
	to_date DATE
);


CREATE TABLE salaries(
	emp_no VARCHAR,
	FOREIGN KEY(emp_no) REFERENCES employees(emp_no),
	salary INT,
	from_date DATE,
	to_date DATE
);

CREATE TABLE titles(
	emp_no VARCHAR,
	FOREIGN KEY(emp_no) REFERENCES employees(emp_no),
	title VARCHAR,
	from_date DATE,
	to_date DATE
);

select * from employees

-- All employees showing their employee number salary last name first name and gender
SELECT employees.emp_no, salaries.salary, employees.last_name, employees.first_name, employees.gender
from salaries
INNER JOIN employees ON
employees.emp_no = salaries.emp_no;

select * from employees
--List of employees who were hired in 1986
select hire_date, emp_no, first_name, last_name
from employees
where YEAR(hire_date) = 1982

select * from employees


--list of manager of each department 
select employees.first_name, employees.last_name,departments.dept_name, dept_manager.emp_no, dept_manager.from_date, dept_manager.to_date
from dept_manager
INNER JOIN employees ON 
employees.emp_no = dept_manager.emp_no
INNER JOIN departments ON 
dept_manager.dept_no = departments.dept_no;

--list of each employee
select employees.emp_no, employees.last_name, employees.first_name, departments.dept_name 
from employees
INNER JOIN dept_emp ON 
employees.emp_no = dept_emp.emp_no
INNER JOIN departments ON 
departments.dept_no = dept_emp.dept_no;

-- List of all employees whose first name is Hercules and last name begin with "B"
select first_name, last_name
from employees
where first_name = 'Hercules' and last_name LIKE 'B%';

--List of all employees in the Sales department
select employees.emp_no, employees.last_name, employees.first_name, departments.dept_name 
from departments
INNER JOIN dept_emp ON 
departments.dept_no = dept_emp.dept_no
INNER JOIN employees ON 
employees.emp_no = dept_emp.emp_no 
where dept_name = 'Sales';

--List of al lemployees in the Sales and Development departments
select employees.emp_no, employees.last_name, employees.first_name, departments.dept_name 
from departments
INNER JOIN dept_emp ON 
departments.dept_no = dept_emp.dept_no
INNER JOIN employees ON 
employees.emp_no = dept_emp.emp_no 
where dept_name = 'Sales' or dept_name = 'Development';


--List of the frequency count of employees last names. 
select last_name, count(last_name) as name_count from employees
group by last_name
order by name_count desc;



