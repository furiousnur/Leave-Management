import React, { useState } from 'react';
import {NavLink} from "react-router-dom";
import {hasPermission} from "../../../ApiRequest/ApiRequest";  

const Permissions = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const permissions = props.list || [];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }; 
    const filteredPermissions = permissions.filter(permission =>
        permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="container mt-5"> 
            <h3 className="me-3">Permission List</h3>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="d-flex align-items-center">
                    {hasPermission('permission-create') && (
                        <NavLink to="/permissions/create" className="btn btn-success">
                            New Permission
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
                    {filteredPermissions.map((permission, index) => (
                        <tr key={index}>
                            <td className="date">{permission.name}</td> 
                            <td className="date">
                                <span className={`badge ${permission.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                                    {permission.status}
                                </span>
                            </td>
                            <td className="date">
                                <div className="d-flex">
                                    {hasPermission('permission-edit') && (
                                        <NavLink to={`/permissions/edit/${permission.id}`} className="btn btn-success">
                                            Edit
                                        </NavLink>
                                    )}
                                    {hasPermission('permission-delete') && (
                                        <NavLink to={`/permissions/${permission.id}/delete`} className="btn btn-danger ms-2">
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

export default Permissions;
