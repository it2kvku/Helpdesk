import React from 'react';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Auth context will handle the redirect
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="container">
          <div className="header-content">
            <h1>Tài khoản</h1>
            <div className="header-actions">
              <button onClick={() => navigate('/dashboard')} className="btn btn-outline">
                <span className="btn-icon">←</span> Quay lại Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="page-main">
        <div className="container">
          <div className="profile-section">
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
                <h2>{user?.user_metadata?.full_name || user?.email || 'Người dùng'}</h2>
              </div>
              
              <div className="profile-details">
                <div className="detail-group">
                  <h3>Thông tin cơ bản</h3>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{user?.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Mã tài khoản:</span>
                    <span className="detail-value">{user?.id?.substring(0, 8)}...</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Đăng nhập lần cuối:</span>
                    <span className="detail-value">{user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Tạo tài khoản:</span>
                    <span className="detail-value">{user?.created_at ? new Date(user.created_at).toLocaleString() : 'N/A'}</span>
                  </div>
                </div>
                
                <div className="detail-group">
                  <h3>Bảo mật</h3>
                  <button className="btn btn-outline btn-block">
                    Đổi mật khẩu
                  </button>
                  <button className="btn btn-outline btn-block" style={{marginTop: '0.75rem'}}>
                    Cài đặt xác thực hai yếu tố
                  </button>
                </div>
                
                <div className="detail-group">
                  <h3>Phiên đăng nhập</h3>
                  <button onClick={handleLogout} className="btn btn-danger btn-block">
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
