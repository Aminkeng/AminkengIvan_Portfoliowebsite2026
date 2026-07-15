import { Navigate, useLocation } from 'react-router-dom';

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    return null;
  }
}

function ProtectedRoute({ children, requireAdmin = false }) {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));
  const user = getStoredUser();
  const isAdmin = Boolean(user?.role === 'admin' || user?.isAdmin);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
