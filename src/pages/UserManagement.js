import React, { useState } from 'react';
import { useUsers } from '../context/UserContext';
import AddUserForm from '../components/Users/AddUserForm';

import { useAuth } from '../context/AuthContext';

function UserManagement() {
  const { users, deleteUser } = useUsers();
  const { user: currentUser } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [filterRole, setFilterRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    teachers: users.filter(u => u.role === 'teacher').length,
    active: users.filter(u => u.status === 'active').length
  };

  return (
    <div>
      {/* Header with Stats */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>User Management</h2>
        
        {/* Action Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              <option value="all">All Users</option>
              <option value="admin">Admins</option>
              <option value="teacher">Teachers</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  width: '300px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            {currentUser?.role === 'superadmin' && (
              <button
                onClick={() => {
                  setEditingUser(null);
                  setShowAddForm(true);
                }}
                style={{
                  padding: '12px 24px',
                  background: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Add New User
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Name</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Email</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Role</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Subject</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Joined</th>
              {currentUser?.role === 'superadmin' && (
                <th style={{ padding: '15px', textAlign: 'right', fontWeight: 'bold' }}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '15px' }}>
                  <div style={{ fontWeight: '500' }}>{user.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{user.age} yrs | {user.gender}</div>
                </td>
                <td style={{ padding: '15px', color: '#666' }}>{user.email}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    background: '#e9ecef',
                    color: '#495057',
                    textTransform: 'capitalize'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>{user.subject}</td>
                <td style={{ padding: '15px' }}>{new Date(user.joinDate).toLocaleDateString()}</td>
                
                {currentUser?.role === 'superadmin' && (
                  <td style={{ padding: '15px', textAlign: 'right' }}>
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setShowAddForm(true);
                      }}
                      style={{
                        padding: '6px 12px',
                        background: 'transparent',
                        border: '1px solid #1976d2',
                        color: '#1976d2',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '8px',
                        fontSize: '13px'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete ${user.name}?`)) {
                          deleteUser(user.id);
                        }
                      }}
                      style={{
                        padding: '6px 12px',
                        background: 'transparent',
                        border: '1px solid #dc3545',
                        color: '#dc3545',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '13px'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={currentUser?.role === 'superadmin' ? 6 : 5} style={{ padding: '30px', textAlign: 'center', color: '#666' }}>
                  No users found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Form Modal */}
      {showAddForm && (
        <AddUserForm 
          userToEdit={editingUser}
          onClose={() => {
            setShowAddForm(false);
            setEditingUser(null);
          }}
          onSuccess={() => {
            setShowAddForm(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}

export default UserManagement;
