let nextTagID = 1;

function getNextTagID()
{
    return nextTagID++;
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
    
    constructor(name, color)
    {
        this.#id = getNextTagID();
        this.name = name;
        this.color = color;
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
}