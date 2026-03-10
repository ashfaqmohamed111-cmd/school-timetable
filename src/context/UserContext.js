import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function useUsers() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john.smith@school.com',
      role: 'admin', 
      age: 35, 
      gender: 'Male',
      subject: 'Administration',
      joinDate: '2025-01-15',
      status: 'active',
      avatar: '👨💼'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      email: 'sarah.j@school.com',
      role: 'teacher', 
      age: 28, 
      gender: 'Female',
      subject: 'Mathematics',
      joinDate: '2025-02-10',
      status: 'active',
      avatar: '👩🏫'
    },
    { 
      id: 3, 
      name: 'Michael Chen', 
      email: 'm.chen@school.com',
      role: 'teacher', 
      age: 32, 
      gender: 'Male',
      subject: 'Physics',
      joinDate: '2025-01-20',
      status: 'active',
      avatar: '👨🔬'
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      email: 'e.davis@school.com',
      role: 'admin', 
      age: 42, 
      gender: 'Female',
      subject: 'Student Affairs',
      joinDate: '2024-11-05',
      status: 'active',
      avatar: '👩💼'
    },
  ]);

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: users.length + 1,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      avatar: userData.role === 'admin' ? '👨💼' : '👩🏫'
    };
    setUsers([...users, newUser]);
    return newUser;
  };

  const updateUser = (id, updatedData) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, ...updatedData } : user
    ));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const getUsersByRole = (role) => {
    return users.filter(user => user.role === role);
  };

  return (
    <UserContext.Provider value={{
      users,
      addUser,
      updateUser,
      deleteUser,
      getUsersByRole
    }}>
      {children}
    </UserContext.Provider>
  );
}
