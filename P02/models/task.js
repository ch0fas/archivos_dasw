let nextTaskID = 1;

function getNextTaskID()
{
    return nextTaskID++;
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
    #owner;
    #status;
    #tags;

    constructor(title, description, due_date, owner, status, tags)
    {
        this.#id = getNextTaskID();
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.owner = owner;
        this.status = status;
        this.tags = tags;
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

    get owner()
    {
        return this.#owner;
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

    set owner(owner)
    {
        if (owner.length === 0)
        {
            throw new TaskException("Owner cannot be empty");
        }
        if (searchUsers("name", owner).length === 0)
        {
            throw new TaskException("Owner does not exist");
        }

        this.#owner = owner;
    }

    set status(status)
    {
        if (status === 'A' || status === 'F' || status === 'C')
        {
            this.#status = status
        } else throw new TaskException("Status code is invalid, should be A/F/C");
    }

    set tags(tags)
    {
        if (Array.isArray(tags))
        {
            for (let i = 0; i < tags.length; i++)
            {
                if (searchTags("id", tags[i]).length === 0)
                {
                    throw new TaskException(`Tag ${tags[i]} not found.`);
                }
            }
            this.#tags = tags;
        } else throw new TaskException("Must be an array");
    }
}