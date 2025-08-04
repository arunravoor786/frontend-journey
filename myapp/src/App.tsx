import React from 'react';
import EmployeeCard from './Components/EmployeeCard';


interface Employee {
    id: number;
    name: string;
    role: string;
    email: string;
    isActive: boolean;
}

const team: Employee[] = [
    { id: 1, name: "ArunKumar", role: "Developer", email: "arun@gmail.com", isActive: true },
    { id: 2, name: "Ashwin Ram", role: "VB-operations", email: "ashwin@gmail.com", isActive: true },
];

const  App: React.FC = () => (
  <div>
    <h1>Team Directory</h1>
    {team.map(member => (
      <EmployeeCard
        key={member.id}
        name={member.name}
        role={member.role}
        email={member.email}
        isActive={member.isActive}
      />
    ))}
  </div>
);

export default App;