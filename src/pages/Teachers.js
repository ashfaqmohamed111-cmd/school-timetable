import React, { useState } from 'react';

function Teachers() {
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'VARAMATHU B', employeeId: 'T001', subject: 'Mathematics', qualification: 'M.Sc, B.Ed', experience: '8 years', phone: '9876543210', email: 'varamathu@school.com' },
    { id: 2, name: 'MOHAMMED GANI BAI', employeeId: 'T002', subject: 'Physics', qualification: 'M.Sc, B.Ed', experience: '12 years', phone: '9876543211', email: 'mohammed@school.com' },
    { id: 3, name: 'SYED MOHAMMED M', employeeId: 'T003', subject: 'Chemistry', qualification: 'M.Sc, Ph.D', experience: '15 years', phone: '9876543212', email: 'syed@school.com' },
    { id: 4, name: 'AROGIKASAMI S', employeeId: 'T004', subject: 'Biology', qualification: 'M.Sc, B.Ed', experience: '6 years', phone: '9876543213', email: 'arogikasami@school.com' },
    { id: 5, name: 'RAAI DURAI R', employeeId: 'T005', subject: 'English', qualification: 'M.A, B.Ed', experience: '10 years', phone: '9876543214', email: 'raaidurai@school.com' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    subject: '',
    qualification: '',
    experience: '',
    phone: '',
    email: ''
  });

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science', 'History', 'Geography'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTeacher) {
      // Update existing teacher
      setTeachers(teachers.map(teacher => 
        teacher.id === editingTeacher.id ? { ...formData, id: teacher.id } : teacher
      ));
    } else {
      // Add new teacher
      const newTeacher = {
        ...formData,
        id: teachers.length + 1
      };
      setTeachers([...teachers, newTeacher]);
    }
    setShowForm(false);
    setEditingTeacher(null);
    setFormData({ name: '', employeeId: '', subject: '', qualification: '', experience: '', phone: '', email: '' });
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData(teacher);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Teacher Management</h2>
        <button
          onClick={() => {
            setEditingTeacher(null);
            setFormData({ name: '', employeeId: '', subject: '', qualification: '', experience: '', phone: '', email: '' });
            setShowForm(true);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <span>➕</span> Add New Teacher
        </button>
      </div>

      {/* Teacher Form Modal */}
      {showForm && (
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
            width: '500px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ marginBottom: '20px' }}>
              {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Teacher Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Employee ID:
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Subject Specialization:
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Qualification:
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                  placeholder="e.g., M.Sc, B.Ed"
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Experience:
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                  placeholder="e.g., 5 years"
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingTeacher(null);
                  }}
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
                  {editingTeacher ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teachers Table */}
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
            <tr style={{ backgroundColor: '#1e1e2f', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Employee ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Teacher Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Subject</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Qualification</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Experience</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Phone</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{teacher.employeeId}</td>
                <td style={{ padding: '12px' }}>{teacher.name}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {teacher.subject}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{teacher.qualification}</td>
                <td style={{ padding: '12px' }}>{teacher.experience}</td>
                <td style={{ padding: '12px' }}>{teacher.phone}</td>
                <td style={{ padding: '12px' }}>{teacher.email}</td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => handleEdit(teacher)}
                    style={{
                      padding: '4px 8px',
                      marginRight: '5px',
                      backgroundColor: '#ff9800',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
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
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '15px',
        marginTop: '20px'
      }}>
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: '14px' }}>Total Teachers</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{teachers.length}</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: '14px' }}>Subjects Covered</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{new Set(teachers.map(t => t.subject)).size}</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: '14px' }}>Avg Experience</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>10.2 years</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#666', fontSize: '14px' }}>PhD Holders</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>1</div>
        </div>
      </div>
    </div>
  );
}

export default Teachers;
