import React, { useState } from 'react';
import './Settings.css';
import { ScreenProps } from '../ScreenProps';

const Settings: React.FC<ScreenProps> = ({ userType }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Select Plan');
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to save profile information
    console.log('Profile saved:', { name, email });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to change password
    console.log('Password change requested');
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlan(e.target.value);
  };

  const handleProceed = () => {
    // Add logic to process plan change
    console.log('Proceeding with plan change to:', selectedPlan);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmed) {
      // Add logic to delete account
      console.log('Account deletion requested');
    } else {
      alert('Please confirm that you understand the consequences of deleting your account');
    }
  };

  return (
    <div className="settings-screen">
      <div className="settings-container">
        <div className="settings-section profile-section">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSaveProfile}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="form-control"
              />
            </div>
          </form>
        </div>

        <div className="settings-section password-section">
          <h2>Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label>Current Password</label>
              <input 
                type="password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="form-control"
              />
            </div>
            <button type="submit" className="btn-save">Save</button>
          </form>
        </div>

        <div className="settings-section subscription-section">
          <h2>Your Subscription</h2>
          <div className="subscription-details">
            <div className="form-group">
              <label>Current Plan</label>
              <div className="current-plan">Elite AI Plan (266 days left)</div>
            </div>
            <div className="form-group">
              <label>Change Plan</label>
              <select 
                value={selectedPlan} 
                onChange={handlePlanChange} 
                className="form-control"
              >
                <option>Select Plan</option>
                <option>Basic Plan</option>
                <option>Pro Plan</option>
                <option>Elite AI Plan</option>
              </select>
            </div>
            <div className="subscription-actions">
              <a href="#" className="cancel-link">Cancel Subscription</a>
              <button className="btn-proceed" onClick={handleProceed}>Proceed</button>
            </div>
          </div>
        </div>

        <div className="settings-section delete-section">
          <h2>Delete Account</h2>
          <div className="delete-info">
            <p className="important-note">
              <strong>Important Note:</strong> Deleting your account will permanently remove all your data from our platform, 
              including your job applications, resume, and messages. This action cannot be undone.
            </p>
            <div className="delete-confirmation">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={deleteConfirmed} 
                  onChange={(e) => setDeleteConfirmed(e.target.checked)} 
                />
                <span>I understand that by clicking 'Delete Account', I am permanently removing my data from Tap My Talent 
                and cannot undo this action.</span>
              </label>
            </div>
            <button 
              className="btn-delete" 
              onClick={handleDeleteAccount}
              disabled={!deleteConfirmed}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
