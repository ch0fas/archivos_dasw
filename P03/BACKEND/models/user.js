const fs = require('fs');
let users = JSON.parse(fs.readFileSync('./database/users.json'));

function getNextUserID()
{
    return users.length + 1;
}

class UserException
{
    constructor(errorMessage)
    {
        this.errorMessage = errorMessage;
    }
}

class User
{
    #id;
    #name;
    #email;
    #password;
    #joined_at;

    constructor(name, email, password)
    {
        this.#id = getNextUserID();
        this.name = name;
        this.email = email;
        this.password = password;
        this.#joined_at = new Date();
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

    get email()
    {
        return this.#email;
    }

    get password()
    {
        return this.#password;
    }

    get joined_at()
    {
        return this.#joined_at;
    }

    // Setters
    set id(id)
    {
        throw new UserException("ID cannot be modified");
    }

    set name(name)
    {
        if (name.length === 0)
        {
            throw new UserException("Name cannot be empty");
        }

        this.#name = name;
    }

    set email(email)
    {
        if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        {
            throw new UserException("Invalid e-mail format");
        }

        let bare_address = email.trim().toLowerCase();

        let taken_b = users.some
        (
            (u) => u.email === bare_address && u.id !== this.#id
        );

        if (taken_b)
        {
            throw new UserException("E-Mail is already taken!");
        }

        this.#email = bare_address;
    }

    set password(password)
    {
        if (password.length < 8)
        {
            throw new UserException("Password must have at least 8 characters");
        }

        let bare_pwd = password.trim();

        let taken_pwd = users.some
        (
            (u) => u.password === bare_pwd && u.id !== this.#id
        );

        if (taken_pwd)
        {
            throw new UserException("Password has to be unique");
        }

        this.#password = bare_pwd;
    }

    set joined_at(date)
    {
        throw new UserException("Join date cannot be modified");
    }

    toObj()
    {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            joined_at: this.joined_at
        };
    }
}

module.exports = User;