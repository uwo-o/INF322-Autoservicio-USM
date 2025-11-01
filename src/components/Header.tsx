import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoUSM from '../assets/logo-usm.svg';
import { Button } from './Button';

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loggedIn && location.pathname !== '/') {
      navigate('/');
    }
  }, [loggedIn, location.pathname, navigate]);

  const handleLoginClick = () => {
    if (loggedIn) {
      setLoggedIn(false);
      navigate('/');
    } else {
      setLoggedIn(true);
      navigate('/system');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const showBackButton = location.pathname !== '/' && location.pathname !== '/system';

  return (
    <div className="min-w-screen flex flex-col">

      {/* Barra superior azul */}
      <div className="bg-usm-blue text-usm-light h-10 flex items-center">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-8 col-start-3 flex items-center ml-4">
            <span className="font-semibold">USM.cl</span>
          </div>
        </div>
      </div>

      {/* Header con grid centrado */}
      <div className="bg-usm-light h-20 px-4 border-b border-gray-200">
        <div className="grid grid-cols-12 h-full items-center">
          <div className="col-span-8 col-start-3 flex justify-between items-center gap-6">
            {/* Logo */}
            <img src={LogoUSM} alt="Logo USM" className="h-12" />

            {/* Botones */}
            <div className="flex items-center gap-4">
              {showBackButton && <Button onClick={handleBackClick}>Volver</Button>}
              <Button onClick={handleLoginClick}>
                {loggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
