import React from 'react';

interface EmployeeCardProps {
    name: string;
    role: string;
    email: string;
    isActive: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ name, role, email, isActive }) => (
    <div className="card">
        <h3>{name}</h3>
        <p>Role: {role}</p>
        <p>Email: {email}</p>
        {isActive ? <p>Status: Active</p> : <p> Status: Inactive</p>}
    </div>
);

export default EmployeeCard;
