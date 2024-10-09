export const storeToken = (token) => {
    localStorage.setItem("token", token);
}

export const getToken = () => {
    return localStorage.getItem("token");
}

export const saveLoggedInUser = (usernameOrEmail, role) => {
    sessionStorage.setItem("authenticatedUser", usernameOrEmail);
    sessionStorage.setItem("role", role);
}

export const isLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");

    if (username == null){
        return false;
    } else {
        return true;
    }
}

export const getLoggedInUser = () => {
    return sessionStorage.getItem("authenticatedUser");
}

export const isAdminUser = () => {

    let role = sessionStorage.getItem("role");

    if (role !== null && role === 'ROLE_ADMIN') {
        return true;
    } else {
        return false;
    }
}