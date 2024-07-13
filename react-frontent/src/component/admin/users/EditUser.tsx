import React, {useEffect, useRef} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {userEdit, updateUser} from '../../../ApiRequest/ApiRequest';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const hasFetched = useRef(false);

    const formik = useFormik({
        initialValues: { 
            name: '',
            dob: '',
            position: '',
            department: '',
            profile_pic: 'pic.jpg',
        },
        validationSchema: Yup.object({ 
            name: Yup.string().required('Full Name is required'),
            dob: Yup.date().required('Date of Birth is required'),
            position: Yup.string().required('Position is required'),
            department: Yup.string().required('Department is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await updateUser(values, id);
                if (response.data.statusCode === 401 || response.data.message === 'Unauthorized') {
                    toast.error(response.data.message);
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else if (response.data.error === 'Bad Request') {
                    toast.error(response.data.error);
                } else {
                    toast.success('User updated successfully.');
                    navigate('/users/list');
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'An error occurred');
            }
        },
    });

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const fetchUserData = async () => {
            try {
                const response = await userEdit(id);
                if (response.data.statusCode === 401 || response.data.message === 'Unauthorized') {
                    toast.error(response.data.message);
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else {
                    const user = response.data.data;
                    formik.setValues({
                        ...formik.values, 
                        name: user.profile.name,
                        dob: user.profile.dob,
                        position: user.profile.position,
                        department: user.profile.department,
                    });
                }
            } catch (error) {
                toast.error('An error occurred while fetching user data.');
            }
        };

        fetchUserData();
    }, [id, navigate, formik]);

    return (
        <div className="container mt-5 mb-5">
            <h3 className="me-3">Edit User</h3>
            <div className="mt-3">
                <form onSubmit={formik.handleSubmit} className="p-3 border rounded">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name"
                                   onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-danger">{formik.errors.name}</div>
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

export default EditUser;
