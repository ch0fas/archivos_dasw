function createUser(name, email, password) 
{
    let new_user = new User(name, email, password);
    data.users.push(new_user);
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