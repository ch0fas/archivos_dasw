function getInfo(elem, arg)
{
    console.log(elem.id);
    console.log(elem.attributes);
    console.log(elem.hasAttribute(arg));
}

function setInfo(elem, attribute, value)
{
    elem.setAttribute(attribute, value);
}

getInfo(header_1);
getInfo(header_2);

setInfo(header_1, "style", "color: green; font-size: 4em");