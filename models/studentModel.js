// Import required module
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'bfs6q4ldshqguxgwtnmj-mysql.services.clever-cloud.com',
    user: 'uglkzhrissceuzk4',
    password: 'j2XjJo2i7icepkRxtkFJ',
    database: 'bfs6q4ldshqguxgwtnmj'
});

// Function to get all students from the database
exports.getAllStudents = (callback) => {
    pool.query('SELECT * FROM students', (error, results, fields) => {
        if (error) {
            console.error('Error retrieving studennts:', error);
            callback(error, null);
            return;
        }

        callback(null, results);
    });
};

// Function to add a new student to the database
exports.addStudent = (s_name, reg_no, callback) => {
    pool.query('INSERT INTO students (s_name, reg_no) VALUES (?, ?)', [s_name, reg_no], (error, results, fields) => {
        if (error) {
            console.error('Error adding student:', error);
            callback(error, null);
            return;
        }

        callback(null, 'Student added successfully');
    });
};

// Function to update a student in the database
exports.updateStudent = (s_id, s_name, reg_no, callback) => {
    pool.query('UPDATE students SET s_name = ?, reg_no = ? WHERE s_id = ?', [s_name, reg_no, s_id], (error, results, fields) => {
        if (error) {
            console.error('Error updating student:', error);
            callback(error, null);
            return;
        }

        callback(null, 'Student updated successfully');
    });
};

// Method to partially update a student
exports.partialUpdateStudent = (s_id, updatedFields, callback) => {
    // Construct the SQL query to update the student record
    let query = 'UPDATE students SET ';
    const values = [];
    
    // Iterate over the updatedFields object and build the SET clause of the query
    Object.keys(updatedFields).forEach((key, index) => {
        query += `${key} = ?`;
        values.push(updatedFields[key]);
        
        // Add comma if it's not the last field
        if (index < Object.keys(updatedFields).length - 1) {
            query += ', ';
        }
    });

    // Add the WHERE clause to specify the student ID
    query += ' WHERE s_id = ?';
    values.push(s_id);

    // Execute the query
    pool.query(query, values, (error, results, fields) => {
        if (error) {
            // If an error occurs, invoke the callback with the error
            callback(error);
            return;
        }

        // If the update is successful, invoke the callback with null for the error
        callback(null, 'Student updated successfully');
    });
};

// Function to delete a student from the database
exports.deleteStudent = (s_id, callback) => {
    pool.query('DELETE FROM students WHERE s_id = ?', [s_id], (error, results, fields) => {
        if (error) {
            console.error('Error deleting student:', error);
            callback(error, null);
            return;
        }

        callback(null, 'Student deleted successfully');
    });
};
