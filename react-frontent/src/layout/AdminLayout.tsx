import React from "react";
import Sidebar from "./Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/Custom.css';

const AdminLayout: React.FC = (props) => {
    return (
        <div className="d-flex vh-100">
            <Sidebar />
            <div className="content flex-grow-1 p-3">
                {props.children}
                <div className="clock mt-auto">
                    <h2>Current Time</h2>
                    <div className="time">00:37:14</div>
                    <p>Saturday, 8th of June, 2024</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
