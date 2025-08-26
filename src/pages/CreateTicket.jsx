import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';

const CreateTicket = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const { data, error } = await supabase.from('issue_categories').select('*');
        console.log('Fetched issue_categories:', data);
        if (error) throw error;
        setCategories(data || []);
      } catch (err) {
        setCategoriesError('Lỗi khi tải danh mục');
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.category) {
      setError('Vui lòng điền đầy đủ các trường');
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('tickets').insert([
        {
          requester_id: user.id,
          title: form.title,
          description: form.description,
          category: form.category,
          status: 'NEW',
        },
      ]);
      if (error) throw error;
      navigate('/tickets');
    } catch (err) {
      setError(err.message || 'Lỗi khi tạo phiếu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Tạo phiếu hỗ trợ mới</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Tiêu đề</label>
            <input type="text" name="title" className="form-input" value={form.title} onChange={handleChange} required placeholder="Nhập tiêu đề" />
          </div>
          <div className="form-group">
            <label className="form-label">Mô tả lỗi</label>
            <textarea name="description" className="form-input" value={form.description} onChange={handleChange} required rows={4} placeholder="Nhập mô tả chi tiết về lỗi" />
          </div>
          <div className="form-group">
            <label className="form-label">Danh mục lỗi</label>
            {categoriesLoading ? (
              <div style={{color: '#888'}}>Đang tải danh mục...</div>
            ) : categoriesError ? (
              <div className="error-message">{categoriesError}</div>
            ) : categories.length === 0 ? (
              <div style={{color: '#888'}}>Không có danh mục nào. Vui lòng thêm danh mục trong Supabase.</div>
            ) : (
              <select name="category" className="form-input" value={form.category} onChange={handleChange} required>
                <option value="">Chọn danh mục</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name || cat.title || cat.id}>{cat.name || cat.title || cat.id}</option>
                ))}
              </select>
            )}
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
            {isLoading ? 'Đang tạo...' : 'Tạo phiếu hỗ trợ'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
