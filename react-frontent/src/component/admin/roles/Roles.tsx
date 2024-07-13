import React, { useState } from 'react';
import {NavLink} from "react-router-dom";
import {hasPermission} from "../../../ApiRequest/ApiRequest";  

const Roles = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const roles = props.list || [];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }; 
    const filteredRoles = roles.filter(role =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="container mt-5"> 
            <h3 className="me-3">Role List</h3>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="d-flex align-items-center">
                    {hasPermission('role-create') && (
                        <NavLink to="/roles/create" className="btn btn-success">
                            New Role
                        </NavLink>
                    )}
                </div>
                <div className="d-flex align-items-center">
                    <input type="text" className="form-control me-2" placeholder="Search..."
                           value={searchTerm} onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="mt-3">
                <table className="table table-bordered">
                    <thead className="table-light">
                    <tr>
                        <th>Name</th> 
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRoles.map((role, index) => (
                        <tr key={index}>
                            <td className="date">{role.name}</td> 
                            <td className="date">
                                <span className={`badge ${role.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                                    {role.status}
                                </span>
                            </td>
                            <td className="date">
                                <div className="d-flex">
                                    {hasPermission('role-edit') && (
                                        <NavLink to={`/roles/edit/${role.id}`} className="btn btn-success">
                                            Edit
                                        </NavLink>
                                    )}
                                    {hasPermission('role-delete') && (
                                        <NavLink to={`/roles/${role.id}/delete`} className="btn btn-danger ms-2">
                                            Delete
                                        </NavLink>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}; 

export default Roles;
