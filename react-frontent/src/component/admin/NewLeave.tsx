import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { newLeave } from '../../ApiRequest/ApiRequest';

const NewLeave: React.FC = () => {
    const userDetails = localStorage.getItem('userDetails');
    const userName = userDetails ? JSON.parse(userDetails).username : '';
    const userId = userDetails ? JSON.parse(userDetails).id : '';
    const [successResponse, setSuccessResponse] = useState('');
    const [errorResponse, setErrorResponse] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessResponse('');
            setErrorResponse('');
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, [successResponse, errorResponse]);

    const formik = useFormik({
        initialValues: {
            userId: userId,
            leave_type: '',
            date_from: '',
            date_to: '',
            reason: '',
        },
        validationSchema: Yup.object({
            leave_type: Yup.string().required('Leave type is required'),
            date_from: Yup.date().required('Start date is required'),
            date_to: Yup.date().required('End date is required'),
            reason: Yup.string().required('Reason is required'),
        }),
        onSubmit: async (values) => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    window.location.href = '/';
                    throw new Error("Token Not Found");
                }
                const response = await newLeave(values);
                if (response.data.statusCode === 401 || response.data.message === "Unauthorized") {
                    setErrorResponse(response.data.message);
                    localStorage.removeItem('authToken');
                    window.location.href = '/';
                } else {
                    if (response.data.error === "Bad Request") {
                        setErrorResponse(response.data.error);
                    } else {
                        setSuccessResponse(response.data.message);
                        window.location.href = '/leaves';
                    }
                }
            } catch (error) {
                setErrorResponse(error.response.data.message || "An error occurred");
            }
        },
    });

    return (
        <div className="container mt-5 mb-5">
            <h3 className="me-3">New Leaves / Comp Off</h3>
            {errorResponse && <h4 className="error-message">{errorResponse}</h4>}
            {successResponse && <h4 className="success-message">{successResponse}</h4>}
            <div className="mt-3">
                <form onSubmit={formik.handleSubmit} className="p-3 border rounded">
                    <div className="mb-3">
                        <label htmlFor="userId" className="form-label">Employee</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userId"
                            name="userId"
                            value={userName}
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="leave_type" className="form-label">Leave Type</label>
                        <select
                            className="form-select"
                            id="leave_type"
                            name="leave_type"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.leave_type}
                        >
                            <option value="">Select Type</option>
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
                        {formik.touched.leave_type && formik.errors.leave_type ? (
                            <div className="text-danger">{formik.errors.leave_type}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date_from" className="form-label">Date From</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date_from"
                            name="date_from"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.date_from}
                        />
                        {formik.touched.date_from && formik.errors.date_from ? (
                            <div className="text-danger">{formik.errors.date_from}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date_to" className="form-label">Date To</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date_to"
                            name="date_to"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.date_to}
                        />
                        {formik.touched.date_to && formik.errors.date_to ? (
                            <div className="text-danger">{formik.errors.date_to}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="reason" className="form-label">Reason</label>
                        <textarea
                            className="form-control"
                            id="reason"
                            name="reason"
                            rows="3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.reason}
                        ></textarea>
                        {formik.touched.reason && formik.errors.reason ? (
                            <div className="text-danger">{formik.errors.reason}</div>
                        ) : null}
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success" style={{ width: '200px' }}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewLeave;