export type UserParams = {
    username: string;
    password: string;
}

export type AttendanceParams = {
    userId: number;
    attendance_type: string;
    date: string;
    time_in: string;
    time_out?: string;
    remark?: string;
}