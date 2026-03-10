import React, { useState, useEffect } from 'react';
import { useUsers } from '../../context/UserContext';

function AddUserForm({ onClose, onSuccess, userToEdit }) {
  const { addUser, updateUser } = useUsers();
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    age: '',
    gender: '',
    subject: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        role: userToEdit.role || '',
        name: userToEdit.name || '',
        email: userToEdit.email || '',
        age: userToEdit.age || '',
        gender: userToEdit.gender || '',
        subject: userToEdit.subject || ''
      });
    }
  }, [userToEdit]);

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'English', 'Computer Science', 'History', 'Geography',
    'Economics', 'Physical Education', 'Art', 'Music',
    'Administration', 'Student Affairs', 'Finance'
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.role) newErrors.role = 'Please select a role';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (formData.age < 21 || formData.age > 70) newErrors.age = 'Age must be between 21 and 70';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.subject) newErrors.subject = 'Please select subject';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      if (userToEdit) {
        updateUser(userToEdit.id, formData);
      } else {
        addUser(formData);
      }
      onSuccess();
    } else {
      setErrors(formErrors);
    }
  };

  return (
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
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        width: '500px',
        maxWidth: '90%',
        maxHeight: '90vh',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header with gradient */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            color: 'white',
            fontSize: '24px'
          }} onClick={onClose}>✕</div>
          <h3 style={{ color: 'white', margin: 0, fontSize: '24px' }}>
            {userToEdit ? 'Edit User' : 'Add New User'}
          </h3>
        </div>

        {/* Scrollable Form Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '30px' }}>
          <form id="addUserForm" onSubmit={handleSubmit}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '10px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Select User Role *
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px'
              }}>
                {/* Admin Button */}
                <div
                  onClick={() => setFormData({...formData, role: 'admin'})}
                  style={{
                    padding: '20px 15px',
                    borderRadius: '15px',
                    border: formData.role === 'admin' ? '3px solid #667eea' : '2px solid #e0e0e0',
                    background: formData.role === 'admin' ? 'linear-gradient(135deg, #f093fb20, #f5576c20)' : 'white',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    boxShadow: formData.role === 'admin' ? '0 10px 20px rgba(102,126,234,0.2)' : 'none'
                  }}
                >
                  <h4 style={{ margin: '0 0 5px', color: '#333' }}>Admin</h4>
                  <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                    Full system access
                  </p>
                </div>

                {/* Teacher Button */}
                <div
                  onClick={() => setFormData({...formData, role: 'teacher'})}
                  style={{
                    padding: '20px 15px',
                    borderRadius: '15px',
                    border: formData.role === 'teacher' ? '3px solid #4facfe' : '2px solid #e0e0e0',
                    background: formData.role === 'teacher' ? 'linear-gradient(135deg, #4facfe20, #00f2fe20)' : 'white',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    boxShadow: formData.role === 'teacher' ? '0 10px 20px rgba(79,172,254,0.2)' : 'none'
                  }}
                >
                  <h4 style={{ margin: '0 0 5px', color: '#333' }}>Teacher</h4>
                  <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                    Faculty access
                  </p>
                </div>
              </div>
              {errors.role && (
                <p style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
                  {errors.role}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter full name"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: errors.name ? '2px solid #f44336' : '2px solid #e0e0e0',
                  fontSize: '14px',
                  transition: 'border 0.3s'
                }}
              />
              {errors.name && (
                <p style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
                  {errors.name}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter email address"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: errors.email ? '2px solid #f44336' : '2px solid #e0e0e0',
                  fontSize: '14px'
                }}
              />
              {errors.email && (
                <p style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Age *
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                placeholder="Enter age"
                min="21"
                max="70"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: errors.age ? '2px solid #f44336' : '2px solid #e0e0e0',
                  fontSize: '14px'
                }}
              />
              {errors.age && (
                <p style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
                  {errors.age}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Gender *
              </label>
              <div style={{ display: 'flex', gap: '15px' }}>
                {['Male', 'Female', 'Other'].map(g => (
                  <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
                  {errors.gender}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Subject Specialization *
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: errors.subject ? '2px solid #f44336' : '2px solid #e0e0e0',
                  fontSize: '14px'
                }}
              >
                <option value="">Select a subject</option>
                {subjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
              {errors.subject && (
                <p style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
                  {errors.subject}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Footer Buttons */}
        <div style={{
          padding: '20px 30px',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          background: '#f8f9fa'
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#666'
            }}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            form="addUserForm"
            style={{
              padding: '10px 30px',
              background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            {userToEdit ? 'Save Changes' : 'Create User'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUserForm;
