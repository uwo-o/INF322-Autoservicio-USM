import React, { useState } from 'react';

interface Movement {
  fecha: string;
  codigo: string;
  descripcion: string;
  cargo: number;
  pago: number;
  tipoPago: string;
}

const movements: Movement[] = [
  { fecha: '25-AGO-2025', codigo: 'PDMJ', descripcion: 'CAE BANCO ESTADO', cargo: 0, pago: 80175, tipoPago: 'CAE' },
  { fecha: '17-JUN-2025', codigo: 'PDRM', descripcion: 'GRATUIDAD APORTE-UTFSM MAT DIU', cargo: 0, pago: 10419, tipoPago: 'Beca' },
  { fecha: '13-ENE-2025', codigo: 'MTRD', descripcion: 'MATRICULA PREGRADO DIURNO', cargo: 130000, pago: 0, tipoPago: 'Arancel' },

  // Movimientos extra como ejemplo
  { fecha: '05-DIC-2024', codigo: 'AREF', descripcion: 'ARANCEL ENERO', cargo: 75000, pago: 0, tipoPago: 'Arancel' },
  { fecha: '10-NOV-2024', codigo: 'PDBE', descripcion: 'PAGO BANCO ESTADO', cargo: 0, pago: 45000, tipoPago: 'Pago' },
  { fecha: '02-SEP-2024', codigo: 'BCRM', descripcion: 'BECA MATRICULA', cargo: 0, pago: 15000, tipoPago: 'Beca' },
];

export const Summary: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const rowsToShow = showAll ? movements : movements.slice(0, 3);

  const totalCargos = movements.reduce((sum, m) => sum + m.cargo, 0);
  const totalPagos = movements.reduce((sum, m) => sum + m.pago, 0);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-usm-dark text-2xl mb-4">Resumen de Saldos y Movimientos</h1>
      <p className="text-usm-blue mb-6">
        Información de tus cargos, pagos y saldo acumulado.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-usm-light p-4 rounded shadow">
          <span className="text-gray-600 block">Total Deuda</span>
          <span className="text-usm-red font-bold text-lg">${totalCargos.toLocaleString()}</span>
        </div>
        <div className="bg-usm-light p-4 rounded shadow">
          <span className="text-gray-600 block">Total Pagado</span>
          <span className="text-usm-green font-bold text-lg">${totalPagos.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-usm-light p-4 rounded shadow">
        <h2 className="text-usm-dark font-semibold mb-4">Movimientos recientes</h2>

        <div className="overflow-x-auto -mx-4">
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">Código</th>
                <th className="px-4 py-2 text-left">Descripción</th>
                <th className="px-4 py-2 text-right">Cargo</th>
                <th className="px-4 py-2 text-right">Pago</th>
                <th className="px-4 py-2 text-left">Tipo de pago</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rowsToShow.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{m.fecha}</td>
                  <td className="px-4 py-2">{m.codigo}</td>
                  <td className="px-4 py-2">{m.descripcion}</td>
                  <td className="px-4 py-2 text-right text-usm-red">
                    {m.cargo > 0 ? `$${m.cargo.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-2 text-right text-usm-green">
                    {m.pago > 0 ? `$${m.pago.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-2 text-usm-dark">{m.tipoPago}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-right">
          <button
            className="bg-usm-blue text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => setShowAll(v => !v)}
          >
            {showAll ? 'Ver menos' : 'Ver todos los movimientos'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
