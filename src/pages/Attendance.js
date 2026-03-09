import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filter, setFilter] = useState('all');
  const { user } = useAuth();

  // Mock data - similar to your image
  const [attendanceData] = useState([
    {
      id: 1,
      teacherName: 'VARAMATHU B',
      vehicleNo: 'NL0189047',
      date: '3/9/2026',
      serviceType: 'Double',
      type: 'TRIP',
      route: 'Truchendru – Chennai',
      rating: 0,
      baseSalary: 0,
      haltAllowance: 0,
      ratingBonus: 0,
      mileageBonus: 0,
      total: 0,
      status: 'FENDING'
    },
    {
      id: 2,
      teacherName: 'MOHAMMED GANI BAI',
      vehicleNo: 'TN18879037',
      date: '3/9/2026',
      serviceType: 'Single',
      type: 'TRIP',
      route: 'Chennai – nagarcoil',
      rating: 0,
      baseSalary: 0,
      haltAllowance: 0,
      ratingBonus: 0,
      mileageBonus: 0,
      total: 310,
      status: 'FENDING'
    },
    {
      id: 3,
      teacherName: 'SYED MOHAMMED M',
      vehicleNo: 'TN18854275',
      date: '3/9/2026',
      serviceType: 'Double',
      type: 'TRIP',
      route: 'Chennai – munyar',
      rating: 0,
      baseSalary: 0,
      haltAllowance: 0,
      ratingBonus: 0,
      mileageBonus: 0,
      total: 1390,
      status: 'FENDING'
    },
    {
      id: 4,
      teacherName: 'AROGIKASAMI S',
      vehicleNo: 'TN18879037',
      date: '3/9/2026',
      serviceType: 'Single',
      type: 'TRIP',
      route: 'Chennai – nagarcoil',
      rating: 0,
      baseSalary: 0,
      haltAllowance: 0,
      ratingBonus: 0,
      mileageBonus: 0,
      total: 1400,
      status: 'FENDING'
    },
    {
      id: 5,
      teacherName: 'RAAI DURAI R',
      vehicleNo: 'TN18809202',
      date: '3/9/2026',
      serviceType: 'Single',
      type: 'TRIP',
      route: 'Chennai – varkala',
      rating: 0,
      baseSalary: 0,
      haltAllowance: 0,
      ratingBonus: 0,
      mileageBonus: 0,
      total: 2900,
      status: 'FENDING'
    }
  ]);

  // Calculate stats
  const totalTrips = attendanceData.length;
  const approved = attendanceData.filter(d => d.status === 'APPROVED').length;
  const pending = attendanceData.filter(d => d.status === 'FENDING').length;
  const totalSalary = attendanceData.reduce((sum, d) => sum + d.total, 0);

  const getStatusColor = (status) => {
    switch(status) {
      case 'APPROVED': return '#4caf50';
      case 'FENDING': return '#ff9800';
      case 'REJECTED': return '#f44336';
      default: return '#999';
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>Driver Trips / Teacher Attendance</h2>
      
      {/* Stats Cards - Similar to your image */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: '14px' }}>Total Trips</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{totalTrips}</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: '14px' }}>Approved</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4caf50' }}>{approved}</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: '14px' }}>Pending</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff9800' }}>{pending}</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: '14px' }}>Total Salary</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>₦{totalSalary}</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: '14px' }}>All Drivers</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>5</div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div>
            <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>
          
          <div>
            <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            >
              <option value="all">All Drivers</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div>
          <button style={{
            padding: '8px 16px',
            marginRight: '10px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            🔄 Refresh Data
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* Main Table - Similar to your image */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '1200px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Driver</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Vehicle</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Service Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Route</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Rating</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Base Salary</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Halt Allowance</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Rating Bonus</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Mileage Bonus</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Total</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #eee', hover: { backgroundColor: '#f9f9f9' } }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{row.teacherName}</td>
                <td style={{ padding: '12px' }}>{row.vehicleNo}</td>
                <td style={{ padding: '12px' }}>{row.date}</td>
                <td style={{ padding: '12px' }}>{row.serviceType}</td>
                <td style={{ padding: '12px' }}>{row.type}</td>
                <td style={{ padding: '12px' }}>{row.route}</td>
                <td style={{ padding: '12px' }}>{row.rating}</td>
                <td style={{ padding: '12px' }}>₦{row.baseSalary}</td>
                <td style={{ padding: '12px' }}>₦{row.haltAllowance}</td>
                <td style={{ padding: '12px' }}>₦{row.ratingBonus}</td>
                <td style={{ padding: '12px' }}>₦{row.mileageBonus}</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>₦{row.total}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: getStatusColor(row.status),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button style={{
                    padding: '4px 8px',
                    marginRight: '5px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>
                    Approve
                  </button>
                  <button style={{
                    padding: '4px 8px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <div>09-03-2026</div>
        <div>All Drivers</div>
        <div>Export CSV</div>
      </div>
    </div>
  );
}

export default Attendance;
