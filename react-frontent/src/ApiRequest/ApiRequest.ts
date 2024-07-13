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

export function hasPermission(permissionName: string | string[]) {
    try {
        const storedPermissions = localStorage.getItem('permissions');
        if (storedPermissions) {
            const parsedPermissions = JSON.parse(storedPermissions);
            const permissions = parsedPermissions.map((p: any) => ({ id: p.id, name: p.permission }));
            if (Array.isArray(permissionName)) {
                return permissionName.some(name => permissions.some(p => p.name.name === name));
            } else {
                return permissions.some(p => p.name.name === permissionName);
            }
        }
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
        return await axios.get(`${localBaseUrl}/auth/verify-token/${userId}`, {
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
export async function leaves(page = 1) {
    try {
        return await axios.get(localBaseUrl + "/leaves/list", {
            params: {
                page
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

// List of User Function
export async function users(page = 1) {
    try {
        return await axios.get(localBaseUrl + "/users/list", {
            params: {
                page
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

// List of roles Function
export async function roles(page = 1) {
    try {
        return await axios.get(localBaseUrl + "/roles/list", {
            params: {
                page
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

// create role
export async function newRole(data) {
    try {
        return await axios.post(localBaseUrl + "/roles/create", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

// edit role
export async function editRole(id) {
    try {
        return await axios.get(`${localBaseUrl}/roles/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

export async function updateRole(request, id) {
    try {
        return await axios.put(`${localBaseUrl}/roles/${id}/update`,request, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

export async function deleteRole(id) {
    try {
        return await axios.delete(`${localBaseUrl}/roles/${id}/delete`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

// accept or reject leave status function
export async function acceptOrRejectLeave(status, id) {
    try {
        return await axios.get(`${localBaseUrl}/leaves/${status}/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

// List of Permission Function
export async function permissions(page = 1) {
    try {
        return await axios.get(localBaseUrl + "/permissions/list", {
            params: {
                page
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

// create Permission
export async function newPermission(data) {
    try {
        return await axios.post(localBaseUrl + "/permissions/create", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

// edit Permission
export async function editPermission(id) {
    try {
        return await axios.get(`${localBaseUrl}/permissions/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

export async function updatePermission(request, id) {
    try {
        return await axios.put(`${localBaseUrl}/permissions/${id}/update`,request, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

export async function deletePermission(id) {
    try {
        return await axios.delete(`${localBaseUrl}/permissions/${id}/delete`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

export async function newUser(data) {
    try {
        return await axios.post(localBaseUrl + "/users/create", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

export async function acceptOrReject(status, id, url) {
    try {
        return await axios.get(`${localBaseUrl}/${url}/${status}/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

export async function userEdit(id) {
    try {
        return await axios.get(`${localBaseUrl}/users/${id}/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

export async function updateUser(request, id) {
    try {
        return await axios.put(`${localBaseUrl}/users/${id}/profile/update`,request, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}

export async function setUserRole(userId, roleId) {
    try {
        return await axios.get(`${localBaseUrl}/users/roleSet/${userId}/${roleId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        return error.response;
    }
}