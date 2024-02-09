import React, { useState, useEffect } from 'react';
import binPack from 'bin-pack';
import ElementBase from './ElementBase';
import NewDimensionsList from './NewDimensionsList';
import OptimalPacking from './OptimalPacking';

const DimensionsForm = ({ onAddDimensions }) => {
  const [baseWidth, setBaseWidth] = useState('');
  const [baseHeight, setBaseHeight] = useState('');
  const [newWidth, setNewWidth] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [newDimensions, setNewDimensions] = useState([]);
  const [packedDimensions, setPackedDimensions] = useState([]);

  useEffect(() => {
    if (baseWidth <= 0 || baseHeight <= 0 || newDimensions.length === 0) {
      console.warn("Invalid base dimensions or new dimensions. Cannot perform packing.");
      setPackedDimensions([]); // Clear packedDimensions in case of invalid data
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
        console.error("Failed to pack dimensions. Unexpected result:", packedResult);
      }
    } catch (error) {
      console.error("Error while packing dimensions:", error);
    }
  }, [baseWidth, baseHeight, newDimensions]);

  const handleAddDimensions = () => {
    const parsedWidth = parseFloat(newWidth);
    const parsedHeight = parseFloat(newHeight);

    if (!isNaN(parsedWidth) && !isNaN(parsedHeight)) {
      setNewDimensions([...newDimensions, { width: parsedWidth, height: parsedHeight }]);
      setNewWidth('');
      setNewHeight('');
    }
  };

  const handleSave = () => {
    const parsedBaseWidth = parseFloat(baseWidth);
    const parsedBaseHeight = parseFloat(baseHeight);

    if (!isNaN(parsedBaseWidth) && !isNaN(parsedBaseHeight) && newDimensions.length > 0) {
      const dimensionsData = {
        baseWidth: parsedBaseWidth,
        baseHeight: parsedBaseHeight,
        elements: newDimensions,
      };
      onAddDimensions(dimensionsData);
      setBaseWidth('');
      setBaseHeight('');
      setNewDimensions([]);
      setPackedDimensions([]); // Clear packedDimensions after saving
    }
  };

  return (
    <div>
      <OptimalPacking baseWidth={baseWidth} baseHeight={baseHeight} newDimensions={newDimensions} />

      <ElementBase baseWidth={baseWidth} baseHeight={baseHeight} packedDimensions={packedDimensions} />
      <NewDimensionsList packedDimensions={packedDimensions} />

      <label>
        Szerokość Elementu Bazowego:
        <input type="number" value={baseWidth} onChange={(e) => setBaseWidth(e.target.value)} />
      </label>
      <br />
      <label>
        Wysokość Elementu Bazowego:
        <input type="number" value={baseHeight} onChange={(e) => setBaseHeight(e.target.value)} />
      </label>

      <hr />

      <NewDimensionsList packedDimensions={packedDimensions} />

      <label>
        Szerokość:
        <input type="number" value={newWidth} onChange={(e) => setNewWidth(e.target.value)} />
      </label>
      <br />
      <label>
        Wysokość:
        <input type="number" value={newHeight} onChange={(e) => setNewHeight(e.target.value)} />
      </label>
      <br />
      <button onClick={handleAddDimensions}>Dodaj Element</button>

      <hr />

      <h2>Zapisz Dane</h2>
      <button onClick={handleSave}>Zapisz</button>
    </div>
  );
};

export default DimensionsForm;