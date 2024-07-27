import React from "react";
import "./PersonnelTable.scss";

const PersonnelTable = () => {
  return (
    <div className="personnel-table">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Área</th>
            <th>Porcentaje de Asistencia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Juan Pérez</td>
            <td>Desarrollo</td>
            <td>90%</td>
          </tr>
          <tr>
            <td>María López</td>
            <td>Recursos Humanos</td>
            <td>95%</td>
          </tr>
          {/* Agrega más filas aquí según sea necesario */}
        </tbody>
      </table>
    </div>
  );
};

export default PersonnelTable;
