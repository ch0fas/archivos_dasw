const fs = require('fs');
const Tag = require('../models/tag');
let tags = JSON.parse(fs.readFileSync('./database/tags.json'));
let users = JSON.parse(fs.readFileSync('./database/users.json'));
let tasks = JSON.parse(fs.readFileSync('./database/tasks.json'));

exports.authTagsMiddleware = (req, res, next) =>
{
    try
    {
        let pwd = req.get('x-auth');
        if (!pwd)
        {
            return res.status(401).send("Did not provide password");
        }

        let res_user = users.find(u => String(u.password) === pwd);
        if (!res_user)
        {
            return res.status(404).send("User Not Found");
        }

        req.user = res_user;
        next();
    } catch (err)
    {
        return res.status(400).send(err.message);
    }
}

exports.registerTag = (req, res) =>
{
    let name = req.body.name;
    let color = req.body.color;

    if (!name || !color)
    {
        return res.status(400).send("Tag is missing name or color!");
    }

    let new_tag = new Tag(name, color, req.user.id);

    tags.push(new_tag.toObj());
    fs.writeFileSync('./database/tags.json', JSON.stringify(tags, null, 2));
    res.send("Tag Created");
}

exports.tagsPage = (req, res) =>
{
    try
    {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);

        let user_tags = tags.filter(tag => String(tag.id_user) === String(req.user.id));

        let start = (page-1) * limit;
        let end = start + limit;

        res.json
        ({
            page: page,
            next_page: page + 1,
            limit: limit,
            total: tags.length,
            data: user_tags.slice(start, end)
        })
    } catch (err)
    {
        return res.status(400).send(err.message);
    }
}

exports.getTagFromId = (req, res) =>
{
    try
    {
        let found_tag = tags.find(tag => String(tag.id_user) === String(req.user.id) && String(tag.id) === req.params.id);

        if (!found_tag)
        {
            return res.status(404).send("Tag Not Found");
        }

        res.json(found_tag);
    } catch (err)
    {
        return res.status(400).send(err.message);
    }
}

exports.patchTag = (req, res) =>
{
    try
    {
        let body = req.body;
        let fields = ["name", "color"];
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
            return res.status(400).send("No valid fields were given");
        }

        let position = tags.findIndex(tag => String(tag.id) === req.params.id && String(tag.id_user) === String(req.user.id));
        if (position === -1)
        {
            return res.status(404).send("Tag Not Found");
        }

        let new_tag_data = {...tags[position], ...valid_changes};
        let new_tag = new Tag(new_tag_data.name, new_tag_data.color, new_tag_data.id_user);

        let updated_tag = {...new_tag.toObj(), id: tags[position].id};

        let updated_tags = [...tags];
        updated_tags[position] = updated_tag;

        fs.writeFileSync('./database/tags.json', JSON.stringify(updated_tags, null, 2));
        tags = updated_tags;

        res.json
        ({
            message: "Tag edited successfully!",
            tag: updated_tag
        });
    } catch (err)
    {
        return res.status(400).send(err.message);
    }
}

exports.removeTag = (req, res) =>
{
    try
    {
        let position = tags.findIndex(tag => String(tag.id) === req.params.id && String(tag.id_user) === String(req.user.id));

        if (position === -1)
        {
            return res.status(404).send("Task Not Found");
        }

        let tag_id = tags[position].id;

        let used_tag = tasks.some(t => Array.isArray(t.tags) && t.tags.some(tag => tag === tag_id));

        if (used_tag)
        {
            return res.status(400).send("Tag is still in use and cannot be deleted!");
        }

        let removed_tag = tags[position];
        let updated_tags = tags.filter(tag => String(tag.id) !== String(tag_id));

        fs.writeFileSync('./database/tags.json', JSON.stringify(updated_tags, null, 2));
        tags = updated_tags;

        res.json({
            message: "Tag deleted successfully!",
            tag: removed_tag
        })
    } catch (err)
    {
        return res.status(400).send(err.message);
    }

}

function createTag(name, color)
{
    let new_tag = new Tag(name, color);
    data.tags.push(new_tag);
}

function getTagByID(id)
{
    let found_tag = data.tags.find((elem) => elem.id === id);
    if (found_tag)
    {
        return found_tag;
    } else return "404 - Tag Not Found";
}

function searchTags(attribute, value)
{
    if (!(attribute in Tag.prototype))
    {
        throw new TagException("Attribute does not exist!");
    }
    return data.tags.filter(tag => tag[attribute] === value);
}

function getAllTags()
{
    return data.tags;
}

function updateTag(id, obj_new_info)
{
    let tag = data.tags.find(elem => elem.id === id);
    if (!tag)
    {
        throw new TagException("Tag not found!");
    }

    let res = false;
    for (const [attribute, value] of Object.entries(obj_new_info))
    {
        if (attribute in tag)
        {
            tag[attribute] = value;
            res = true;
        }
    }

    if (!res)
    {
        throw new TagException("No changes were made");
    }

    return res;
}

function deleteTag(id)
{
    for (let i = 0; i < data.tasks.length; i++)
    {
        let task = data.tasks[i];
        {
            for (let j = 0; j < task.tags.length; j++)
            {
                if (task.tags[j] === id)
                {
                    throw new TagException(`Cannot delete Tag. Used in Task: ${i}`)
                }
            }
        }
    }

    let found_tag = data.tags.find(elem => elem.id === id)
    if (found_tag)
    {
        data.tags = data.tags.filter(elem => elem.id !== id);
    } else throw new TagException("Tag does not exist");
}