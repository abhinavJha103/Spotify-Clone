import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectRoute = ({ element }) => {
  const navigate = useNavigate();
    
  const isAuthenticated = localStorage.getItem('authToken'); 
    
  useEffect(() => {
   
    if (!isAuthenticated) {
      navigate("/adminLogin"); 
    }
  }, [isAuthenticated, navigate]);

 
  return isAuthenticated ? element : null;
};

export default ProtectRoute;
