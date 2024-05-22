const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const studentController = require('./controllers/studentController.js');

const pool = require('./secure/connection.js');

 

app.use(bodyParser.json());

// Routes
app.get('/students', studentController.getAllStudents);
app.post('/students', studentController.addStudent);
app.put('/students/:s_id', studentController.updateStudent);
app.patch('/students/:s_id', studentController.partialUpdateStudent);
app.delete('/students/:s_id', studentController.deleteStudent);





//  Sample data
let items = [
  { id: 1, epiphanie: 'Item 1' },
  { id: 2, henriette: 'Item 2' },
  { id: 3, damars: 'Item 3' },
];

// GET request to retrieve all items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST request to create a new item
app.post('/items', (req, res) => {
  const { name } = req.body;
  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT request to update an item
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const index = items.findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    items[index].name = name;
    res.json(items[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE request to delete an item
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    items.splice(index, 1);
    res.json({ message: 'Item deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});









// GET route to fetch and display users in a table format
app.get('/user', (req, res) => {
    try {
      pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error getting MySQL database connection:', err.stack);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        connection.query('SELECT user_id, username, role_id FROM user', (error, results) => {
          connection.release();
          if (error) {
            console.error('Error executing query:', error.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          res.json(results);
        });
        
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


app.get('/', (req, res) => {
    res.send('Hello itangishaka!How Are You Doing?');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
