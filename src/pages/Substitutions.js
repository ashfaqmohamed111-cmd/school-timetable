import React, { useState } from 'react';
import { useSubstitution } from '../context/SubstitutionContext';

function Substitutions() {
  const { substitutions, leaveRequests, approveSubstitution, rejectSubstitution } = useSubstitution();
  const [activeTab, setActiveTab] = useState('substitutions');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    teacher: '',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const teachers = [
    'VARAMATHU B',
    'MOHAMMED GANI BAI',
    'SYED MOHAMMED M',
    'AROGIKASAMI S',
    'RAAI DURAI R'
  ];

  const getStatusBadge = (status) => {
    const colors = {
      pending: { bg: '#fff3cd', color: '#856404' },
      approved: { bg: '#d4edda', color: '#155724' },
      rejected: { bg: '#f8d7da', color: '#721c24' }
    };
    const style = colors[status] || colors.pending;
    
    return (
      <span style={{
        backgroundColor: style.bg,
        color: style.color,
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>Teacher Substitution System</h2>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        borderBottom: '2px solid #ddd',
        paddingBottom: '10px'
      }}>
        <button
          onClick={() => setActiveTab('substitutions')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'substitutions' ? '#1976d2' : '#f5f5f5',
            color: activeTab === 'substitutions' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Substitutions
        </button>
        <button
          onClick={() => setActiveTab('leaves')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'leaves' ? '#1976d2' : '#f5f5f5',
            color: activeTab === 'leaves' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Leave Requests
        </button>
        <button
          onClick={() => setActiveTab('available')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'available' ? '#1976d2' : '#f5f5f5',
            color: activeTab === 'available' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Find Substitute
        </button>
      </div>

      {/* Substitutions Tab */}
      {activeTab === 'substitutions' && (
        <div>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <h3>Substitution Requests</h3>
            <button
              onClick={() => setShowRequestForm(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              + Request Substitute
            </button>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e1e2f', color: 'white' }}>
                  <th style={{ padding: '12px' }}>Date</th>
                  <th style={{ padding: '12px' }}>Original Teacher</th>
                  <th style={{ padding: '12px' }}>Substitute</th>
                  <th style={{ padding: '12px' }}>Class</th>
                  <th style={{ padding: '12px' }}>Subject</th>
                  <th style={{ padding: '12px' }}>Time Slot</th>
                  <th style={{ padding: '12px' }}>Reason</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {substitutions.map(sub => (
                  <tr key={sub.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{sub.date}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{sub.originalTeacher}</td>
                    <td style={{ padding: '12px' }}>{sub.substituteTeacher}</td>
                    <td style={{ padding: '12px' }}>{sub.class}</td>
                    <td style={{ padding: '12px' }}>{sub.subject}</td>
                    <td style={{ padding: '12px' }}>{sub.timeSlot}</td>
                    <td style={{ padding: '12px' }}>{sub.reason}</td>
                    <td style={{ padding: '12px' }}>{getStatusBadge(sub.status)}</td>
                    <td style={{ padding: '12px' }}>
                      {sub.status === 'pending' && (
                        <>
                          <button
                            onClick={() => approveSubstitution(sub.id)}
                            style={{
                              padding: '4px 8px',
                              marginRight: '5px',
                              backgroundColor: '#4caf50',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectSubstitution(sub.id)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#f44336',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Leave Requests Tab */}
      {activeTab === 'leaves' && (
        <div>
          <h3>Leave Requests</h3>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginTop: '20px',
            overflow: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e1e2f', color: 'white' }}>
                  <th style={{ padding: '12px' }}>Teacher</th>
                  <th style={{ padding: '12px' }}>From Date</th>
                  <th style={{ padding: '12px' }}>To Date</th>
                  <th style={{ padding: '12px' }}>Reason</th>
                  <th style={{ padding: '12px' }}>Applied On</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map(leave => (
                  <tr key={leave.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{leave.teacherName}</td>
                    <td style={{ padding: '12px' }}>{leave.fromDate}</td>
                    <td style={{ padding: '12px' }}>{leave.toDate}</td>
                    <td style={{ padding: '12px' }}>{leave.reason}</td>
                    <td style={{ padding: '12px' }}>{leave.appliedOn}</td>
                    <td style={{ padding: '12px' }}>{getStatusBadge(leave.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Find Substitute Tab */}
      {activeTab === 'available' && (
        <div>
          <h3>Find Available Substitute</h3>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginTop: '20px'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date:</label>
                <input
                  type="date"
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Time Slot:</label>
                <select style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}>
                  <option>8:00 - 9:00</option>
                  <option>9:00 - 10:00</option>
                  <option>10:00 - 11:00</option>
                  <option>11:00 - 12:00</option>
                  <option>12:00 - 1:00</option>
                  <option>1:00 - 2:00</option>
                  <option>2:00 - 3:00</option>
                  <option>3:00 - 4:00</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Subject:</label>
                <input
                  type="text"
                  placeholder="e.g., Mathematics"
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
            </div>
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Search Available Teachers
            </button>
          </div>
        </div>
      )}

      {/* Request Form Modal */}
      {showRequestForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            width: '400px'
          }}>
            <h3 style={{ marginBottom: '20px' }}>Request Substitute</h3>
            <form>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Original Teacher:</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
                  {teachers.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Date:</label>
                <input type="date" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Reason:</label>
                <textarea rows="3" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Substitutions;
