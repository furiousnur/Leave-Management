import React, {useEffect, useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const [isAttendancesOpen, setIsAttendancesOpen] = useState(
        location.pathname.startsWith("/attendances")
        || location.pathname.startsWith("/offline-attendances")
        || location.pathname.startsWith("/new-offline-attendance")
    );
    const toggleAttendances = () => {
        setIsAttendancesOpen(!isAttendancesOpen);
    };

    return (
        <div className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-success text-white" style={{ height: "100vh" }}>
            <div className="sidebar-heading h2">Employee Portal</div>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/dashboard" className={location.pathname === "/dashboard" ? "nav-link text-white active-link" : "nav-link text-white"}>
                        Dashboard
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/notice" className={location.pathname === "/notice" ? "nav-link text-white active-link" : "nav-link text-white"}>
                        Notices
                    </NavLink>
                </li>
                <li>
                    <a href="#" className="nav-link text-white" onClick={toggleAttendances} data-bs-toggle="collapse"
                       data-bs-target="#attendances-submenu" aria-expanded={isAttendancesOpen} aria-controls="attendances-submenu">
                        Attendances
                    </a>
                    <ul className={`collapse ${isAttendancesOpen ? 'show' : ''}`} id="attendances-submenu">
                        <li style={{ listStyleType: 'none' }}>
                            <NavLink to="/attendances" className={location.pathname === "/attendances" ? "nav-link text-white active-link" : "nav-link text-white"}>
                                Attendances
                            </NavLink>
                        </li>
                        <li style={{ listStyleType: 'none' }}>
                            <NavLink to="/offline-attendances" className={location.pathname == "/offline-attendances" ? "nav-link text-white active-link" : "nav-link text-white"}>
                                Offline Attendances
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <NavLink to="/calendar" className={location.pathname === "/calendar" ? "nav-link text-white active-link" : "nav-link text-white"}>
                        Calendar
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/leaves" className={location.pathname === "/leaves" ? "nav-link text-white active-link" : "nav-link text-white"}>
                        Leaves / Comp Off
                    </NavLink>
                </li>
                <li className="nav-item" style={{display: "none"}}>
                    <NavLink to="/leaves/create" className={location.pathname === "/leaves/create" ? "nav-link text-white active-link" : "nav-link text-white"}>
                        New Leave / Comp Off
                    </NavLink>
                </li>
                <li><a href="#" className="nav-link text-white">Leave Balance Tracker</a></li>
                <li><a href="#" className="nav-link text-white">Documents</a></li>
                <li><a href="#" className="nav-link text-white">Awards</a></li>
                <li><a href="#" className="nav-link text-white">Vacancies</a></li>
                <li><a href="#" className="nav-link text-white">Time Sheet</a></li>
                <li><Link to="/logout" className="nav-link text-white">Logout</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;