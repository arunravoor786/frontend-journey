import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  isActive: boolean;
}

const initialTeam: Employee[] = [
  { id: 1, name: "ArunKumar", role: "Developer", email: "arunkumar@gmail.com", isActive: true },
  { id: 2, name: "Ashwin Ram", role: "VB-operations", email: "ashwinram@gmail.com", isActive: true },
];

function App() {
  const [team, setTeam] = useState<Employee[]>(initialTeam);

  const [newMember, setNewMember] = useState({ name: '', role: '', email: '' });

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      [e.target.name]: e.target.value
    });
  };  

  const addMember = () => {
    if (!newMember.name || !newMember.role || !newMember.email) {
      alert("Please fill all fields");
      return;
    }
    const member: Employee = {
      id: Date.now(),
      ...newMember,
      isActive: true
    };
    setTeam([...team, member]);
    setNewMember({ name: '', role: '', email: '' });    
  };

  return (
    <div>
      <h1>Team Directory</h1>
     <input name="name" value={newMember.name} onChange={handlechange} placeholder="Name" />
      <input name="role" value={newMember.role} onChange={handlechange} placeholder="Role" />
      <input name="email" value={newMember.email} onChange={handlechange} placeholder="Email" />
      <button onClick={addMember}>Add Member</button>
      {team.map(member => (
        <div key={member.id} className="card">
          <h3>{member.name}</h3>
          <p>Role: {member.role}</p>
          <p>Email: {member.email}</p>
          <p>Status: {member.isActive ? 'Active' : 'Inactive'}</p>
        </div>
      ))}
    </div>
      
  );
}


export default App;