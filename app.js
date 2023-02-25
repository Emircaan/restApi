const express = require('express');
const app = express();
app.use(express.json());


let tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
  { id: 3, title: 'Task 3', completed: false }
];


app.get('/api/tasks', (req, res) => {
    res.json(tasks);


  
});
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    
    if (!task) {
      return res.status(404).send('Görev bulunamadı');
    }
    
    res.json(task);
  });


app.post('/api/tasks', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
  const task = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };

  tasks.push(task);

  res.json(task);
});


app.put('/api/tasks/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
  const task = tasks.find(t => t.id === parseInt(req.params.id));

  if (!task) return res.status(404).send('Görev bulunamadı.');

  task.title = req.body.title;

  res.json(task);
});


app.delete('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));

  if (!task) return res.status(404).send('Görev bulunamadı.');

  const index = tasks.indexOf(task);
  tasks.splice(index, 1);

  res.json(task);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Port ${port} üzerinde dinleniyor...`));
