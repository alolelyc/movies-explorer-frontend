import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.isUserAuthed ? (
    <Component {...props} />
  ) : (
    <Navigate to='/' replace />
  );
};

export default ProtectedRoute;
