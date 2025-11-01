import React, { useState } from 'react';
import { Button } from '../components/Button';

export const PersonalData: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: 'Juan Pérez',
    numeroCuenta: '12345678',
    banco: 'Banco de Chile',
    tipoCuenta: 'Cuenta Corriente',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    console.log('Datos guardados', formData);
    setIsEditing(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-usm-light rounded shadow mt-12">
      <h1 className="text-usm-dark text-2xl">Mis Datos Personales</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Banco</label>
          <input
            type="text"
            name="banco"
            value={formData.banco}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Tipo de cuenta</label>
          <select
            name="tipoCuenta"
            value={formData.tipoCuenta}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
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
            value={formData.numeroCuenta}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex space-x-4 mt-4">
          {!isEditing && (
            <Button onClick={handleEdit} type="button">
              Editar
            </Button>
          )}
          {isEditing && (
            <>
              <Button onClick={handleSave} type="button">
                Guardar
              </Button>
              <Button onClick={handleCancel} type="button" className="bg-usm-red hover:bg-red-600">
                Cancelar
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalData;
