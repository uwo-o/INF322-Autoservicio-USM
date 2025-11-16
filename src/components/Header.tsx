import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoUSM from '../assets/logo-usm.svg';
import { Button } from './Button';
import UserProfile from './UserProfile';



function Header() {
  const [loggedIn, setLoggedIn] = useState(() => {
    // Cargar estado de login desde localStorage
    const saved = localStorage.getItem('usm_loggedIn');
    return saved === 'true';
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Guardar estado de login en localStorage
    localStorage.setItem('usm_loggedIn', loggedIn.toString());
    
    if (!loggedIn && location.pathname !== '/' && location.pathname !== '/payment') {
      navigate('/');
    }
  }, [loggedIn, location.pathname, navigate]);

  const handleBackClick = () => navigate(-1);

  const handleLoginClick = () => {
    if (loggedIn) {
      setLoggedIn(false);
      localStorage.setItem('usm_loggedIn', 'false');
      navigate('/');
    } else {
      setLoggedIn(true);
      localStorage.setItem('usm_loggedIn', 'true');
      navigate('/system');
    }
  };

  const showBackButton = location.pathname !== '/' && location.pathname !== '/system';

  return (
    <div className="min-w-screen flex flex-col relative">
      {/* Barra superior azul (relativa para posicionar el UserProfile absoluto) */}
      <div className="bg-usm-blue text-usm-light h-10 flex items-center relative z-30">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-8 col-start-3 flex items-center ml-4">
            <span className="font-semibold">USM.cl</span>
          </div>
        </div>

        {/* Perfil de usuario (autocontenido) */}
        <UserProfile loggedIn={loggedIn} />
      </div>

      {/* Barra secundaria */}
      <div className="bg-usm-light h-20 px-4 border-b border-gray-200">
        <div className="grid grid-cols-12 h-full items-center">
          <div className="col-span-8 col-start-3 flex justify-between items-center gap-6">
            <img src={LogoUSM} alt="Logo USM" className="h-12" />
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
