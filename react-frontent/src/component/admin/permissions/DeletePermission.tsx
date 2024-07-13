import React, { useEffect, useRef } from 'react';
import { deletePermission } from '../../../ApiRequest/ApiRequest';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const DeletePermission: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true; 
        const fetchPermission = async () => {
            try {
                const response = await deletePermission(id);
                if (response.data.statusCode === 401 || response.data.message === "Unauthorized") {
                    toast.error(response.data.message);
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else {
                    toast.success('Permission deleted successfully.');
                    navigate('/permissions/list');
                }
            } catch (error) {
                toast.error("An error occurred while fetching permission data.");
            }
        };

        if (id) {
            fetchPermission();
        }
    }, [id, navigate]);

    return (
        <>
            <h5>Loading....</h5>
        </>
    );
};

export default DeletePermission;