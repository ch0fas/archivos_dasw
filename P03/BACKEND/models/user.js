let nextUserID = 1;

function getNextUserID()
{
    return nextUserID++;
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
        this.name = name;
        this.email = email;
        this.password = password;
        this.#joined_at = new Date();
        this.#id = getNextUserID();
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
        if (!email.includes("@"))
        {
            throw new UserException("Not a valid email. Try again!");
        }

        let email_taken_qm = data.users.some(u => u !== this && u.email === email);
        {
            if (email_taken_qm)
            {
                throw new UserException("Email address is already taken")
            }
        }

        this.#email = email;
    }

    set password(password)
    {
        if (password.length < 8)
        {
            throw new UserException("Password must have at least 8 characters");
        }

        this.#password = password;
    }

    set joined_at(date)
    {
        throw new UserException("Join date cannot be modified");
    }
}