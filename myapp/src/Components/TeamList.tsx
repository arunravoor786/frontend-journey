import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  isActive: boolean;
}
interface TeamListProps {
  team: Employee[];
  onAddMember: (member: Omit<Employee, 'id'>) => void;
}

const TeamList: React.FC<TeamListProps> = ({ team, onAddMember }) => {
  const [form, setForm] = useState({ name: '', role: '', email: '', isActive: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'isActive' ? value === 'true' : value
    }));
  };

  const submitMember = () => {
    if (!form.name || !form.role || !form.email) {
      alert('Fill all fields!');
      return;
    }
    onAddMember({ ...form });
    setForm({ name: '', role: '', email: '', isActive: true });
  };

  return (
    <div>
      <div>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="role" value={form.role} onChange={handleChange} placeholder="Role" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <select name="isActive" value={String(form.isActive)} onChange={handleChange}>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button onClick={submitMember}>Add Member</button>
      </div>
      <hr />
      <h2>Current Team</h2>
      {team.map(emp => (
        <div key={emp.id} className="card">
          <h3>{emp.name}</h3>
          <p>Role: {emp.role}</p>
          <p>Email: {emp.email}</p>
          <p>Status: {emp.isActive ? 'Active' : 'Inactive'}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamList;
