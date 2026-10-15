const fs = require('fs');
const User = require('../models/user');
let users = JSON.parse(fs.readFileSync('./database/users.json'));

/* exports.registerUser(name, email, password) 
{
    
    let new_user = new User(name, email, password);
    data.users.push(new_user);
} */

exports.authUsersMiddleware = (req, res, next) =>
{
    try
    {
        let pwd = req.get('x-auth');
        if (!pwd)
        {
            res.status(401).send("Did not provide password");
        }

        let res_user = users.find(u => String(u.id) === req.params.id);
        if (!res_user)
        {
            res.status(404).send("User Not Found");
        }

        if (res_user.password !== pwd)
        {
            res.status(401).send("Wrong Password");
        }

        req.user = res_user;
        next();
    } catch (err)
    {
        res.status(400).send(err.errorMessage);
    }
}

exports.registerUser = (req, res) =>
{
    try
    {
        if (req.body.password !== req.body.confirm_password)
        {
            res.status(400).send("Passwords must match!");
        } else
        {
            let new_user = new User(req.body.name, req.body.email, req.body.password);
            users.push(new_user.toObj());
            fs.writeFileSync("./database/users.json", JSON.stringify(users, null, 2));
            res.send("User added");
        }
    } catch (err)
    {
        res.status(400).send(err.errorMessage);
    }
}

exports.usersPage = (req, res) =>
{
    try
    {
        if (req.get("x-auth") !== "admin_auth")
        {
            res.status(401).send("Wrong Admin Password");
        } else
        {
            let page = parseInt(req.query.page);
            let limit = parseInt(req.query.limit);

            let start = (page-1) * limit;
            let end = start + limit;
            let res_users = users.slice(start, end);

            res.json
            ({
                page: page,
                next_page: page+1,
                limit: limit,
                total: users.length,
                data: res_users
            })
        }
    } catch (err)
    {
        res.status(400).send(err.errorMessage);
    }
}

exports.getUserFromID = (req, res) =>
{
    try
    {
        res.json(req.user);
    } catch (err)
    {
        res.status(400).send(err.errorMessage);
    }
}

exports.patchUser = (req, res) =>
{
    try
    {
        
        let body = req.body;
        // Para validar que los campos a actualizar si sean correctos
        let fields = ["name", "email", "password"];

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
            res.status(400).send("No valid fields were given");
        }

        if (valid_changes.email && users.some(u => String(u.email) === valid_changes.email && String(u.id) !== req.params.id))
        {
            res.status(403).send("Email already in use");
        }

        let position = users.findIndex(u => String(u.id) === req.params.id);

        let new_user = {...users[position], ...valid_changes};
        let updated_users = [...users];
        updated_users[position] = new_user;

        fs.writeFileSync('./database/users.json', JSON.stringify(updated_users, null, 2));
        users = updated_users;

        res.json
        ({
            message: "User Updated Successfully!",
            user: new_user
        });

    } catch (err)
    {
        res.status(400).send(err.errorMessage);
    }
}

function getUserById(id)
{
    let found_user = data.users.find((elem) => elem.id === id);
    if (found_user)
    {
        return found_user;
    } else return "404 - User Not Found";
}

function searchUsers(attribute, value)
{
    if (!(attribute in User.prototype))
    {
        throw new UserException("Attribute does not exist!");
    }
    return data.users.filter(user => user[attribute] === value);
}

function getAllUsers()
{
    return data.users;
}

function updateUser(id, obj_new_info)
{
    let user = data.users.find(u => u.id === id);
    if (!user)
    {
        throw new UserException("User not found");
    }

    let res = false;
    for (const [attribute, value] of Object.entries(obj_new_info))
    {
        if (attribute in user)
        {
            user[attribute] = value;
            res = true
        }
    }

    if (!res)
    {
        throw new UserException("No changes were made");
    }

    return res;
}

function deleteUser(id)
{    
    let found_user = data.users.find((elem) => elem.id === id);

    for (let i = 0; i < data.tasks.length; i++)
    {
        if (data.tasks[i].owner === found_user.name && data.tasks[i].status === "A")
        {
            throw new UserException("Cannot delete user, they still have ownership of an active task")
        }
    }

    if (found_user)
    {
        data.users = data.users.filter((elem) => elem.id !== id)
    } else throw new UserException("User does not exist");
}