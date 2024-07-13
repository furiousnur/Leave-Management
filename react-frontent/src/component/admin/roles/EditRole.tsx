import React, {useState, useEffect, useRef} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { editRole, updateRole } from '../../../ApiRequest/ApiRequest';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditRole: React.FC = (props) => {
    const permissions = props.permissions || [];
    const [role, setRole] = useState({ name: '', status: '', permissions: [] });
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const hasFetched = useRef(false);
    
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true; 
        const fetchRole = async () => {
            try {
                const response = await editRole(id);
                if (response.data.statusCode === 401 || response.data.message === "Unauthorized") {
                    toast.error(response.data.message);
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else {
                    const { name, status, permissions } = response.data.data;
                    setRole({
                        name,
                        status,
                        permissions: permissions ? permissions.map(p => p.permissionId.toString()) : []
                    });
                }
            } catch (error) {
                toast.error("An error occurred while fetching role data.");
            }
        };
        fetchRole();
    }, [id, navigate]);

    const formik = useFormik({
        initialValues: { ...role, permissions: role.permissions || [] },
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
                const response = await updateRole(values, id);
                if (response.data.statusCode === 401 || response.data.message === "Unauthorized") {
                    toast.error(response.data.message);
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else if (response.data.error === "Bad Request") {
                    toast.error(response.data.error);
                } else {
                    toast.success('Role updated successfully.');
                    // navigate('/roles/list');
                    window.location.href = '/roles/list';
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred");
            }
        },
    });

    const handlePermissionChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            formik.setFieldValue('permissions', [...formik.values.permissions, value]);
        } else {
            formik.setFieldValue('permissions', formik.values.permissions.filter(p => p !== value));
        }
    };
    const getCategoryFromPermissionName = (name) => {
        const parts = name.split('-');
        return parts.length > 1 ? parts[0] : 'Others';
    };

    const categorizedPermissions = permissions.reduce((acc, permission) => {
        const category = getCategoryFromPermissionName(permission.name);
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(permission);
        return acc;
    }, {}); 
    return (
        <div className="container mt-5 mb-5">
            <h3 className="me-3">Update Role</h3>
            <div className="mt-3">
                <form onSubmit={formik.handleSubmit} className="p-3 border rounded">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Role Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter Role Name"
                            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-danger">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select className="form-select" id="status" name="status" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.status}>
                            <option value="">Select Type</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        {formik.touched.status && formik.errors.status ? (
                            <div className="text-danger">{formik.errors.status}</div>
                        ) : null}
                    </div>
                    {Object.entries(categorizedPermissions).map(([category, perms]) => (
                        <div key={category} className="mb-3">
                            <h5>{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                            <div className="row">
                                {perms.map(permission => (
                                    <div key={permission.id} className="col-md-3">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`permission-${permission.id}`}
                                                name="permissions"
                                                value={permission.id}
                                                onChange={handlePermissionChange}
                                                checked={formik.values.permissions.includes(permission.id.toString())}
                                            />
                                            <label className="form-check-label" htmlFor={`permission-${permission.id}`}>
                                                {permission.name.replace(/-/g, ' ')}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success" style={{ width: '200px' }}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRole;