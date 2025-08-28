import React from 'react';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="welcome-section">
          <h1 className="page-title">Trang chủ</h1>
          <div className="welcome-card">
            <h2>Chào mừng, {user?.user_metadata?.full_name || user?.email || 'Người dùng'}!</h2>
            <p>Bạn đã đăng nhập thành công vào hệ thống IT Helpdesk.</p>
          </div>
        </div>
        
        <div className="quick-actions">
          <h3>Truy cập nhanh</h3>
          <div className="actions-grid">
            <div className="action-card" onClick={() => navigate('/profile')}>
              <div className="action-icon">👤</div>
              <div className="action-title">Tài khoản</div>
              <p className="action-desc">Xem và quản lý thông tin cá nhân</p>
            </div>
            
            <div className="action-card" onClick={() => navigate('/create-ticket')}>
              <div className="action-icon">🎫</div>
              <div className="action-title">Tạo phiếu hỗ trợ</div>
              <p className="action-desc">Gửi yêu cầu hỗ trợ mới</p>
            </div>
            
            <div className="action-card" onClick={() => navigate('/tickets')}>
              <div className="action-icon">📋</div>
              <div className="action-title">Phiếu của tôi</div>
              <p className="action-desc">Xem tất cả phiếu đã gửi</p>
            </div>
            
            <div className="action-card" onClick={() => navigate('/knowledge-base')}>
              <div className="action-icon">📚</div>
              <div className="action-title">Kiến thức</div>
              <p className="action-desc">Tìm kiếm giải pháp nhanh</p>
            </div>
            
            <div className="action-card" onClick={() => navigate('/live-chat')}>
              <div className="action-icon">💬</div>
              <div className="action-title">Trò chuyện AI</div>
              <p className="action-desc">Tương tác với trợ lý ảo</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-summary">
          <h3>Tổng quan</h3>
          <div className="summary-cards">
            <div className="summary-card">
              <div className="summary-header">
                <h4>Phiếu hỗ trợ</h4>
                <span className="summary-icon">📊</span>
              </div>
              <div className="summary-content">
                <div className="stat-item">
                  <span className="stat-value">0</span>
                  <span className="stat-label">Đang mở</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">0</span>
                  <span className="stat-label">Đã giải quyết</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">0</span>
                  <span className="stat-label">Tổng cộng</span>
                </div>
              </div>
              <div className="summary-footer">
                <button onClick={() => navigate('/tickets')} className="btn btn-sm btn-outline">
                  Xem chi tiết
                </button>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-header">
                <h4>Bài viết phổ biến</h4>
                <span className="summary-icon">📝</span>
              </div>
              <div className="summary-content">
                <ul className="popular-articles">
                  <li>
                    <a href="#/kb/network/wifi">Khắc phục vấn đề kết nối WiFi</a>
                    <span className="article-views">1254</span>
                  </li>
                  <li>
                    <a href="#/kb/password/password-reset">Đặt lại mật khẩu tài khoản công ty</a>
                    <span className="article-views">2145</span>
                  </li>
                  <li>
                    <a href="#/kb/hardware/printer">Thiết lập và xử lý sự cố máy in</a>
                    <span className="article-views">1432</span>
                  </li>
                </ul>
              </div>
              <div className="summary-footer">
                <button onClick={() => navigate('/knowledge-base')} className="btn btn-sm btn-outline">
                  Xem tất cả
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;