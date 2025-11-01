import React from 'react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

const System: React.FC = () => {
    const navigateTo = useNavigate();

    const actions = [
        { label: 'Resumen movimientos', route: '/summary' },
        { label: 'Pagar', route: '/charges' },
        { label: 'Becas y pagos recibidos', route: '/scholarship' },
        //{ label: 'Datos personales', route: '/personal-data' },
    ];

    return (
        <div className="px-4 py-2 max-w-4xl mx-auto">
            <h1 className="text-usm-dark text-2xl mb-4 text-center">
                Bienvenido(a), NOMBRE APELLIDO, al Portal de Autoservicio Institucional
            </h1>

            <div className="w-full flex justify-center space-x-4 flex-wrap">
                {actions.map((action, index) => (
                    <div key={index}>
                        <Button
                            onClick={() => navigateTo(action.route)}
                            className="text-center whitespace-nowrap min-w-max"
                        >
                            {action.label}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default System;
