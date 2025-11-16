import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const Charges: React.FC = () => {
  const navigate = useNavigate();
  const documentos = [
    { id: 1, descripcion: 'Matrícula 2024', saldo: 65000, pagado: false },
    { id: 2, descripcion: 'Arancel Marzo', saldo: 500000, pagado: true },
    { id: 3, descripcion: 'Arancel Abril', saldo: 500000, pagado: false },
  ];

  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const total = documentos
    .filter((doc) => selected.includes(doc.id))
    .reduce((acc, doc) => acc + doc.saldo, 0);

  const handlePay = () => {
    const selectedDocs = documentos.filter((doc) => selected.includes(doc.id));
    navigate('/payment', {
      state: {
        documentos: selectedDocs.map((doc) => doc.id),
        total: total,
        descripciones: selectedDocs.map((doc) => doc.descripcion),
      },
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-usm-dark text-2xl mb-4">Cargos</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-100 text-left"># Documento</th>
            <th className="px-4 py-2 border-b border-gray-100 text-left">Descripción</th>
            <th className="px-4 py-2 border-b border-gray-100 text-left">Saldo</th>
            <th className="px-4 py-2 border-b border-gray-100 text-left">Pagado</th>
            <th className="px-4 py-2 border-b border-gray-100 text-left">Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          {documentos.map((doc) => (
            <tr key={doc.id} className="border-b border-gray-100">
              <td className="px-4 py-2">{doc.id}</td>
              <td className="px-4 py-2">{doc.descripcion}</td>
              <td className="px-4 py-2">${doc.saldo.toLocaleString()}</td>
              <td className="px-4 py-2">{doc.pagado ? 'Sí' : 'No'}</td>
              <td className="px-4 py-2">
                {!doc.pagado && (
                  <input
                    type="checkbox"
                    checked={selected.includes(doc.id)}
                    onChange={() => toggleSelect(doc.id)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        <div className="mt-4 flex justify-end items-center gap-4 mr-5">
        <div className="flex flex-col items-end">
            <span className="text-usm-dark font-semibold mb-2">
            Total seleccionado: ${total.toLocaleString()}
            </span>
            <Button onClick={handlePay} disabled={selected.length === 0}>
            Pagar
            </Button>
        </div>
        </div>
    </div>
  );
};

export default Charges;
