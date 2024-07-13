import React, {useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {hasPermission} from "../ApiRequest/ApiRequest";

const Sidebar: React.FC = () => {
    const location = useLocation();
    const [isUsersOpen, setIsUsersOpen] = useState(
        location.pathname.startsWith("/users/list")
        || location.pathname.startsWith("/users/create")
        || location.pathname.startsWith("/roles/list")
        || location.pathname.startsWith("/roles/create")
        || location.pathname.startsWith("/roles/edit")
        || location.pathname.startsWith("/permissions/list")
        || location.pathname.startsWith("/permissions/create")
        || location.pathname.startsWith("/permissions/edit")
    );
    const toggleUsers = () => {
        setIsUsersOpen(!isUsersOpen);
    };
    
    return (
        <div className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-success text-white" style={{ height: "100vh" }}>
            <div className="sidebar-heading h2">Leave Management</div>
            <ul className="nav nav-pills flex-column mb-auto">
                {hasPermission('sidebar-dashboard') && (
                    <li className="nav-item">
                        <NavLink to="/dashboard" className={location.pathname === "/dashboard" ? "nav-link text-white active-link" : "nav-link text-white"}>
                            Dashboard
                        </NavLink>
                    </li>
                )}
                {hasPermission('sidebar-leaves') && (
                    <li className="nav-item">
                        <NavLink to="/leaves" className={location.pathname === "/leaves" ? "nav-link text-white active-link" : "nav-link text-white"}>
                            Leaves / Comp Off
                        </NavLink>
                    </li>
                )}
                {hasPermission('sidebar-users-settings') && (
                    <li>
                        <a href="#" className="nav-link text-white" onClick={toggleUsers} data-bs-toggle="collapse"
                           data-bs-target="#users-submenu" aria-expanded={isUsersOpen} aria-controls="users-submenu">
                            Users Settings
                        </a>
                        <ul className={`collapse ${isUsersOpen ? 'show' : ''}`} id="users-submenu">
                            {hasPermission('user-list') && (
                                <li style={{ listStyleType: 'none' }}>
                                    <NavLink to="/users/list" className={location.pathname === "/users/list" ? "nav-link text-white active-link" : "nav-link text-white"}>
                                        User List
                                    </NavLink>
                                </li>
                            )}
                            {hasPermission('role-list') && (
                                <li style={{ listStyleType: 'none' }}>
                                    <NavLink to="/roles/list" className={location.pathname === "/roles/list" ? "nav-link text-white active-link" : "nav-link text-white"}>
                                        Role List
                                    </NavLink>
                                </li>
                            )}
                            {hasPermission('permission-list') && (
                                <li style={{ listStyleType: 'none' }}>
                                    <NavLink to="/permissions/list" className={location.pathname === "/permissions/list" ? "nav-link text-white active-link" : "nav-link text-white"}>
                                        Permissions List
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </li>
                )}
                <li><Link to="/logout" className="nav-link text-white">Logout</Link></li>
                {/*  Hidden sidebar for active  */}
                <li className="nav-item" style={{display: "none"}}>
                    <NavLink to="/leaves/create" className={location.pathname === "/leaves/create" ? "nav-link text-white active-link" : "nav-link text-white"}>
                        New Leave / Comp Off
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;