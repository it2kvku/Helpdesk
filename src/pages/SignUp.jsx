import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { 
  UserIcon, 
  EmailIcon, 
  LockIcon, 
  EyeIcon, 
  EyeSlashIcon,
  CheckIcon,
  TimesIcon,
  LogoIcon
} from '../components/Icons';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Password strength criteria
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  useEffect(() => {
    // Check password strength
    const { password } = formData;
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    });
  }, [formData.password]); // We only need to depend on formData.password, not the entire formData object

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    if (!agreeToTerms) {
      setError('Bạn phải đồng ý với Điều khoản và Chính sách bảo mật');
      return;
    }

    // Check if password meets all criteria
    const isPasswordStrong = Object.values(passwordCriteria).every(criterion => criterion);
    if (!isPasswordStrong) {
      setError('Mật khẩu của bạn không đáp ứng đủ yêu cầu');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email, 
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName
          }
        }
      });
      
      if (error) throw error;
      
      // Navigate to verification page or login
      navigate('/login', { 
        state: { 
          message: 'Đăng ký thành công! Vui lòng kiểm tra email của bạn để xác minh tài khoản.' 
        } 
      });
      
    } catch (error) {
      console.error('Signup error:', error);
      if (error.message.includes('email')) {
        setError('Email này đã được đăng ký');
      } else {
        setError('Đã xảy ra lỗi trong quá trình đăng ký');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Check if form is valid for button state
  const isFormValid = 
    formData.fullName.trim() !== '' && 
    formData.email.trim() !== '' && 
    formData.password.trim() !== '' && 
    formData.confirmPassword.trim() !== '' &&
    formData.password === formData.confirmPassword &&
    agreeToTerms;

  return (
    <div className="auth-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
      <div className="auth-card" style={{margin: '0 auto', width: '100%', maxWidth: '450px'}}>
        <div className="auth-header">
          <div className="brand-logo">
            <LogoIcon />
            <h2>IT Helpdesk</h2>
          </div>
          <h1 className="auth-title">Đăng ký tài khoản</h1>
          <p className="auth-subtitle">Vui lòng nhập thông tin để đăng ký</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Họ và tên</label>
            <div className="input-icon"><UserIcon /></div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-input"
              placeholder="Nhập họ và tên"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

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
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
            
            <div className="password-criteria">
              <p>Mật khẩu phải chứa:</p>
              <div className={`criteria-item ${passwordCriteria.length ? 'criteria-met' : 'criteria-unmet'}`}>
                <span className="criteria-icon">{passwordCriteria.length ? <CheckIcon /> : <TimesIcon />}</span>
                Ít nhất 8 ký tự
              </div>
              <div className={`criteria-item ${passwordCriteria.uppercase ? 'criteria-met' : 'criteria-unmet'}`}>
                <span className="criteria-icon">{passwordCriteria.uppercase ? <CheckIcon /> : <TimesIcon />}</span>
                Một chữ cái viết hoa
              </div>
              <div className={`criteria-item ${passwordCriteria.lowercase ? 'criteria-met' : 'criteria-unmet'}`}>
                <span className="criteria-icon">{passwordCriteria.lowercase ? <CheckIcon /> : <TimesIcon />}</span>
                Một chữ cái viết thường
              </div>
              <div className={`criteria-item ${passwordCriteria.number ? 'criteria-met' : 'criteria-unmet'}`}>
                <span className="criteria-icon">{passwordCriteria.number ? <CheckIcon /> : <TimesIcon />}</span>
                Một số
              </div>
              <div className={`criteria-item ${passwordCriteria.special ? 'criteria-met' : 'criteria-unmet'}`}>
                <span className="criteria-icon">{passwordCriteria.special ? <CheckIcon /> : <TimesIcon />}</span>
                Một ký tự đặc biệt
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
            <div className="input-icon"><LockIcon /></div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <div className="error-message">Mật khẩu không khớp</div>
            )}
          </div>

          <div className="form-options">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="agreeToTerms"
                className="checkbox-input"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                required
              />
              <label htmlFor="agreeToTerms">
                Tôi đồng ý với <Link to="/terms" className="auth-link">Điều khoản dịch vụ</Link> và <Link to="/privacy" className="auth-link">Chính sách bảo mật</Link>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Đang đăng ký...
              </>
            ) : 'Đăng ký'}
          </button>
        </form>

        <div className="auth-footer">
          Đã có tài khoản? <Link to="/login" className="auth-link">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
