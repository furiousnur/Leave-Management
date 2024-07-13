import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import {acceptOrRejectLeave, hasPermission} from "../../../ApiRequest/ApiRequest";
import { toast } from "react-toastify";
import {faCheck, faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Leave = ({ list, page, total, totalPages, onPageChange }) => {
    
    const [leaves, setLeaves] = useState(list || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLeaveType, setSelectedLeaveType] = useState('all');  
    useEffect(() => {
        if (list && Array.isArray(list.leaves)) {
            setLeaves(list.leaves);
        } else {
            setLeaves([]);
        }
    }, [list]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLeaveTypeChange = (e) => {
        setSelectedLeaveType(e.target.value);
    };

    const filteredLeaves = leaves.filter((leave) => {
        const matchesSearchTerm =
            leave.leave_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            leave.date_from.toLowerCase().includes(searchTerm.toLowerCase()) ||
            leave.date_to.toLowerCase().includes(searchTerm.toLowerCase()) ||
            leave.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
            leave.status.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLeaveType = selectedLeaveType === 'all' || leave.leave_type === selectedLeaveType;
        return matchesSearchTerm && matchesLeaveType;
    });

    const calculateNoOfDays = (dateFrom, dateTo) => {
        const from = new Date(dateFrom);
        const to = new Date(dateTo);
        return Math.ceil((to - from + 1) / (1000 * 60 * 60 * 24));
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedLeaveType('all');
    };

    async function acceptRejectHandle(status, leaveId) {
        try {
            let res = await acceptOrRejectLeave(status, leaveId);
            if (res.statusText === 'OK') {
                toast.success('Leave status updated successfully.');
                const updatedLeaves = leaves.map(leave =>
                    leave.id === leaveId ? { ...leave, status: status } : leave
                );
                setLeaves(updatedLeaves);
            } else {
                toast.error('Failed to update leave status.');
            }
        } catch (error) {
            console.error('Error processing leave request:', error);
            toast.error('Error processing leave request.');
        }
    }

    const startIndex = (page - 1) * 10;
    const visibleLeaves = filteredLeaves.slice(startIndex, startIndex + 10);

    return (
        <div className="container mt-5">
            <h3 className="me-3">Leaves / Comp Off</h3>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="d-flex align-items-center">
                    {hasPermission('leave-create') && (
                        <NavLink to="/leaves/create" className="btn btn-success">
                            New Leave / Comp Off
                        </NavLink>
                    )}
                </div>
                <div className="d-flex align-items-center">
                    <select className="form-select me-2" onChange={handleLeaveTypeChange} value={selectedLeaveType}>
                        <option value="all">Select Leave Type</option>
                        <option value="Comp Off (Full Day)">Comp Off (Full Day)</option>
                        <option value="Comp Off (Half Day)">Comp Off (Half Day)</option>
                        <option value="Earned Leave">Earned Leave</option>
                        <option value="Maternal Leave">Maternal Leave</option>
                        <option value="Paternal Leave">Paternal Leave</option>
                        <option value="Birthday Leave">Birthday Leave</option>
                        <option value="Anniversary Leave">Anniversary Leave</option>
                        <option value="Half Day Leave">Half Day Leave</option>
                        <option value="2024 Special Leaves">2024 Special Leaves</option>
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
                        <th>User Name</th>
                        <th>Leave Type</th>
                        <th>Date From</th>
                        <th>Date To</th>
                        <th>No. Days</th>
                        <th>Applied On</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visibleLeaves.length > 0 ? (
                        visibleLeaves.map((leave, index) => (
                            <tr key={index}>
                                <td>{leave.user.username}</td>
                                <td>{leave.leave_type}</td>
                                <td>{leave.date_from}</td>
                                <td>{leave.date_to}</td>
                                <td>{calculateNoOfDays(leave.date_from, leave.date_to)}</td>
                                <td>{moment(leave.createdAt).format("YYYY MM DD")}</td>
                                <td>{leave.reason}</td>
                                <td>
                                    <span className={`badge ${leave.status === 'Accepted' ? 'bg-success' : leave.status === 'Rejected' ? 'bg-danger' : 'bg-warning'}`}>
                                        {leave.status}
                                    </span>
                                </td>
                                <td>
                                    {leave.status === 'pending' ? (
                                        <>
                                            {hasPermission('leave-accept-reject') && (
                                                <>
                                                    <button className="btn btn-success me-2" onClick={() => acceptRejectHandle('Accepted', leave.id)}>
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => acceptRejectHandle('Rejected', leave.id)}>
                                                        <FontAwesomeIcon icon={faSquareXmark} />
                                                    </button>
                                                </>
                                            )}
                                        </>
                                    ) : null}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center">
                                No leaves found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table> 
                {totalPages > 1 && (
                    <div>  
                        <p>Total Pages: {totalPages} | Total Leave: {total}</p> 
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
        </div>
    );
};

export default Leave;