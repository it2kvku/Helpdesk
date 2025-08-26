import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { EmailIcon, LogoIcon } from '../components/Icons';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      setSuccess(true);
      
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Error sending reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if form is valid for button state
  const isFormValid = email.trim() !== '';

  return (
    <div className="auth-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
      <div className="auth-card" style={{margin: '0 auto', width: '100%', maxWidth: '450px'}}>
        <div className="auth-header">
          <div className="brand-logo">
            <LogoIcon />
            <h2>IT Helpdesk</h2>
          </div>
          <h1 className="auth-title">Quên mật khẩu</h1>
          <p className="auth-subtitle">Nhập email để lấy lại mật khẩu</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        {success ? (
          <div className="success-message">
            <h2>Kiểm tra email của bạn</h2>
            <p>Chúng tôi đã gửi liên kết đặt lại mật khẩu tới {email}</p>
            <p>Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.</p>
            <div className="auth-footer">
              <Link to="/login" className="auth-link">Quay lại đăng nhập</Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-icon"><EmailIcon /></div>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Nhập email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Đang gửi liên kết...
                </>
              ) : 'Gửi liên kết đặt lại'}
            </button>
          </form>
        )}

        {!success && (
          <div className="auth-footer">
            Nhớ mật khẩu? <Link to="/login" className="auth-link">Đăng nhập</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
