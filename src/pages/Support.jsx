import React from 'react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="container">
          <div className="header-content">
            <h1>Hỗ trợ</h1>
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
          <div className="support-overview">
            <div className="dashboard-card">
              <h3>Quản lý phiếu hỗ trợ</h3>
              <div className="card-content">
                <p>Gửi yêu cầu hỗ trợ về vấn đề bạn đang gặp phải hoặc xem trạng thái các phiếu đã gửi trước đó.</p>
                
                <div className="support-actions">
                  <button className="btn btn-primary btn-block" onClick={() => navigate('/create-ticket')}>
                    <span className="btn-icon">+</span>
                    Tạo phiếu hỗ trợ mới
                  </button>
                  <button className="btn btn-outline btn-block" style={{marginTop: '0.75rem'}} onClick={() => navigate('/tickets')}>
                    <span className="btn-icon">📋</span>
                    Xem các phiếu đã gửi
                  </button>
                </div>
                
                <div className="support-stats" style={{marginTop: '1.5rem'}}>
                  <div className="stat-item">
                    <span className="stat-value">0</span>
                    <span className="stat-label">Phiếu đang mở</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">0</span>
                    <span className="stat-label">Đã giải quyết</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">--</span>
                    <span className="stat-label">Thời gian phản hồi TB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="support-contact" style={{marginTop: '1.5rem'}}>
            <div className="dashboard-card">
              <h3>Liên hệ trực tiếp</h3>
              <div className="card-content">
                <p>Nếu bạn cần hỗ trợ khẩn cấp, hãy liên hệ với chúng tôi qua các kênh sau:</p>
                
                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="contact-icon">📞</div>
                    <div className="contact-details">
                      <h4>Hotline</h4>
                      <p>1800-XXXXX</p>
                      <p className="text-muted">Thứ 2 - Thứ 6: 8:00 - 17:30</p>
                    </div>
                  </div>
                  
                  <div className="contact-method">
                    <div className="contact-icon">✉️</div>
                    <div className="contact-details">
                      <h4>Email</h4>
                      <p>support@itcompany.com</p>
                      <p className="text-muted">Phản hồi trong vòng 24 giờ</p>
                    </div>
                  </div>
                  
                  <div className="contact-method">
                    <div className="contact-icon">💬</div>
                    <div className="contact-details">
                      <h4>Trò chuyện AI</h4>
                      <button className="btn btn-sm btn-outline" onClick={() => navigate('/live-chat')}>Bắt đầu chat</button>
                      <p className="text-muted">Trực tuyến 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
