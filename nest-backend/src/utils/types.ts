export type UserParams = {
    username: string;
    password: string;
}

export type UserProfileParams = {
    name: string;
    dob: string;
    position: string;
    department: string;
    profile_pic?: string;
}

export type CreateUserParams = {
    username: string;
    password: string;
    name: string;
    dob: string;
    position: string;
    department: string;
    profile_pic?: string;
}

export type LeaveParams = {
    userId: number;
    leave_type: string;
    date_from: string;
    date_to: string;
    reason: string;
    totalLeave: number;
}

export type RoleParams = {
    name: string;
    status?: string;
    permissions?: number[];
}

export type PermissionParams = {
    name: string;
    status?: string;
}