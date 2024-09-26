//  OK   POST /create: Endpoint para crear una tarea.
//  OK   GET /: Endpoint para traer todas las tareas.
//  OK  GET /id/:_id: Endpoint para buscar tarea por id.
//  OK  PUT /markAsCompleted/:_id: Endpoint para marcar una tarea como completada.
//  OK  PUT /id/:_id: Endpoint para actualizar una tarea y que solo se pueda cambiar el título de la tarea. Es decir, que no me deje cambiar el campo “completed” desde este endpoint, sino solo, el título.
//  OK  DELETE /id/:_id: Endpoint para eliminar una tarea.

const express = require("express");
const router = express.Router();
const Task = require("../models/Task"); 

//Crear usuario
router.post("/create", async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "error al crear la tarea" });
    }
});


//Obtener usuarios
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "error al obtener la lista de tareas" });
    }
});


//traer tarrea por id
router.get("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        
        if (!task) {
            return res.status(404).send({ message: "Tarea no encontrada" });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al obtener la tarea" });
    }
});

//marcar la tarea completada
router.put("/markAsCompleted/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndUpdate(
            taskId, 
            { completed: true },
            { new: true }
        );

        if (!task) {
            return res.status(404).send({ message: "Tarea no encontrada" });
        }

        res.status(200).json({ message: "Tarea marcada como completada", task });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al marcar la tarea como completada" });
    }
});


//cambiar solo el title de la tarea
router.put("/id/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title } = req.body;

        if (!title) {
            return res.status(400).send({ message: "El título de la tarea es requerido" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).send({ message: "Tarea no encontrada" });
        }

        res.status(200).json({ message: "Título de la tarea actualizado" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al actualizar el título de la tarea" });
    }
});

//borrar tarea
router.delete("/id/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).send({ message: "Tarea no encontrada" });
        }

        res.status(200).json({ message: "Tarea eliminada con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al eliminar la tarea" });
    }
});




module.exports = router;
