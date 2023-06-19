const myform = document.getElementById('myform')
const userlist = document.getElementById('userlist')

function removeFromScreen(id) {
    const listItem = document.getElementById(id);
    if (listItem && listItem.parentNode === userlist) {
        userlist.removeChild(listItem);
    }
}

async function deluser(id) {
    try {
        await axios.delete(`http://localhost:3000/deluser/${id}`)
        removeFromScreen(id)
    }
    catch (err) {
        console.log(err)
    }
}

function display(users) {
    userlist.innerHTML = ""
    for (let i = 0; i < users.data.allusers.length; i++) {
        const li = document.createElement('li')
        li.setAttribute("id", users.data.allusers[i].id)
        li.textContent = `NAME : ${users.data.allusers[i].name} , EMAIL : ${users.data.allusers[i].email}`
        userlist.appendChild(li)

        const delButton = document.createElement('button')
        delButton.textContent = "Delete"
        delButton.addEventListener('click', () => deluser(users.data.allusers[i].id))
        userlist.appendChild(delButton)
    }
}

async function getUser() {
    try {
        const res = await axios.get("http://localhost:3000/getuser");
        display(res)
    }
    catch (err) {
        console.log(err);
    }
}

async function addUser(name, email) {
    let user = {
        name,
        email
    }
    try {
        const response = await axios.post("http://localhost:3000/adduser", user)
        console.log(response)
        getUser()
    }
    catch (err) {
        console.log(err)
    }
}

myform.addEventListener('submit', async (e) => {
    e.preventDefault()

    let name = document.getElementById('name').value
    let email = document.getElementById('email').value

    await addUser(name, email)

    name = ""
    email = ""

})

document.addEventListener('DOMContentLoaded', getUser);