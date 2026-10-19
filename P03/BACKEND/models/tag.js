const fs = require('fs');
const tags = JSON.parse(fs.readFileSync('./database/tags.json'));
const users = JSON.parse(fs.readFileSync('./database/users.json'));

function getNextTagID()
{
    return tags.length + 1;
}

class TagException
{
    constructor(errorMessage)
    {
        this.errorMessage = errorMessage;
    }
}

class Tag
{
    #id;
    #name;
    #color;
    #id_user;
    
    constructor(name, color, id_user)
    {
        this.#id = getNextTagID();
        this.name = name;
        this.color = color;
        this.id_user = id_user;
    }

    // Getters
    get id()
    {
        return this.#id;
    }

    get name()
    {
        return this.#name;
    }

    get color()
    {
        return this.#color;
    }

    get id_user()
    {
        return this.#id_user;
    }

    // Setters

    set id(id)
    {
        throw new TagException("ID cannot be changed");
    }

    set name(name)
    {
        if (name.length === 0)
        {
            throw new TagException("Name cannot be empty");
        }

        this.#name = name;
    }

    set color(color)
    {
        if (typeof color === 'string' && color.length === 7 && /^#[0-9A-Fa-f]{6}$/.test(color)) // Funcion sacada de aqui https://stackoverflow.com/a/8027444
        {
            this.#color = color;
        } else throw new TagException("Not a valid color");
    }

    set id_user(id_user)
    {
        if (id_user.length === 0)
        {
            throw new TagException("id_user cannot be empty");
        }
        if (users.filter(u => u["id"] === id_user).length === 0)
        {
            throw new TagException("id_user does not exist");
        }

        this.#id_user = id_user;
    }

    toObj()
    {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            id_user: this.id_user,

        }
    }
}

module.exports = Tag;