import React, { useState } from 'react';

function Subjects() {
  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', code: 'MATH101', category: 'Core', classes: ['Class 10', 'Class 11', 'Class 12'], teacher: 'VARAMATHU B' },
    { id: 2, name: 'Physics', code: 'PHY101', category: 'Science', classes: ['Class 11', 'Class 12'], teacher: 'MOHAMMED GANI BAI' },
    { id: 3, name: 'Chemistry', code: 'CHEM101', category: 'Science', classes: ['Class 11', 'Class 12'], teacher: 'SYED MOHAMMED M' },
    { id: 4, name: 'Biology', code: 'BIO101', category: 'Science', classes: ['Class 11', 'Class 12'], teacher: 'AROGIKASAMI S' },
    { id: 5, name: 'English', code: 'ENG101', category: 'Language', classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'], teacher: 'RAAI DURAI R' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: 'Core',
    classes: [],
    teacher: ''
  });

  const categories = ['Core', 'Science', 'Mathematics', 'Language', 'Arts', 'Elective'];
  const allClasses = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 
                      'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 
                      'Class 11', 'Class 12'];
  const teachers = ['VARAMATHU B', 'MOHAMMED GANI BAI', 'SYED MOHAMMED M', 
                    'AROGIKASAMI S', 'RAAI DURAI R', 'JOHN DOE'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClassChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, classes: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSubject) {
      // Update existing subject
      setSubjects(subjects.map(sub => 
        sub.id === editingSubject.id ? { ...formData, id: sub.id } : sub
      ));
    } else {
      // Add new subject
      const newSubject = {
        ...formData,
        id: subjects.length + 1
      };
      setSubjects([...subjects, newSubject]);
    }
    setShowForm(false);
    setEditingSubject(null);
    setFormData({ name: '', code: '', category: 'Core', classes: [], teacher: '' });
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setFormData(subject);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(sub => sub.id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Subject Management</h2>
        <button
          onClick={() => {
            setEditingSubject(null);
            setFormData({ name: '', code: '', category: 'Core', classes: [], teacher: '' });
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
          <span>➕</span> Add New Subject
        </button>
      </div>

      {/* Subject Form Modal */}
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
              {editingSubject ? 'Edit Subject' : 'Add New Subject'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Subject Name:
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
                  Subject Code:
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
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
                  Category:
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Assign Teacher:
                </label>
                <select
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                >
                  <option value="">Select Teacher</option>
                  {teachers.map(teacher => (
                    <option key={teacher} value={teacher}>{teacher}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Applicable Classes (Hold Ctrl to select multiple):
                </label>
                <select
                  multiple
                  value={formData.classes}
                  onChange={handleClassChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    minHeight: '150px'
                  }}
                >
                  {allClasses.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingSubject(null);
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
                  {editingSubject ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subjects Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#1e1e2f', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Subject Code</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Subject Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Teacher</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Classes</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{subject.code}</td>
                <td style={{ padding: '12px' }}>{subject.name}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {subject.category}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{subject.teacher}</td>
                <td style={{ padding: '12px' }}>
                  {subject.classes.map(cls => (
                    <span key={cls} style={{
                      backgroundColor: '#f5f5f5',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      marginRight: '4px',
                      display: 'inline-block',
                      marginBottom: '2px'
                    }}>
                      {cls}
                    </span>
                  ))}
                </td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => handleEdit(subject)}
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
                    onClick={() => handleDelete(subject.id)}
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
    </div>
  );
}

export default Subjects;
