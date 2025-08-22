import React, { useState } from 'react';
import TeamList from './Components/TeamList';

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

function App() {
  const [team, setTeam] = useState<Employee[]>(initialTeam);
  const [search, setSearch] = useState<string>("");

 
  const filteredTeam = team.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.role.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase())
  );

 
  const addMember = (member: Omit<Employee, 'id'>) => {
    setTeam(prev => [...prev, { ...member, id: Date.now() }]);
  };
  const deleteMember = (id: number) => setTeam(prev => prev.filter(emp => emp.id !== id));
  const editMember = (edited: Employee) => setTeam(prev => prev.map(emp => emp.id === edited.id ? edited : emp));

  return (
    <div>
      <h1>Team Directory (Day 15: Searching & Filtering)</h1>
      <input
        placeholder="Search by name, role, or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: "1em", width: "60%", padding: "0.5em" }}
      />
      <TeamList
        team={filteredTeam}
        onAddMember={addMember}
        onDeleteMember={deleteMember}
        onEditMember={editMember}
      />
    </div>
  );
}

export default App;
