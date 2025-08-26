import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { 
  EmailIcon, 
  LockIcon, 
  EyeIcon, 
  EyeSlashIcon, 
  GoogleIcon, 
  FacebookIcon, 
  AppleIcon,
  LogoIcon
} from '../components/Icons';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });
      
      if (error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          throw new Error('Could not connect to authentication server. Please check your Supabase configuration in .env file');
        }
        throw error;
      }
      
      // Auth state will be handled by the context and automatically redirect
      console.log('Login successful:', data);
      
    } catch (error) {
      console.error('Login error:', error);
      
      // More descriptive error messages
      if (error.message.includes('configuration') || error.message.includes('Supabase')) {
        setError(error.message);
      } else {
        // Generic error message for security
        setError('Invalid email or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Check if form is valid for button state
  const isFormValid = formData.email.trim() !== '' && formData.password.trim() !== '';

  return (
    <div className="auth-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
      <div className="auth-card" style={{margin: '0 auto', width: '100%', maxWidth: '450px'}}>
        <div className="auth-header">
          <div className="brand-logo">
            <LogoIcon />
            <h2>IT Helpdesk</h2>
          </div>
          <h1 className="auth-title">Đăng nhập</h1>
          <p className="auth-subtitle">Vui lòng nhập thông tin để đăng nhập</p>
        </div>

        {error && <div className="error-message">{error}</div>}

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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <div className="input-icon"><LockIcon /></div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="form-input"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>

          <div className="form-options">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="rememberMe"
                className="checkbox-input"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
            </div>
            <Link to="/forgot-password" className="auth-link">Quên mật khẩu?</Link>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Đang đăng nhập...
              </>
            ) : 'Đăng nhập'}
          </button>
        </form>

        <div className="divider">
          <span>HOẶC</span>
        </div>

        <div className="social-login">
          <button className="social-btn" aria-label="Login with Google">
            <GoogleIcon />
          </button>
          <button className="social-btn" aria-label="Login with Facebook">
            <FacebookIcon />
          </button>
          <button className="social-btn" aria-label="Login with Apple">
            <AppleIcon />
          </button>
        </div>

        <div className="auth-footer">
          Chưa có tài khoản? <Link to="/signup" className="auth-link">Đăng ký</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
