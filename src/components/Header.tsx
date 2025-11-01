import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoUSM from '../assets/logo-usm.svg';
import { Button } from './Button';
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface FormData {
  nombre: string;
  numeroCuenta: string;
  banco: string;
  tipoCuenta: string;
}

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Estado “persistente” mostrado en el header/panel
  const [formData, setFormData] = useState<FormData>({
    nombre: 'Juan Pérez',
    numeroCuenta: '12345678',
    banco: 'Banco de Chile',
    tipoCuenta: 'Cuenta Corriente',
  });

  // Estado “borrador” SOLO para el modal
  const [draftData, setDraftData] = useState<FormData>(formData);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loggedIn && location.pathname !== '/') {
      navigate('/');
    }
  }, [loggedIn, location.pathname, navigate]);

  const handleBackClick = () => navigate(-1);

  const handleLoginClick = () => {
    if (loggedIn) {
      setLoggedIn(false);
      setMenuOpen(false);
      setModalOpen(false);
      navigate('/');
    } else {
      setLoggedIn(true);
      navigate('/system');
    }
  };

  const showBackButton = location.pathname !== '/' && location.pathname !== '/system';

  // Cambia el borrador del modal (NO toca formData)
  const handleDraftChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraftData(prev => ({ ...prev, [name]: value }));
  };

  // Abrir modal: copiar estado actual a borrador
  const openEditModal = () => {
    setDraftData(formData);
    setModalOpen(true);
    setMenuOpen(false);
  };

  // Guardar: pasar borrador a persistente
  const handleSave = () => {
    setFormData(draftData);
    setModalOpen(false);
  };

  // Cancelar: cerrar modal y descartar cambios
  const handleCancel = () => {
    setModalOpen(false);
    setDraftData(formData); // opcional, deja el borrador sincronizado al cerrar
  };

  return (
    <div className="min-w-screen flex flex-col relative">
      {/* Barra superior azul */}
      <div className="bg-usm-blue text-usm-light h-10 flex items-center relative z-30">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-8 col-start-3 flex items-center ml-4">
            <span className="font-semibold">USM.cl</span>
          </div>

          {/* Bloque usuario SOLO si hay sesión */}
          {/* Bloque usuario: SOLO si hay sesión */}
{loggedIn && (
  <>
    {/* Contenido anclado a la derecha que se expande hacia la izquierda */}
    <div className="absolute right-4 top-0 h-10 z-40">
      <div className="h-full inline-flex items-center gap-2 whitespace-nowrap">
        <UserCircleIcon className="w-6 h-6 text-usm-light shrink-0 select-none" />
        <span className="text-sm select-none">{formData.nombre}</span>
        <button
          type="button"
          className="p-1 rounded hover:bg-white/10 transition shrink-0"
          aria-label="Abrir menú usuario"
          onClick={() => setMenuOpen(v => !v)}
        >
          <ChevronDownIcon
            className={`w-5 h-5 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </div>

    {/* Panel flotante anclado a la derecha (se mantiene igual) */}
    {menuOpen && (
      <div className="absolute right-4 top-10 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
        <div className="p-4 space-y-2 text-sm text-gray-700">
          <div className="font-semibold text-gray-900">Datos del usuario</div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Nombre</span>
            <span className="font-medium">{formData.nombre}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Banco</span>
            <span className="font-medium">{formData.banco}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Tipo cuenta</span>
            <span className="font-medium">{formData.tipoCuenta}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">N° cuenta</span>
            <span className="font-medium">{'•••••' + formData.numeroCuenta.slice(-3)}</span>
          </div>
        </div>
        <div className="p-3">
          <button
            type="button"
            className="w-full rounded-md bg-usm-red text-white py-2 font-medium hover:brightness-110 transition"
            onClick={() => { setModalOpen(true); setMenuOpen(false); }}
          >
            Editar
          </button>
        </div>
      </div>
    )}
  </>
)}

        </div>
      </div>

      {/* Segunda barra (logo + botones) */}
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

      {/* Modal centrado con degradado y blur: SOLO si hay sesión */}
      {loggedIn && modalOpen && (
        <div className="fixed inset-0 z-50">
          {/* Fondo (clic afuera cierra SIN guardar) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-black/50 via-usm-blue/40 to-white/20 backdrop-blur-sm"
            onClick={handleCancel}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-100">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Mis Datos Personales</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={draftData.nombre}
                      onChange={handleDraftChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Banco</label>
                    <input
                      type="text"
                      name="banco"
                      value={draftData.banco}
                      onChange={handleDraftChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Tipo de cuenta</label>
                    <select
                      name="tipoCuenta"
                      value={draftData.tipoCuenta}
                      onChange={handleDraftChange}
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option>Cuenta Corriente</option>
                      <option>Cuenta Vista</option>
                      <option>Cuenta Ahorro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Número de cuenta</label>
                    <input
                      type="text"
                      name="numeroCuenta"
                      value={draftData.numeroCuenta}
                      onChange={handleDraftChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 flex justify-end gap-3">
                <Button
                  type="button"
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
                <Button type="button" onClick={handleSave}>
                  Guardar cambios
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
