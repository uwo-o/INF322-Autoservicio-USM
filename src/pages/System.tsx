import React from 'react';
import { Summary } from './Summary';
import { Charges } from './Charges';
import { ScholarshipPayments } from './Scholarship';

const Card: React.FC<{ title: string; Component: React.FC }> = ({ title, Component }) => (
<div className="bg-white rounded-lg shadow p-4 w-full min-w-[220px] flex flex-col"> 
    <div className="text-sm overflow-auto">
        <Component />
    </div>
</div>
);

const System: React.FC = () => {
  return (
    <div className="px-4 py-2 w-10/12 mx-auto">
      <h1 className="text-usm-dark text-2xl mb-6 text-center">
        Bienvenido(a) al Portal de Autoservicio Institucional
      </h1>

      {/* First row: Summary + Charges side by side */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <Card title="Resumen movimientos" Component={Summary} />
        </div>
        <div className="flex-1">
          <Card title="Pagar" Component={Charges} />
        </div>
      </div>

      {/* Second row: Scholarship full width */}
      <div className="flex flex-col">
        <Card title="Becas y pagos recibidos" Component={ScholarshipPayments} />
      </div>
    </div>
  );
};

export default System;