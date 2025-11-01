import { useEffect, useState } from 'react';
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

export interface UserProfileData {
  nombre: string;
  numeroCuenta: string;
  banco: string;
  tipoCuenta: string;
}

type Props = { loggedIn: boolean };

export default function UserProfile({ loggedIn }: Props) {
  const [formData, setFormData] = useState<UserProfileData>({
    nombre: 'Juan Pérez',
    numeroCuenta: '12345678',
    banco: 'Banco de Chile',
    tipoCuenta: 'Cuenta Corriente',
  });
  const [draftData, setDraftData] = useState<UserProfileData>(formData);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) setDraftData(formData);
  }, [modalOpen, formData]);

  const handleDraftChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDraftData(prev => ({ ...prev, [name]: value }));
  };

  const openEditModal = () => {
    setModalOpen(true);
    setMenuOpen(false);
  };
  const handleSave = () => {
    setFormData(draftData);
    setModalOpen(false);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  if (!loggedIn) return null;

  return (
    <>
      {/* Bloque fijo arriba a la derecha */}
      <div className="absolute right-4 top-0 h-10 z-40">
        <button
          type="button"
          id="user-trigger"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-controls="user-menu"
          onClick={() => setMenuOpen(v => !v)}
          className="h-full inline-flex items-center gap-2 whitespace-nowrap p-1 rounded hover:bg-white/10 transition select-none"
        >
          <UserCircleIcon className="w-6 h-6 text-usm-light shrink-0" />
          <span className="text-sm text-usm-light">{formData.nombre}</span>
          <ChevronDownIcon
            className={`w-5 h-5 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Panel flotante */}
      {menuOpen && (
        <div
          id="user-menu"
          role="menu"
          aria-labelledby="user-trigger"
          className="absolute right-4 top-10 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-40"
        >
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
              className="w-full rounded-md bg-usm-blue text-white py-2 font-medium hover:brightness-110 transition"
              onClick={openEditModal}
            >
              Editar
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50">
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
                      autoFocus
                      type="text"
                      name="nombre"
                      value={draftData.nombre}
                      onChange={handleDraftChange}
                      className="w-full px-3 py-2 border rounded text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Banco</label>
                    <input
                      type="text"
                      name="banco"
                      value={draftData.banco}
                      onChange={handleDraftChange}
                      className="w-full px-3 py-2 border rounded text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Tipo de cuenta</label>
                    <select
                      name="tipoCuenta"
                      value={draftData.tipoCuenta}
                      onChange={handleDraftChange}
                      className="w-full px-3 py-2 border rounded text-black"
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
                      className="w-full px-3 py-2 border rounded text-black"
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
    </>
  );
}
