const createUser = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(user => user.username === username))
        throw Error('This username is already taken.')
    
    const newUser = { username, password }
    const newUsers = [
        ...users,
        newUser
    ]
    
    localStorage.setItem('users', JSON.stringify(newUsers))
}

const validUser = (username, password) => {
    const users = localStorage.getItem('users')
    if (!users) return false
    
    const selectedUser = JSON.parse(users)
    .find(user => user.username === username)
    
    if (!selectedUser) return false
    if (selectedUser.password !== password) return false

    return true
}

export {
    validUser,
    createUser
}