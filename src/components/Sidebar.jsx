import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { supabase } from '../supabase';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };
  
  // Kiểm tra route hiện tại để hiển thị active state
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>IT Helpdesk</h2>
        <div className="user-info">
          <div className="user-avatar">
            {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </div>
          <div className="user-details">
            <div className="user-name">{user?.user_metadata?.full_name || 'Người dùng'}</div>
            <div className="user-email">{user?.email}</div>
          </div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className={`nav-item ${isActive('/dashboard')}`}>
            <Link to="/dashboard" className="nav-link">
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Trang chủ</span>
            </Link>
          </li>
          
          <li className={`nav-item ${isActive('/profile')}`}>
            <Link to="/profile" className="nav-link">
              <span className="nav-icon">👤</span>
              <span className="nav-text">Tài khoản</span>
            </Link>
          </li>
          
          <li className={`nav-item ${isActive('/support') || isActive('/create-ticket') || isActive('/tickets')}`}>
            <Link to="/support" className="nav-link">
              <span className="nav-icon">🎫</span>
              <span className="nav-text">Hỗ trợ</span>
            </Link>
          </li>
          
          <li className={`nav-item ${isActive('/knowledge-base')}`}>
            <Link to="/knowledge-base" className="nav-link">
              <span className="nav-icon">📚</span>
              <span className="nav-text">Kiến thức</span>
            </Link>
          </li>
          
          <li className={`nav-item ${isActive('/live-chat')}`}>
            <Link to="/live-chat" className="nav-link">
              <span className="nav-icon">💬</span>
              <span className="nav-text">Trò chuyện AI</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="btn btn-outline btn-block">
          <span className="btn-icon">🚪</span>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
