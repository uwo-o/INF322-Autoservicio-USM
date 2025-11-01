import React, { useState } from 'react';

interface Payment {
  fechaDocumento: string;
  tipoDocumento: string;
  descripcion: string;
  documento: string;
  monto: number;
  tipoPago?: string;
  fechaEmisionPago?: string;
}

// Datos hardcodeados para 2025, 2024 y 2023
const payments: Payment[] = [
  // 2025
  { fechaDocumento: '26-SEP-2025', tipoDocumento: 'BECA AYUDANTIA', descripcion: 'BECA AYUDANTIA SEP 2025 DEP INF DOC CCCV', documento: '20250925', monto: 107070 },
  { fechaDocumento: '04-SEP-2025', tipoDocumento: 'BECA RESIDENCIA PREGRADO', descripcion: 'CCC-RES-HOS-SEP-2025', documento: '20250904', monto: 100000, tipoPago: 'Depósito Directo', fechaEmisionPago: '06-SEP-2025' },
  // 2024
  { fechaDocumento: '15-AGO-2024', tipoDocumento: 'BECA AYUDANTIA', descripcion: 'BECA AYUDANTIA AGO 2024', documento: '20240815', monto: 105000, tipoPago: 'Depósito Directo', fechaEmisionPago: '17-AGO-2024' },
  { fechaDocumento: '02-JUL-2024', tipoDocumento: 'BOLETA HONORARIO ELECTRONICA', descripcion: '', documento: '12', monto: 350000, tipoPago: 'Depósito Directo', fechaEmisionPago: '05-JUL-2024' },
  // 2023
  { fechaDocumento: '10-SEP-2023', tipoDocumento: 'BECA RESIDENCIA PREGRADO', descripcion: 'CCC-RES-HOS-SEP-2023', documento: '20230910', monto: 98000, tipoPago: 'Depósito Directo', fechaEmisionPago: '12-SEP-2023' },
  { fechaDocumento: '20-ABR-2023', tipoDocumento: 'BOLETA HONORARIO ELECTRONICA', descripcion: '', documento: '08', monto: 400000, tipoPago: 'Depósito Directo', fechaEmisionPago: '22-ABR-2023' },
];

// Agrupar pagos por año
const groupByYear = (payments: Payment[]) => {
  const grouped: Record<string, Payment[]> = {};
  payments.forEach(p => {
    const year = p.fechaDocumento.split('-').pop()!;
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(p);
  });
  return grouped;
};

export const ScholarshipPayments: React.FC = () => {
  const groupedPayments = groupByYear(payments);
  const sortedYears = Object.keys(groupedPayments).sort((a, b) => Number(b) - Number(a));
  
  const [selectedYear, setSelectedYear] = useState(sortedYears[0]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-usm-dark text-2xl mb-4">Becas y Pagos Recibidos</h1>
      <p className="text-usm-blue mb-6">Registro de becas, pagos y documentos asociados por año.</p>

      <div className="mb-4">
        <label className="mr-2 font-semibold text-usm-dark">Seleccionar Año:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {sortedYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="bg-usm-light p-4 rounded shadow overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Fecha Documento</th>
              <th className="px-4 py-2 text-left">Tipo Documento</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Documento</th>
              <th className="px-4 py-2 text-right">Monto Total</th>
              <th className="px-4 py-2 text-left">Tipo Pago</th>
              <th className="px-4 py-2 text-left">Fecha Emisión Pago</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {groupedPayments[selectedYear].map((p, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-2">{p.fechaDocumento}</td>
                <td className="px-4 py-2">{p.tipoDocumento}</td>
                <td className="px-4 py-2">{p.descripcion || '-'}</td>
                <td className="px-4 py-2">{p.documento}</td>
                <td className="px-4 py-2 text-right">{p.monto.toLocaleString()}</td>
                <td className="px-4 py-2">{p.tipoPago || '-'}</td>
                <td className="px-4 py-2">{p.fechaEmisionPago || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScholarshipPayments;
