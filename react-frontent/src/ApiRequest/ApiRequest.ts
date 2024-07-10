import axios from "axios";
const localBaseUrl = "http://localhost:3000"
const accessToken = localStorage.getItem('authToken');

// loginUser function
export async function loginUser(data) {
    try {
        return await axios.post(localBaseUrl + "/auth/login", data);
    } catch (error) {
        return error.response;
    }
}

// logout function
export async function logout(accessToken) {
    try {
        const response = await axios.get(localBaseUrl + "/logout", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.status === 200) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

// verify the token
export async function tokenVerify(accessToken) {
    try {
        const response = await axios.get(localBaseUrl + "/token-verify", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.status === 200) {
            return response;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}