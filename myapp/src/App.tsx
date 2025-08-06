import React, { useState } from 'react';
import TeamList from './components/TeamList';

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

  // Add member (same as before)
  const addMember = (member: Omit<Employee, 'id'>) => {
    setTeam(prev => [...prev, { ...member, id: Date.now() }]);
  };

  // New: Delete member by id
  const deleteMember = (id: number) => {
    setTeam(prev => prev.filter(emp => emp.id !== id));
  };

  // New: Edit member by id (replace details)
  const editMember = (edited: Employee) => {
    setTeam(prev => prev.map(emp => emp.id === edited.id ? edited : emp));
  };

  return (
    <div>
      <h1>Team Directory (Day 14: Edit & Delete)</h1>
      <TeamList
        team={team}
        onAddMember={addMember}
        onDeleteMember={deleteMember}
        onEditMember={editMember}
      />
    </div>
  );
}

export default App;
