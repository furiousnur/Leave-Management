import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import { faCheck, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {acceptOrReject, hasPermission, setUserRole} from "../../../ApiRequest/ApiRequest";

const Users = ({ list, page, total, totalPages, onPageChange, roles }) => {
    const [users, setUsers] = useState(list || []);
    const [roleList, setRoleList] = useState(roles || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsersType, setSelectedUsersType] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        setUsers(list);
        setRoleList(roles);
    }, [list, roles]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleUsersTypeChange = (e) => {
        setSelectedUsersType(e.target.value);
    };

    async function acceptRejectHandle(status, userId) {
        try {
            const res = await acceptOrReject(status, userId, 'users');
            if (res.statusText === 'OK') {
                toast.success('User status updated successfully.');
                const updatedUsers = users.map(user =>
                    user.id === userId ? { ...user, profile: { ...user.profile, status: status } } : user
                );
                setUsers(updatedUsers);
            } else {
                toast.error('Failed to update user status.');
            }
        } catch (error) {
            console.error('Error processing user request:', error);
            toast.error('Error processing user request.');
        }
    }
    const handleShowModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
        setSelectedRole('');
    };
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };
    const handleSetRole = async () => {
        if (selectedUser && selectedRole) {
            try {
                const res = await setUserRole(selectedUser.id, selectedRole); 
                if (res.statusText === 'OK') {
                    toast.success('User role updated successfully.');
                    const updatedUsers = users.map(user =>
                        user.id === selectedUser.id ? { ...user, userRole: { roleId: selectedRole.id, role: user.userRole.role } } : user
                    );
                    setUsers(updatedUsers);
                    handleCloseModal();
                } else {
                    toast.error('Failed to update user role.');
                }
            } catch (error) {
                console.error('Error processing user request:', error);
                toast.error('Error processing user request.');
            }
        } else {
            toast.error('Please select a role.');
        }
    };

    const filteredUsers = Array.isArray(users) ? users.filter((user) => {
        const profile = user.profile || {};
        const matchesSearchTerm =
            (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (profile.position && profile.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (profile.name && profile.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (profile.status && profile.status.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesUsersType = selectedUsersType === 'all' || 
            profile.position === selectedUsersType || 
            profile.name === selectedUsersType || 
            profile.department === selectedUsersType || 
            user.userRole.role.name === selectedUsersType;
        return matchesSearchTerm && matchesUsersType;
    }) : [];

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedUsersType('all');
    };

    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const visibleUsers = filteredUsers.slice(startIndex, endIndex);

    return (
        <div className="container mt-5">
            <h3 className="me-3">Users Management</h3>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="d-flex align-items-center">
                    {hasPermission('user-create') && (
                        <NavLink to="/users/create" className="btn btn-success">
                            New User
                        </NavLink>
                    )}
                </div>
                <div className="d-flex align-items-center">
                    <select className="form-select me-2" onChange={handleUsersTypeChange} value={selectedUsersType}>
                        <option value="all">Select User Type</option>
                        <option value="Admin">Admin</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Employee">Employee</option>
                    </select>
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-success" onClick={resetFilters}>
                        Reset
                    </button>
                </div>
            </div>

            <div className="mt-3">
                <table className="table table-bordered">
                    <thead className="table-light">
                    <tr>
                        <th>UserName</th>
                        <th>Full Name</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>User Role Type</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visibleUsers.length > 0 ? (
                        visibleUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user?.username || 'N/A'}</td>
                                <td>{user.profile?.name || 'N/A'}</td>
                                <td>{user.profile?.department || 'N/A'}</td>
                                <td>{user.profile?.position || 'N/A'}</td>
                                <td>
                                    {user.userRole?.role ? user.userRole.role.name : 'N/A'}
                                </td>
                                <td>
                                    <span className={`badge ${user.profile?.status === 'Accepted' ? 'bg-success' : user.profile?.status === 'Rejected' ? 'bg-danger' : 'bg-warning'}`}>
                                        {user.profile?.status || 'N/A'}
                                    </span>
                                </td>
                                <td className="date" width="25%">
                                    <div className="d-flex">
                                        <div className="d-flex">
                                            {user.profile.status === 'Pending' ? (
                                                <>
                                                    {hasPermission('user-accept-reject') && (
                                                        <>
                                                            <button className="btn btn-success me-2 ms-2" onClick={() => acceptRejectHandle('Accepted', user.id)}>
                                                                <FontAwesomeIcon icon={faCheck} />
                                                            </button>
                                                            <button className="btn btn-danger" onClick={() => acceptRejectHandle('Rejected', user.id)}>
                                                                <FontAwesomeIcon icon={faSquareXmark} />
                                                            </button>
                                                        </>
                                                    )}
                                                </>
                                                ) :
                                                <>
                                                    {hasPermission('user-edit') && (
                                                        <NavLink to={`/users/edit/${user.id}`} className="btn btn-success">
                                                            Edit
                                                        </NavLink>
                                                    )}
                                                    {hasPermission('user-role-set') && (
                                                        <>
                                                            {user.profile.status === 'Accepted' && !user.userRole?.role ? (
                                                                <button className="btn btn-success me-2 ms-2" onClick={() => handleShowModal(user)}>
                                                                    Set Role
                                                                </button>
                                                            ) : (
                                                                <button className="btn btn-success me-2 ms-2" onClick={() => handleShowModal(user)}>
                                                                    Change Role
                                                                </button>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            }
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center">
                                No users found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                {totalPages > 1 && (
                    <div>
                        <p>Total Pages: {totalPages} | Total Users: {total}</p>
                        <nav>
                            <ul className="pagination justify-content-end">
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => onPageChange(index + 1)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>

            {/* Role Modal */}
            {showModal && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Set Role</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="roleSelect" className="form-label">UserName: {selectedUser?.username}</label>
                                        <input type="hidden" className="form-control" value={selectedUser?.id} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="roleSelect" className="form-label">Select Role</label>
                                        <select id="roleSelect" className="form-select" value={selectedRole} onChange={handleRoleChange}>
                                            <option value="">Select a role</option>
                                            {roleList.map(role => (
                                                <option key={role.id} value={role.id}>{role.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSetRole}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;