import axios from "axios";
const localBaseUrl = "http://localhost:3000"
const accessToken = localStorage.getItem('authToken');
const userId = localStorage.getItem('userId');

// loginUser function
export async function loginUser(data) {
    try {
        return await axios.post(localBaseUrl + "/auth/login", data);
    } catch (error) {
        return error.response;
    }
}

// logout function
export async function logout() {
    try {
        return await axios.get(localBaseUrl + "/logout", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}
 
// verifyToken
export async function verifyToken() {
    try {
        return await axios.get(localBaseUrl + "/auth/verify-token", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}


//user details
export async function userDetails() {
    try {
        return await axios.get(`${localBaseUrl}/users/${userId}/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

// create offline leave
export async function newLeave(data) {
    try {
        return await axios.post(localBaseUrl + "/leaves/create", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

// List of Leave Function
export async function leaves() {
    try {
        return await axios.get(localBaseUrl + "/leaves/list", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}