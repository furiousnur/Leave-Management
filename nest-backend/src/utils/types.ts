export type UserParams = {
    username: string;
    password: string;
}

export type LeaveParams = {
    userId: number;
    leave_type: string;
    date_from: string;
    date_to: string;
    reason: string;
}