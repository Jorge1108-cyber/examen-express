const Express=require("express")
const Cors=require("cors")

const app=Express()
app.use(Cors())
app.use(Express.json())

// Tu código va desde aquí ⬇️

const tasks = [  
    {  
        id: 1,  
        title: "Lavar ropa",  
        description: "Lavar ropa con agua y jabón",  
        completed: true,  
    },  
    {  
        id: 2,  
        title: "Doblar ropa",  
        description: "Doblar las prendas de ropa de manera ordenada",  
        completed: false,  
    },  
    {  
        id: 3,  
        title: "Preparar comida",  
        description: "Buscar la receta para prepararla",  
        completed: true,  
    },  
  ];  
  
  app.get('/', (req, res) => {  
    res.send('Node Js API');  
  });  
  
  app.get('/api/tasks', (req, res) => {  
    res.send(tasks);  
  });  
  
  app.get('/api/tasks/:id', (req, res) => {  
    const task = tasks.find(c => c.id === parseInt(req.params.id));  
    if (!task) return res.status(404).send('Tarea no encontrada');  
    res.send(task);  
  });  
  
  app.post('/api/tasks', (req, res) => {  
    const task = {  
        id: tasks.length + 1,  
        title: req.body.title,  
        description: req.body.description,  
        completed: req.body.completed === 'true'  
    };  
    tasks.push(task);  
    res.status(201).send(task);  
  });  
  
  app.put('/api/tasks/:id', (req, res) => {  
    const taskIndex = tasks.findIndex(c => c.id === parseInt(req.params.id));  
    if (taskIndex === -1) return res.status(404).send('Tarea no encontrada');  
  
    // Actualizamos la tarea  
    const updatedTask = {  
        id: tasks[taskIndex].id,  
        title: req.body.title || tasks[taskIndex].title, // Mantiene el valor existente si no se proporciona uno nuevo  
        description: req.body.description || tasks[taskIndex].description,  
        completed: req.body.completed === 'true' || tasks[taskIndex].completed  
    };  
  
    tasks[taskIndex] = updatedTask; // Reemplaza la tarea existente con la actualizada  
    res.send(updatedTask); // Devuelve la tarea actualizada  
  });  
  
  app.delete('/api/tasks/:id', (req, res) => {  
    const taskIndex = tasks.findIndex(c => c.id === parseInt(req.params.id));  
    if (taskIndex === -1) return res.status(404).send('Tarea no encontrada');  
    
    const removedTask = tasks.splice(taskIndex, 1);  
    res.send(removedTask);  
  }); 
  

// Hasta aquí ⬇⬆️

module.exports={app}
