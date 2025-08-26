import React, { useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Auth context will handle the redirect
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <h1>IT Helpdesk</h1>
            <div className="mobile-menu-toggle" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
              <button 
                onClick={handleLogout}
                className="btn btn-primary logout-btn"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="dashboard-main">
        <div className="container">
          <div className="welcome-card">
            <h2>Chào mừng, {user?.user_metadata?.full_name || user?.email || 'Người dùng'}!</h2>
            <p>Bạn đã đăng nhập thành công vào hệ thống IT Helpdesk.</p>
          </div>
          
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>Tài khoản của bạn</h3>
              <div className="card-content">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Mã tài khoản:</strong> {user?.id?.substring(0, 8)}...</p>
                <p><strong>Đăng nhập lần cuối:</strong> {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}</p>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3>Hỗ trợ</h3>
              <div className="card-content">
                <button className="btn btn-primary btn-block" onClick={() => navigate('/create-ticket')}>
                  <span className="btn-icon">+</span>
                  Tạo phiếu hỗ trợ mới
                </button>
                <button className="btn btn-outline btn-block" style={{marginTop: '0.75rem'}} onClick={() => navigate('/tickets')}>
                  <span className="btn-icon">📋</span>
                  Xem các phiếu đã gửi
                </button>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3>Kiến thức cơ bản</h3>
              <div className="card-content">
                <p>Truy cập các giải pháp nhanh cho các vấn đề IT phổ biến:</p>
                <ul className="kb-links">
                  <li><a href="#" className="auth-link">Kết nối mạng</a></li>
                  <li><a href="#" className="auth-link">Đặt lại mật khẩu</a></li>
                  <li><a href="#" className="auth-link">Cài đặt phần mềm</a></li>
                  <li><a href="#" className="auth-link">Xử lý sự cố phần cứng</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;