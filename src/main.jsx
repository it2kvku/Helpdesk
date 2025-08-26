import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'

// Kiểm tra biến môi trường khi tải ứng dụng
const checkEnvironment = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('Checking environment variables:');
  console.log('- VITE_SUPABASE_URL:', supabaseUrl ? 'Available' : 'Missing');
  console.log('- VITE_SUPABASE_ANON_KEY:', supabaseKey ? 'Available' : 'Missing');
  
  return supabaseUrl && supabaseKey;
};

// Thêm error boundary đơn giản
const ErrorFallback = ({ error }) => {
  const isMissingEnv = !checkEnvironment();
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      height: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '20px' }}>Đã xảy ra lỗi khi tải ứng dụng</h2>
      {isMissingEnv ? (
        <p>Thiếu biến môi trường Supabase. Vui lòng kiểm tra file .env</p>
      ) : (
        <p>Lỗi: {error?.message || 'Không xác định'}</p>
      )}
      <button 
        onClick={() => window.location.reload()} 
        style={{ 
          marginTop: '20px',
          padding: '10px 20px',
          background: '#4361ee',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Tải lại trang
      </button>
    </div>
  );
};

const root = createRoot(document.getElementById('root'))

// Render với error handling
try {
  // Kiểm tra biến môi trường trước khi render
  const envOk = checkEnvironment();
  
  if (!envOk) {
    throw new Error('Missing Supabase environment variables');
  }
  
  root.render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  );
} catch (error) {
  console.error("Error rendering app:", error);
  root.render(<ErrorFallback error={error} />);
}
