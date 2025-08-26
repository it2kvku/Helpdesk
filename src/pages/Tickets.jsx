import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../contexts/useAuth';

const Tickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        console.log('Current user id:', user?.id);
        const { data, error } = await supabase
          .from('tickets')
          .select('*')
          .eq('requester_id', user.id)
          .order('created_at', { ascending: false });
        console.log('Fetched tickets:', data);
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        setTickets(data || []);
      } catch (err) {
        setError(err.message || 'Error loading tickets');
        console.error('Fetch tickets error:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchTickets();
    else console.log('No user id, cannot fetch tickets');
  }, [user]);

  return (
    <div className="auth-container">
      <div className="auth-card" style={{maxWidth: 700, width: '100%'}}>
        <h1 className="auth-title">Các phiếu hỗ trợ của tôi</h1>
        <div style={{marginBottom: '1rem', color: '#888'}}>Mã người dùng: {user?.id}</div>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div>Đang tải...</div>
        ) : tickets.length === 0 ? (
          <div>Không tìm thấy phiếu hỗ trợ nào.</div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '100%'}}>
            {tickets.map(ticket => (
              <div key={ticket.id} style={{background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(67,97,238,0.08)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div>
                  <h3 style={{marginBottom: '0.5rem', color: '#4361ee'}}>{ticket.title}</h3>
                  <div style={{marginBottom: '0.5rem', color: '#555'}}>{ticket.description}</div>
                </div>
                <div style={{marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{padding: '0.3rem 0.8rem', borderRadius: '6px', background: getStatusColor(ticket.status), color: '#fff', fontWeight: 500, fontSize: '0.95rem'}}>{getStatusLabel(ticket.status)}</span>
                  <span style={{fontSize: '0.9rem', color: '#888'}}>{new Date(ticket.created_at).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper for status color
function getStatusColor(status) {
  switch (status) {
    case 'NEW': return '#4361ee';
    case 'IN_PROGRESS': return '#fbbc05';
    case 'RESOLVED': return '#28a745';
    case 'CLOSED': return '#6c757d';
    default: return '#888';
  }
}

// Helper for status label in Vietnamese
function getStatusLabel(status) {
  switch (status) {
    case 'NEW': return 'Mới';
    case 'IN_PROGRESS': return 'Đang xử lý';
    case 'RESOLVED': return 'Đã giải quyết';
    case 'CLOSED': return 'Đã đóng';
    default: return status;
  }
}

export default Tickets;
