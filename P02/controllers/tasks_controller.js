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