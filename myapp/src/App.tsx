import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  isActive: boolean;
}

const initialTeam: Employee[] = [
  { id: 1, name: 'Arun Kumar', role: 'Frontend Developer', email: 'arun@example.com', isActive: true },
  { id: 2, name: 'Ashwin Ram', role: 'VB Operations', email: 'ashwin@example.com', isActive: false }
];

export default function App() {
  
  const [team, setTeam] = useState<Employee[]>(initialTeam);
  const [form, setForm] = useState({ name: '', role: '', email: '' });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const addMember = () => {
    if (!form.name || !form.role || !form.email) return alert('All fields required!');
    setTeam(prev => [
      ...prev,
      { id: Date.now(), name: form.name, role: form.role, email: form.email, isActive: true }
    ]);
    setForm({ name: '', role: '', email: '' }); // Reset form
  };

  return (
    <div>
      <h1>Team Directory</h1>
      <div>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="role" value={form.role} onChange={handleChange} placeholder="Role" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <button onClick={addMember}>Add Member</button>
      </div>
      <div>
        {team.map(member => (
          <div key={member.id} className="card">
            <h3>{member.name}</h3>
            <p>Role: {member.role}</p>
            <p>Email: {member.email}</p>
            <p>Status: {member.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
