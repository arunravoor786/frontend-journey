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
  onDeleteMember: (id: number) => void;
  onEditMember: (emp: Employee) => void;
}

const TeamList: React.FC<TeamListProps> = ({ team, onAddMember, onDeleteMember, onEditMember }) => {
  const [form, setForm] = useState({ name: '', role: '', email: '', isActive: true });
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', role: '', email: '', isActive: true });

  // Handle add form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditForm(prev => ({
        ...prev,
        [name]: name === 'isActive' ? value === 'true' : value
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: name === 'isActive' ? value === 'true' : value
      }));
    }
  };

  // Submit new member
  const submitMember = () => {
    if (!form.name || !form.role || !form.email) {
      alert('Fill all fields!');
      return;
    }
    onAddMember({ ...form });
    setForm({ name: '', role: '', email: '', isActive: true });
  };

  // Start editing
  const startEdit = (emp: Employee) => {
    setEditId(emp.id);
    setEditForm({
      name: emp.name,
      role: emp.role,
      email: emp.email,
      isActive: emp.isActive
    });
  };

  // Save edits
  const saveEdit = (id: number) => {
    onEditMember({ ...editForm, id });
    setEditId(null);
  };

  return (
    <div>
      {/* Add Member Form */}
      <input name="name" value={form.name} onChange={e => handleChange(e)} placeholder="Name" />
      <input name="role" value={form.role} onChange={e => handleChange(e)} placeholder="Role" />
      <input name="email" value={form.email} onChange={e => handleChange(e)} placeholder="Email" />
      <select name="isActive" value={String(form.isActive)} onChange={e => handleChange(e)}>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      <button onClick={submitMember}>Add Member</button>
      <hr />
      <h2>Current Team</h2>
      {team.map(emp => (
        <div key={emp.id} className="card" style={{ marginBottom: "1rem" }}>
          {editId === emp.id ? (
            <div>
              <input name="name" value={editForm.name} onChange={e => handleChange(e, true)} />
              <input name="role" value={editForm.role} onChange={e => handleChange(e, true)} />
              <input name="email" value={editForm.email} onChange={e => handleChange(e, true)} />
              <select name="isActive" value={String(editForm.isActive)} onChange={e => handleChange(e, true)}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <button onClick={() => saveEdit(emp.id)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{emp.name}</h3>
              <p>Role: {emp.role}</p>
              <p>Email: {emp.email}</p>
              <p>Status: {emp.isActive ? 'Active' : 'Inactive'}</p>
              <button onClick={() => startEdit(emp)}>Edit</button>
              <button onClick={() => onDeleteMember(emp.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamList;
