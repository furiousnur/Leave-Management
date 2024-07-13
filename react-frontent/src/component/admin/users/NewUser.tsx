import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {newRole, newUser} from '../../../ApiRequest/ApiRequest';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NewUser: React.FC = () => {
    const navigate = useNavigate();

    const generateUsername = (name) => {
        if (!name.trim()) {
            return '';
        }
        const nameParts = name.trim().split(' ');
        const baseName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ').toLowerCase().split(' ').join('.') : nameParts[0].toLowerCase();
        const randomSuffix = Math.floor(10000 + Math.random() * 90000);
        return `${baseName}@${randomSuffix}`;
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            name: '',
            password: '',
            confirmPassword: '',
            dob: '',
            position: '',
            department: '',
            profile_pic: 'pic.jpg'
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            name: Yup.string().required('Full Name is required'),
            password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
            dob: Yup.date().required('Date of Birth is required'),
            position: Yup.string().required('Position is required'),
            department: Yup.string().required('Department is required')
        }),
        onSubmit: async (values) => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    toast.error("Token Not Found");
                    window.location.href = '/';
                    return;
                }
                console.log(values);
                const response = await newUser(values);
                if (response.data.statusCode === 401 || response.data.message === "Unauthorized") {
                    toast.error(response.data.message);
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else if (response.data.error === "Bad Request") {
                    toast.error(response.data.error);
                } else {
                    toast.success('User created successfully.');
                    navigate('/users/list');
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred");
            }
        },
    });

    useEffect(() => {
        if (formik.values.name) {
            formik.setFieldValue('username', generateUsername(formik.values.name));
        } else {
            formik.setFieldValue('username', '');
        }
    }, [formik.values.name]);

    return (
        <div className="container mt-5 mb-5">
            <h3 className="me-3">New User</h3>
            <div className="mt-3">
                <form onSubmit={formik.handleSubmit} className="p-3 border rounded">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="username" className="form-label">UserName</label>
                            <input type="text" className="form-control" id="username" name="username" placeholder="User name will generate auto"
                                   readOnly={true} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
                            {formik.touched.username && formik.errors.username && (
                                <div className="text-danger">{formik.errors.username}</div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name"
                                   onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-danger">{formik.errors.name}</div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password"
                                   onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-danger">{formik.errors.password}</div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password"
                                   onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <div className="text-danger">{formik.errors.confirmPassword}</div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <input type="date" className="form-control" id="dob" name="dob"
                                   onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.dob} />
                            {formik.touched.dob && formik.errors.dob && (
                                <div className="text-danger">{formik.errors.dob}</div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="department" className="form-label">Department</label>
                            <select className="form-select" id="department" name="department" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.department}>
                                <option value="">Select Department</option>
                                <option value="Software">Software</option>
                                <option value="Business">Business</option>
                                <option value="QA">QA</option>
                            </select>
                            {formik.touched.department && formik.errors.department && (
                                <div className="text-danger">{formik.errors.department}</div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="position" className="form-label">Position</label>
                            <select className="form-select" id="position" name="position" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.position}>
                                <option value="">Select Position</option>
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="Sr. Software Engineer">Sr. Software Engineer</option>
                                <option value="HR">HR</option>
                                <option value="Team Lead">Team Lead</option>
                                <option value="QA Lead">QA Lead</option>
                                <option value="QA">QA</option>
                            </select>
                            {formik.touched.position && formik.errors.position && (
                                <div className="text-danger">{formik.errors.position}</div>
                            )}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="btn btn-success" style={{ width: '200px' }}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewUser;
