import React, { createContext, useState, useContext } from 'react';

const SubstitutionContext = createContext();

export function useSubstitution() {
  return useContext(SubstitutionContext);
}

export function SubstitutionProvider({ children }) {
  const [substitutions, setSubstitutions] = useState([
    {
      id: 1,
      date: '2026-03-10',
      originalTeacher: 'MOHAMMED GANI BAI',
      substituteTeacher: 'SYED MOHAMMED M',
      class: '11B',
      subject: 'Physics',
      timeSlot: '9:00 - 10:00',
      reason: 'Sick Leave',
      status: 'approved',
      requestedBy: 'Teacher',
      approvedBy: 'Admin'
    },
    {
      id: 2,
      date: '2026-03-11',
      originalTeacher: 'VARAMATHU B',
      substituteTeacher: 'RAAI DURAI R',
      class: '10A',
      subject: 'Mathematics',
      timeSlot: '8:00 - 9:00',
      reason: 'Personal Leave',
      status: 'pending',
      requestedBy: 'Teacher',
      approvedBy: null
    }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      teacherName: 'AROGIKASAMI S',
      fromDate: '2026-03-15',
      toDate: '2026-03-17',
      reason: 'Medical Leave',
      status: 'pending',
      appliedOn: '2026-03-10'
    }
  ]);

  const addSubstitution = (substitution) => {
    const newSub = {
      ...substitution,
      id: substitutions.length + 1,
      status: 'pending'
    };
    setSubstitutions([...substitutions, newSub]);
    return newSub;
  };

  const approveSubstitution = (id) => {
    setSubstitutions(substitutions.map(sub => 
      sub.id === id ? { ...sub, status: 'approved' } : sub
    ));
  };

  const rejectSubstitution = (id) => {
    setSubstitutions(substitutions.map(sub => 
      sub.id === id ? { ...sub, status: 'rejected' } : sub
    ));
  };

  const findAvailableTeachers = (date, timeSlot, subject) => {
    // Mock available teachers - in real app, check against timetable
    const allTeachers = [
      { name: 'SYED MOHAMMED M', subject: 'Chemistry', available: true },
      { name: 'RAAI DURAI R', subject: 'English', available: true },
      { name: 'JOHN DOE', subject: 'Computer Science', available: true },
      { name: 'JANE SMITH', subject: 'Mathematics', available: true }
    ];
    
    // Filter teachers who are available at that time
    return allTeachers.filter(t => t.available);
  };

  return (
    <SubstitutionContext.Provider value={{
      substitutions,
      leaveRequests,
      addSubstitution,
      approveSubstitution,
      rejectSubstitution,
      findAvailableTeachers
    }}>
      {children}
    </SubstitutionContext.Provider>
  );
}
