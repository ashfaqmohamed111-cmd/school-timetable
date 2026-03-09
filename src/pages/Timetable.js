import React, { useState } from 'react';

function Timetable() {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSection, setSelectedSection] = useState('A');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '8:00 - 9:00',
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 1:00',
    '1:00 - 2:00',
    '2:00 - 3:00',
    '3:00 - 4:00'
  ];

  // Mock timetable data
  const [timetable] = useState({
    'Monday': {
      '8:00 - 9:00': { subject: 'Mathematics', teacher: 'VARAMATHU B', room: '101' },
      '9:00 - 10:00': { subject: 'Physics', teacher: 'MOHAMMED GANI BAI', room: '102' },
      '10:00 - 11:00': { subject: 'Chemistry', teacher: 'SYED MOHAMMED M', room: '103' },
      '11:00 - 12:00': { subject: 'Biology', teacher: 'AROGIKASAMI S', room: '104' },
      '2:00 - 3:00': { subject: 'English', teacher: 'RAAI DURAI R', room: '105' },
    },
    'Tuesday': {
      '8:00 - 9:00': { subject: 'Physics', teacher: 'MOHAMMED GANI BAI', room: '102' },
      '9:00 - 10:00': { subject: 'Chemistry', teacher: 'SYED MOHAMMED M', room: '103' },
      '10:00 - 11:00': { subject: 'Mathematics', teacher: 'VARAMATHU B', room: '101' },
      '2:00 - 3:00': { subject: 'Computer Science', teacher: 'JOHN DOE', room: '106' },
    }
  });

  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 
                   'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 
                   'Class 11', 'Class 12'];
  const sections = ['A', 'B', 'C', 'D'];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Timetable Management</h2>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          + Add Schedule
        </button>
      </div>

      {/* Class and Section Selection */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '20px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              width: '150px'
            }}
          >
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Section:</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              width: '100px'
            }}
          >
            {sections.map(sec => (
              <option key={sec} value={sec}>Section {sec}</option>
            ))}
          </select>
        </div>

        <button style={{
          padding: '8px 20px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Load Timetable
        </button>
      </div>

      {/* Timetable Grid */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '1000px'
        }}>
          <thead>
            <tr>
              <th style={{ 
                padding: '15px', 
                backgroundColor: '#1e1e2f', 
                color: 'white',
                border: '1px solid #333'
              }}>
                Day / Time
              </th>
              {timeSlots.map(slot => (
                <th key={slot} style={{ 
                  padding: '15px', 
                  backgroundColor: '#1e1e2f', 
                  color: 'white',
                  border: '1px solid #333'
                }}>
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map(day => (
              <tr key={day}>
                <td style={{ 
                  padding: '15px', 
                  fontWeight: 'bold',
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #ddd'
                }}>
                  {day}
                </td>
                {timeSlots.map(slot => {
                  const cell = timetable[day]?.[slot];
                  return (
                    <td key={`${day}-${slot}`} style={{ 
                      padding: '10px',
                      border: '1px solid #ddd',
                      textAlign: 'center',
                      backgroundColor: cell ? '#fff' : '#fafafa'
                    }}>
                      {cell ? (
                        <div>
                          <div style={{ fontWeight: 'bold', color: '#1976d2' }}>
                            {cell.subject}
                          </div>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            {cell.teacher}
                          </div>
                          <div style={{ fontSize: '11px', color: '#999' }}>
                            Room: {cell.room}
                          </div>
                        </div>
                      ) : (
                        <span style={{ color: '#ccc' }}>—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Timetable;
