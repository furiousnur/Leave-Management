import React, { useEffect, useState } from "react";

const Dashboard: React.FC<{ userDetails: any }> = (props) => {
    const { userDetails } = props;
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (userDetails && userDetails.profile) {
            setProfile(userDetails.profile);
        }
    }, [userDetails]);

    return (
        <div className="container">
            <div className="row profile-balance-container mb-4">
                <div className="col-md-6 profile d-flex align-items-center">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile Picture" className="me-3" />
                    <div>
                        <h3>{profile?.name || 'N/A'}</h3>
                        <p>{profile?.position || 'N/A'}</p>
                        <p>Department: {profile?.department || 'N/A'}</p>
                        <p>Username: {userDetails?.username || 'N/A'}</p>
                    </div>
                </div>
                <div className="col-md-6 balance">
                    <h2>Leave Balance</h2>
                    <div className="value">22.5</div>
                    <div className="label">BALANCE LEAVES</div>
                    <div className="value">0</div>
                    <div className="label">AWARDS</div>
                </div>
            </div>

            <div className="timesheet">
                <h2>Your Missed TimeSheet (till last Monday)!</h2>
                <table className="table table-bordered">
                    <thead className="table-light">
                    <tr>
                        <th>11-Mar-2022</th>
                        <th>18-Mar-2022</th>
                        <th>25-Mar-2022</th>
                        <th>01-Apr-2022</th>
                        <th>08-Apr-2022</th>
                        <th>15-Apr-2022</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="date">22-Apr-2022</td>
                        <td className="date">29-Apr-2022</td>
                        <td className="date">06-May-2022</td>
                        <td className="date">13-May-2022</td>
                        <td className="date">20-May-2022</td>
                        <td className="date">27-May-2022</td>
                    </tr>
                    <tr>
                        <td className="date">22-Apr-2022</td>
                        <td className="date">29-Apr-2022</td>
                        <td className="date">06-May-2022</td>
                        <td className="date">13-May-2022</td>
                        <td className="date">20-May-2022</td>
                        <td className="date">27-May-2022</td>
                    </tr>
                    <tr>
                        <td className="date">22-Apr-2022</td>
                        <td className="date">29-Apr-2022</td>
                        <td className="date">06-May-2022</td>
                        <td className="date">13-May-2022</td>
                        <td className="date">20-May-2022</td>
                        <td className="date">27-May-2022</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
