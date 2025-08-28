import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KnowledgeBase = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dữ liệu mẫu cho cơ sở kiến thức
  const categories = [
    {
      id: 'network',
      name: 'Kết nối mạng',
      icon: '🌐',
      articles: [
        { id: 'wifi', title: 'Khắc phục vấn đề kết nối WiFi', views: 1254 },
        { id: 'vpn', title: 'Cài đặt và sử dụng VPN công ty', views: 876 },
        { id: 'ethernet', title: 'Thiết lập kết nối Ethernet', views: 542 }
      ]
    },
    {
      id: 'password',
      name: 'Đặt lại mật khẩu',
      icon: '🔑',
      articles: [
        { id: 'password-reset', title: 'Đặt lại mật khẩu tài khoản công ty', views: 2145 },
        { id: 'password-policy', title: 'Chính sách mật khẩu', views: 987 }
      ]
    },
    {
      id: 'software',
      name: 'Cài đặt phần mềm',
      icon: '💿',
      articles: [
        { id: 'software-request', title: 'Yêu cầu cài đặt phần mềm mới', views: 764 },
        { id: 'software-update', title: 'Cập nhật phần mềm bắt buộc', views: 1023 },
        { id: 'software-license', title: 'Quản lý giấy phép phần mềm', views: 489 }
      ]
    },
    {
      id: 'hardware',
      name: 'Xử lý sự cố phần cứng',
      icon: '🖥️',
      articles: [
        { id: 'printer', title: 'Thiết lập và xử lý sự cố máy in', views: 1432 },
        { id: 'monitor', title: 'Khắc phục vấn đề hiển thị màn hình', views: 678 },
        { id: 'keyboard', title: 'Sửa lỗi bàn phím và chuột', views: 543 }
      ]
    }
  ];

  // Lọc bài viết dựa trên tìm kiếm
  const filteredCategories = searchQuery 
    ? categories.map(category => ({
        ...category,
        articles: category.articles.filter(article => 
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.articles.length > 0)
    : categories;

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="container">
          <div className="header-content">
            <h1>Kiến thức cơ bản</h1>
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
          <div className="kb-search-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Tìm kiếm giải pháp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button className="btn btn-primary search-btn">
                <span>🔍</span>
              </button>
            </div>
            
            <div className="popular-searches">
              <span>Tìm kiếm phổ biến:</span>
              <button className="tag-pill" onClick={() => setSearchQuery('wifi')}>WiFi</button>
              <button className="tag-pill" onClick={() => setSearchQuery('mật khẩu')}>Mật khẩu</button>
              <button className="tag-pill" onClick={() => setSearchQuery('máy in')}>Máy in</button>
              <button className="tag-pill" onClick={() => setSearchQuery('email')}>Email</button>
            </div>
          </div>
          
          <div className="kb-categories">
            {filteredCategories.map(category => (
              <div key={category.id} className="kb-category">
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <h3>{category.name}</h3>
                </div>
                
                <ul className="kb-article-list">
                  {category.articles.map(article => (
                    <li key={article.id} className="kb-article-item">
                      <a href={`#/kb/${category.id}/${article.id}`} className="article-link">
                        <span className="article-title">{article.title}</span>
                        <span className="article-views">{article.views} lượt xem</span>
                      </a>
                    </li>
                  ))}
                </ul>
                
                <div className="category-footer">
                  <a href={`#/kb/${category.id}`} className="view-all-link">
                    Xem tất cả {category.articles.length} bài viết
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCategories.length === 0 && (
            <div className="no-results">
              <p>Không tìm thấy bài viết nào phù hợp với "{searchQuery}"</p>
              <button className="btn btn-outline" onClick={() => setSearchQuery('')}>
                Xóa tìm kiếm
              </button>
            </div>
          )}
          
          <div className="kb-request-container">
            <div className="kb-request-card">
              <h3>Không tìm thấy điều bạn cần?</h3>
              <p>Nếu bạn không thể tìm thấy giải pháp cho vấn đề của mình, hãy tạo phiếu hỗ trợ mới.</p>
              <button className="btn btn-primary" onClick={() => navigate('/create-ticket')}>
                Tạo phiếu hỗ trợ
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KnowledgeBase;
