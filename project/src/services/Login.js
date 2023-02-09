const isLoggedIn = () =>
    !!localStorage.getItem('loggedUser')

const logOut = () =>
    localStorage.removeItem('loggedUser')

const logIn = (username) =>
    localStorage.setItem('loggedUser', username)

export {
    isLoggedIn,
    logOut,
    logIn,
}
