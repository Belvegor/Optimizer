import React, { useState, useEffect } from 'react';
import binPack from 'bin-pack';


const OptimalPacking = ({ baseWidth, baseHeight, newDimensions }) => {
  const [packedDimensions, setPackedDimensions] = useState([]);

  useEffect(() => {
    if (baseWidth <= 0 || baseHeight <= 0 || newDimensions.length === 0) {
      console.warn("Brak spakowanych wymiarów. Renderowanie wartości null.");
      return;
    }

    try {
      const packedResult = binPack(newDimensions, { size: { width: baseWidth, height: baseHeight } });

      if (!Array.isArray(packedResult) && packedResult.items) {
        // If it's an object with 'items' property, extract the array
        setPackedDimensions(packedResult.items);
      } else if (Array.isArray(packedResult)) {
        setPackedDimensions(packedResult);
      } else {
        console.error("Nieprawidłowe wymiary podstawowe lub brak nowych wymiarów. Nie można przeprowadzić pakowania. ", packedResult);
      }
    } catch (error) {
      console.error("Błąd podczas przetwarzania wymiarów:", error);
    }
  }, [baseWidth, baseHeight, newDimensions]);

  if (!Array.isArray(packedDimensions) || packedDimensions.length === 0) {
    console.warn("Brak spakowanych wymiarów. Renderowanie wartości null.");
    return null;
  }

  console.log("Spakowane wymiary:", packedDimensions);

  const renderedDimensions = packedDimensions.map((dimension, index) => (
    <div key={index} style={{ position: 'absolute', left: dimension.x, top: dimension.y, border: '1px solid black' }}>
      {`Szerokość: ${dimension.width}, Wysokość: ${dimension.height}`}
    </div>
  ));

  return (
    <div style={{ position: 'relative', width: baseWidth, height: baseHeight, border: '1px solid red' }}>
      {renderedDimensions}
    </div>
  );
};

export default OptimalPacking;
