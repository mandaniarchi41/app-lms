import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const StudentProfile = () => {
  const { user, loading, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
       setFormData({
        name: user?.name || '',
        email: user?.email || '',
      });
       setErrors({});
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    console.log('Saving profile data:', formData);

    const updatedUser = { ...user, ...formData };
    updateUser(updatedUser);

    setIsEditing(false);
    setErrors({});
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-primary-text">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-text"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12 text-primary-text">
        <h2 className="text-2xl font-bold text-primary-text">Profile not available</h2>
        <p className="mt-2 text-gray-700">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-primary-text">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
           <h1 className="text-2xl font-['Playfair_Display'] font-bold">My Profile</h1>
           <button
             onClick={handleEditToggle}
             className="btn-secondary text-sm"
           >
             {isEditing ? 'Cancel' : 'Edit'}
           </button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Full Name:</p>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-border-light rounded-md shadow-sm focus:outline-none focus:ring-primary-text focus:border-primary-text sm:text-sm"
              />
            ) : (
              <p className="text-lg font-semibold text-primary-text">{user.name}</p>
            )}
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Email Address:</p>
             {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-border-light rounded-md shadow-sm focus:outline-none focus:ring-primary-text focus:border-primary-text sm:text-sm"
              />
            ) : (
              <p className="text-lg font-semibold text-primary-text">{user.email}</p>
            )}
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          {/* Add more profile information fields here as needed */}
        </div>
        {isEditing && (
           <div className="mt-6">
             <button
               onClick={handleSave}
               className="btn-primary"
             >
               Save Changes
             </button>
           </div>
        )}
         <div className="mt-8 border-t border-border-light pt-6">
            <h2 className="text-xl font-['Playfair_Display'] font-bold mb-4">Linked Accounts</h2>
            <div className="space-y-4">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-text">
                  <i className="fab fa-google mr-2"></i> Link with Google
                </button>
                 <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-text">
                  <i className="fab fa-facebook-f mr-2"></i> Link with Facebook
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StudentProfile; 