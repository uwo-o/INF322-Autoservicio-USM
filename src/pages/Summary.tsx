import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

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
  { fecha: '05-DIC-2024', codigo: 'AREF', descripcion: 'ARANCEL ENERO', cargo: 75000, pago: 0, tipoPago: 'Arancel' },
  { fecha: '10-NOV-2024', codigo: 'PDBE', descripcion: 'PAGO BANCO ESTADO', cargo: 0, pago: 45000, tipoPago: 'Pago' },
  { fecha: '02-SEP-2024', codigo: 'BCRM', descripcion: 'BECA MATRICULA', cargo: 0, pago: 15000, tipoPago: 'Beca' },
  { fecha: '15-AGO-2024', codigo: 'ARMR', descripcion: 'ARANCEL MARZO', cargo: 500000, pago: 0, tipoPago: 'Arancel' },
  { fecha: '20-JUL-2024', codigo: 'PDSC', descripcion: 'PAGO SERVICIOS', cargo: 0, pago: 25000, tipoPago: 'Pago' },
  { fecha: '10-JUN-2024', codigo: 'BCAL', descripcion: 'BECA ALIMENTACION', cargo: 0, pago: 30000, tipoPago: 'Beca' },
  { fecha: '05-MAY-2024', codigo: 'ARAB', descripcion: 'ARANCEL ABRIL', cargo: 500000, pago: 0, tipoPago: 'Arancel' },
  { fecha: '28-ABR-2024', codigo: 'CAEB', descripcion: 'CAE BANCO ESTADO', cargo: 0, pago: 120000, tipoPago: 'CAE' },
  { fecha: '12-MAR-2024', codigo: 'ARFE', descripcion: 'ARANCEL FEBRERO', cargo: 500000, pago: 0, tipoPago: 'Arancel' },
  { fecha: '25-FEB-2024', codigo: 'PDTR', descripcion: 'PAGO TRANSFERENCIA', cargo: 0, pago: 80000, tipoPago: 'Pago' },
  { fecha: '08-ENE-2024', codigo: 'BCMT', descripcion: 'BECA MATRICULA', cargo: 0, pago: 20000, tipoPago: 'Beca' },
  { fecha: '20-DIC-2023', codigo: 'ARNO', descripcion: 'ARANCEL NOVIEMBRE', cargo: 450000, pago: 0, tipoPago: 'Arancel' },
];

const tiposPago = ['Todos', 'Arancel', 'Pago', 'Beca', 'CAE'];
const itemsPerPageOptions = [5, 10, 20, 50];

export const Summary: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterTipo, setFilterTipo] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar movimientos
  const filteredMovements = useMemo(() => {
    return movements.filter(m => {
      const matchesTipo = filterTipo === 'Todos' || m.tipoPago === filterTipo;
      const matchesSearch = searchTerm === '' || 
        m.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.fecha.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTipo && matchesSearch;
    });
  }, [filterTipo, searchTerm]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredMovements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMovements = filteredMovements.slice(startIndex, endIndex);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filterTipo, searchTerm, itemsPerPage]);

  const totalCargos = movements.reduce((sum, m) => sum + m.cargo, 0);
  const totalPagos = movements.reduce((sum, m) => sum + m.pago, 0);
  // Total de cargos históricos: cargos pendientes + cargos ya pagados (estimado por los pagos)
  // Esto da una referencia del total de obligaciones que se han generado
  const totalCargosHistoricos = totalCargos + totalPagos;
  const porcentajePagado = totalCargosHistoricos > 0 ? (totalPagos / totalCargosHistoricos) * 100 : 0;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-usm-dark text-2xl mb-4">Resumen de Saldos y Movimientos</h1>
      <p className="text-usm-blue mb-6">
        Información de tus cargos, pagos y saldo acumulado.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-usm-light p-4 rounded shadow">
          <span className="text-gray-600 block mb-1">Total Deuda</span>
          <span className="text-usm-red font-bold text-lg">${totalCargos.toLocaleString()}</span>
        </div>
        <div className="bg-usm-light p-4 rounded shadow border-2 border-usm-green/30">
          <div className="flex flex-col">
            <span className="text-gray-600 block mb-1">Total Pagado</span>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-usm-green font-bold text-2xl">${totalPagos.toLocaleString()}</span>
              {totalCargosHistoricos > 0 && (
                <span className="text-gray-500 text-sm font-medium">
                  de ${totalCargosHistoricos.toLocaleString()}
                </span>
              )}
            </div>
            {totalCargosHistoricos > 0 && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Progreso de pago</span>
                  <span className="font-semibold">{porcentajePagado.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-usm-green h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(porcentajePagado, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-usm-light p-4 rounded shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h2 className="text-usm-dark font-semibold">Movimientos recientes</h2>
          
          {/* Filtros y búsqueda */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Búsqueda */}
            <input
              type="text"
              placeholder="Buscar por descripción, código o fecha..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-usm-blue focus:border-usm-blue"
            />
            
            {/* Filtro por tipo */}
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-usm-blue focus:border-usm-blue"
            >
              {tiposPago.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
            
            {/* Items por página */}
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-usm-blue focus:border-usm-blue"
            >
              {itemsPerPageOptions.map(option => (
                <option key={option} value={option}>{option} por página</option>
              ))}
            </select>
          </div>
        </div>

        {/* Información de resultados */}
        <div className="mb-3 text-sm text-gray-600">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredMovements.length)} de {filteredMovements.length} movimientos
          {filterTipo !== 'Todos' && ` (filtrado por: ${filterTipo})`}
        </div>

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
              {paginatedMovements.length > 0 ? (
                paginatedMovements.map((m, i) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No se encontraron movimientos con los filtros seleccionados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Anterior
              </button>
              
              {/* Números de página */}
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // Mostrar primera, última, actual y adyacentes
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 border rounded transition ${
                          currentPage === page
                            ? 'bg-usm-blue text-white border-usm-blue'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1"
              >
                Siguiente
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
