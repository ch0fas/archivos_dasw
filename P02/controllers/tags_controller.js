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