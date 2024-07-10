import React from "react";
import '../assets/css/Custom.css';
const AdminLayout: React.FC = (props) => {
    return (
        <div className="admin-layout">
            <div className="container">
                <div className="sidebar">
                    <h2>Employee Portal</h2>
                    <a href="#">Notices</a>
                    <a href="#">Attendances</a>
                    <a href="#">My Calendar</a>
                    <a href="#">Leaves / Comp Off</a>
                    <a href="#">Documents</a>
                    <a href="#">Awards</a>
                    <a href="#">Vacancies</a>
                    <a href="#">Time Sheet</a>
                    <a href="#">Leave Balance Tracker</a>
                </div>
                <div className="content">
                    {props.children}
                    <div className="clock">
                        <h2>Current Time</h2>
                        <div className="time">00:37:14</div>
                        <p>Saturday, 8th of June, 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;