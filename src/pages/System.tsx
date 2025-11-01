import React from 'react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import {Summary} from './Summary'
import {Charges} from './Charges'
import {ScholarshipPayments} from './Scholarship'
import {PersonalData} from './PersonalData'

const GreyBox: React.FC<{ content: () => React.ReactNode }> = ({ content }) => {
  const style = {
    border: '2px solid grey',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#f4f4f4',
  };

  return <div style={style}>{content()}</div>;
};


const System: React.FC = () => {
    const navigateTo = useNavigate();

    const actions = [
        { label: 'Resumen movimientos', fn: Summary },
        { label: 'Pagar', fn: Charges },
        { label: 'Becas y pagos recibidos', fn: ScholarshipPayments },
        { label: 'Datos personales', fn: PersonalData },
    ];

    return (
        <div className="px-4 py-2 max-w-4xl mx-auto">
            <h1 className="text-usm-dark text-2xl mb-4 text-center">
                Bienvenido(a), NOMBRE APELLIDO, al Portal de Autoservicio Institucional
            </h1>

            <div className="w-full flex justify-center space-x-4 flex-wrap">
                {actions.map((action, index) => (
                    <div key={index}>
                        <GreyBox content={() => <action.fn />}/>
                    </div>
                ))}
            </div>
        </div>
    );
};  

export default System;
