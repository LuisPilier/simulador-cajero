import React, { useState } from 'react';
import './App.css';

function App() {
  const [saldo, setSaldo] = useState(1000);
  const [monto, setMonto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const consultarSaldo = () => {
    setMensaje(`Saldo actual: $${saldo}`);
  };

  const realizarOperacion = (tipoOperacion) => {
    const montoFloat = parseFloat(monto);

    try {
      if (isNaN(montoFloat) || montoFloat <= 0) {
        throw new Error('Ingrese un monto válido.');
      }

      if (tipoOperacion === 'retiro' && montoFloat > saldo) {
        throw new Error('Saldo insuficiente.');
      }

      const nuevoSaldo = tipoOperacion === 'retiro' ? saldo - montoFloat : saldo + montoFloat;
      setSaldo(nuevoSaldo);
      setMensaje(`${tipoOperacion.charAt(0).toUpperCase() + tipoOperacion.slice(1)} exitoso. Saldo actual: $${nuevoSaldo}`);
    } catch (error) {
      setMensaje(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Simulador de Cajero Automático</h1>
      <div id="saldo-container">
        <p id="saldo">Saldo actual: ${saldo}</p>
      </div>
      <div id="operaciones">
        <label htmlFor="monto">Monto:</label>
        <input
          type="number"
          id="monto"
          placeholder="Ingrese el monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <button onClick={consultarSaldo}>Consultar Saldo</button>
        <button onClick={() => realizarOperacion('retiro')}>Realizar Retiro</button>
        <button onClick={() => realizarOperacion('deposito')}>Hacer Depósito</button>
      </div>
      <div id="mensaje-container">
        <p id="mensaje">{mensaje}</p>
      </div>
    </div>
  );
}

export default App;
