const fs = require('fs');
const tasks = JSON.parse(fs.readFileSync('./database/tasks.json'));
const users = JSON.parse(fs.readFileSync('./database/users.json'));
const tags = JSON.parse(fs.readFileSync('./database/tags.json'));

function getNextTaskID()
{
    return tasks.length + 1;
}

class TaskException
{
    constructor(errorMessage)
    {
        this.errorMessage = errorMessage;
    }
}

class Task
{
    #id;
    #title;
    #description;
    #due_date;
    #id_user;
    #status;
    #tags;

    constructor(title, description, due_date, id_user, status, tags)
    {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.id_user = id_user;
        this.status = status;
        this.tags = tags;
        this.#id = getNextTaskID();
    }

    // Getters
    get id()
    {
        return this.#id;
    }

    get title()
    {
        return this.#title;
    }

    get description()
    {
        return this.#description;
    }

    get due_date()
    {
        return this.#due_date;
    }

    get id_user()
    {
        return this.#id_user;
    }

    get status()
    {
        return this.#status;
    }

    get tags()
    {
        return this.#tags;
    }

    // Setters

    set id(id)
    {
        throw new TaskException("ID cannot be changed");
    }

    set title(title)
    {
        if (title.length === 0)
        {
            throw new TaskException("Title cannot be empty");
        }

        this.#title = title;
    }

    set description(description)
    {
        this.#description = description;
    }

    set due_date(due_date)
    {
        if (isNaN(new Date(due_date).getTime()))
        {
            throw new TaskException("Invalid Date.");
        }

        this.#due_date = new Date(due_date);
    }

    set id_user(id_user)
    {
        if (id_user.length === 0)
        {
            throw new TaskException("id_user cannot be empty");
        }
        if (users.filter(u => u["id"] === id_user).length === 0)
        {
            throw new TaskException("id_user does not exist");
        }

        this.#id_user = id_user;
    }

    set status(status)
    {
        if (status === 'A' || status === 'F' || status === 'C')
        {
            this.#status = status
        } else throw new TaskException("Status code is invalid, should be A/F/C");
    }

    set tags(new_tags)
    {
        if (Array.isArray(new_tags))
        {
            for (let i = 0; i < new_tags.length; i++)
            {
                if (tags.filter(t => t["id"] === new_tags[i]).length === 0)
                {
                    throw new TaskException(`Tag ${new_tags[i]} not found.`);
                }
            }
            this.#tags = new_tags;
        } else throw new TaskException("Must be an array");
    }

    toObj()
    {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            due_date: this.due_date,
            id_user: this.id_user,
            status: this.status,
            tags: this.tags
        };
    }
}

module.exports = Task;