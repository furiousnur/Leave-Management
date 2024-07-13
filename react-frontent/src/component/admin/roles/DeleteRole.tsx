import React, { useEffect, useRef } from 'react';
import { deleteRole } from '../../../ApiRequest/ApiRequest';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteRole: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true; 
        const fetchRole = async () => {
            try {
                const response = await deleteRole(id);
                if (response.data.statusCode === 401 || response.data.message === "Unauthorized") {
                    toast.error(response.data.message);
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else {
                    toast.success('Role deleted successfully.');
                    navigate('/roles/list');
                }
            } catch (error) {
                toast.error("An error occurred while fetching role data.");
            }
        };

        if (id) {
            fetchRole();
        }
    }, [id, navigate]);

    return (
        <>
            <h5>Loading....</h5>
        </>
    );
};

export default DeleteRole;