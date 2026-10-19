const fs = require('fs');
const Task = require('../models/task');
let tasks = JSON.parse(fs.readFileSync('./database/tasks.json'));
let users = JSON.parse(fs.readFileSync('./database/users.json'));

exports.authTasksMiddleware = (req, res, next) =>
{
    try
    {
        let pwd = req.get('x-auth');
        if (!pwd)
        {
            return res.status(401).send("Did not provide password");
        }

        let id_user = req.body.id_user;
        if (!id_user)
        {
            return res.status(400).send("ID user is required");
        }

        let user = users.find(u => String(u.id) === String(id_user));
        if (!user)
        {
            return res.status(404).send("User Not Found");
        }

        if (user.password !== pwd)
        {
            return res.status(401).send("Wrong Password");
        }

        req.user = user;
        next();
    } catch (err)
    {
        return res.status(400).send(err.message);
    }
}

exports.authTasksMiddleware2 = (req, res, next) =>
{
    try
    {
        let pwd = req.get('x-auth');
        if (!pwd)
        {
            return res.status(401).send("Did not provide password!");
        }

        let found_user = users.find(u => String(u.password) === pwd);
        if (!found_user)
        {
            return res.status(404).send("User Not Found");
        }

        req.user = found_user;
        next();
    } catch (err)
    {
        return res.status(400).send(err.message);
    }
}

exports.registerTask = (req, res) =>
{
    try
    {
        let title = req.body.title;
        let description = req.body.description;
        let due_date = req.body.due_date;
        let status = req.body.status;
        let tags = req.body.tags;
        
        if (!title)
        {
            return res.status(400).send("Task must have a title");
        }

        if (tags !== undefined && !Array.isArray(tags))
        {
            return res.status(400).send("Tags must be an array!");
        }

        let new_task_desc = description || "Non-Descript Description";
        let new_task_due_date = due_date ? new Date(due_date) : new Date();
        let new_task_status = status || 'A';
        let new_task_tags = tags || [];

        let new_task = new Task(title, new_task_desc, new_task_due_date, req.user.id, new_task_status, new_task_tags);

        tasks.push(new_task.toObj());
        fs.writeFileSync('./database/tasks.json', JSON.stringify(tasks, null, 2));
        res.send("Task Added");
    } catch (err)
    {
        return res.status(400).send(err.message);
    }
}

exports.tasksPage = (req, res) =>
{
    try
    {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);

        let user_tasks = tasks.filter(t => String(t.id_user) === String(req.user.id));

        let start = (page-1) * limit;
        let end = start + limit;

        res.json
        ({
            page: page,
            next_page: page+1,
            limit: limit,
            total: tasks.length,
            data: user_tasks.slice(start, end)
        });
    } catch (err)
    {
        return res.status(400).send(err.message);
    }
}

exports.getTaskFromId = (req, res) =>
{
    try
    {
        let found_task = tasks.find(t => String(t.id_user) === String(req.user.id) && String(t.id) === req.params.id);

        if (!found_task)
        {
            return res.status(404).send("Task Not Found");
        }

        res.json(found_task);
    } catch (err)
    {
        return res.status(400).send(err.message);
    }
}

exports.patchTask = (req, res) =>
{
    try
    {
        let body = req.body;
        let fields = ["title", "description", "due_date", "status", "tags"];

        let valid_changes = {};

        for (const i of fields)
        {
            if (i in body)
            {
                valid_changes[i] = body[i];
            }
        }

        if (Object.keys(valid_changes).length === 0)
        {
            return res.status(400).send("No valid fields were given");
        }

        let position = tasks.findIndex(t => String(t.id) === req.params.id && String(t.id_user) === String(req.user.id));
        if (position === -1)
        {
            return res.status(404).send("Task Not Found");
        }

        let new_task_data = {...tasks[position], ...valid_changes};
        let new_task = new Task(new_task_data.title, new_task_data.description, new_task_data.due_date, new_task_data.id_user, new_task_data.status, new_task_data.tags);

        let updated_task = {...new_task.toObj(), id: tasks[position].id};

        let updated_tasks = [...tasks];
        updated_tasks[position] = updated_task;

        fs.writeFileSync('./database/tasks.json', JSON.stringify(updated_tasks, null, 2));
        tasks = updated_tasks;

        res.json
        ({
            message: "Task updated successfully",
            task: updated_task
        })
    } catch (err)
    {
        return res.status(400).send(err.message);
    }
}

exports.removeTask = (req, res) =>
{
    try
    {
        let position = tasks.findIndex(t => String(t.id) === req.params.id && String(t.id_user) === String(req.user.id));
        if (position === -1)
        {
            return res.status(404).send("Task Not Found");
        }
        let removed_task = {...tasks[position]};
        let updated_tasks = tasks.filter(t => String(t.id) !== req.params.id);

        fs.writeFileSync('./database/tasks.json', JSON.stringify(updated_tasks, null, 2));
        tasks = updated_tasks;

        res.json
        ({
            message: `Task with ID ${req.params.id} was deleted!`,
            task: removed_task
        });
    } catch (err)
    {
        return res.status(400).send(err.message);
    }
}

function createTask(title, description, due_date, owner, status, tags)
{
    let new_task = new Task(title, description, due_date, owner, status, tags);
    data.tasks.push(new_task);
}

function getTaskById(id)
{
    let found_task = data.tasks.find(elem => elem.id === id);
    if (found_task)
    {
        return found_task;
    } else return "404 - Task Not Found";
}

function searchTasks(attribute, value)
{
    if (!(attribute in Task.prototype))
    {
        throw new TaskException("Attribute does not exist");
    }

    if (attribute === "due_date")
    {
        if (isNaN(new Date(value).getTime()))
        {
            throw new TaskException("Invalid date.")
        }
        return data.tasks.filter(task => task.due_date.getTime() === new Date(value).getTime());
    }

    if (attribute === "description")
    {
        return data.tasks.filter(task => task.description.includes(value) === true);
    }

    return data.tasks.filter(task => task[attribute] === value);
}

function getAllTasks()
{ return data.tasks; }

function updateTask(id, obj_new_info)
{
    let task = data.tasks.find(elem => elem.id === id);
    if (!task)
    {
        throw new TaskException("Task not found!");
    }

    let res = false;
    for (const [attribute, value] of Object.entries(obj_new_info))
    {
        if (attribute in task)
        {
            task[attribute] = value;
            res = true;
        }
    }

    if (!res)
    {
        throw new TaskException("No changes were made");
    }

    return res;
}

function deleteTask(id)
{
    let found_task = data.tasks.find(elem => elem.id === id)
    if (found_task)
    {
        data.tasks = data.tasks.filter(elem => elem.id !== id);
    } else throw new TaskException("Task does not exist");
}

function findTasksByTag(arr)
{
    if (!Array.isArray(arr))
    {
        throw new TaskException("Must be an array!");
    }
    return data.tasks.filter(elem => elem.tags.some(tag_id => arr.includes(tag_id)));
}