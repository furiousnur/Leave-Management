import React from "react";
const Dashboard: React.FC = () => {
    return (
        <>
            <div className="profile-balance-container">
                <div className="profile">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile Picture" />
                    <h3>MD. Nur Alam</h3>
                    <p>Software Engineer</p>
                    <p>Department: Delivery</p>
                    <p>Username: md. nur @10401</p>
                </div>
                <div className="balance">
                    <h2>Leave Balance</h2>
                    <div className="value">22.5</div>
                    <div className="label">BALANCE LEAVES</div>
                    <div className="value">0</div>
                    <div className="label">AWARDS</div>
                </div>
            </div>

            <div className="timesheet">
                <h2>Your Missed TimeSheet (till last Monday)!</h2>
                <table>
                    <thead>
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
        </>
    );
};

export default Dashboard;