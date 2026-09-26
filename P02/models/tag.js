function getNextTagID()
{
    return 1;
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
        if (typeof color === 'string' && color.length === 7 && color[0] === '#' && !isNaN(Number('0x' + color.slice(1)))) // Funcion sacada de aqui https://stackoverflow.com/a/8027526
        {
            this.#color = color;
        } else throw new TagException("Not a valid color");
    }
}