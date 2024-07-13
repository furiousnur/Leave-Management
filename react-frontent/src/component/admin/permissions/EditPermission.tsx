import React, {useState, useEffect, useRef} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { editPermission, updatePermission } from '../../../ApiRequest/ApiRequest';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditPermission: React.FC = () => {
    const [permission, setPermission] = useState({ name: '', status: '' });
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const hasFetched = useRef(false);
    
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true; 
        const fetchPermission = async () => {
            try {
                const response = await editPermission(id);
                if (response.data.statusCode === 401 || response.data.message === "Unauthorized") {
                    toast.error(response.data.message);
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else {
                    const { name, status } = response.data.data;
                    setPermission({ name, status });
                }
            } catch (error) {
                toast.error("An error occurred while fetching permission data.");
            }
        };
        fetchPermission();
    }, [id, navigate]);

    const formik = useFormik({
        initialValues: permission,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            status: Yup.string().required('Status is required')
        }),
        onSubmit: async (values) => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    toast.error("Token Not Found");
                    navigate('/');
                    return;
                }
                const response = await updatePermission(values, id);
                if (response.data.statusCode === 401 || response.data.message === "Unauthorized") {
                    toast.error(response.data.message);
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else if (response.data.error === "Bad Request") {
                    toast.error(response.data.error);
                } else {
                    toast.success('Permission updated successfully.');
                    navigate('/permissions/list');
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred");
            }
        },
    });

    return (
        <div className="container mt-5 mb-5">
            <h3 className="me-3">Update Permission</h3>
            <div className="mt-3">
                <form onSubmit={formik.handleSubmit} className="p-3 border rounded">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Permission Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter Permission Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-danger">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            className="form-select"
                            id="status"
                            name="status"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.status}
                        >
                            <option value="">Select Type</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        {formik.touched.status && formik.errors.status ? (
                            <div className="text-danger">{formik.errors.status}</div>
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

export default EditPermission;