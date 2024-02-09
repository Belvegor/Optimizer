const NewDimensionsList = ({ packedDimensions }) => {
  if (!Array.isArray(packedDimensions) || packedDimensions.length === 0) {
    return <p>Brak danych do wyświetlenia</p>;
  }

  return (
    <div>
      <h2>Nowe Wymiary Elementów</h2>
      <ul>
        {packedDimensions.map(({ width, height, x, y }, index) => (
          <li key={index}>{`Szerokość: ${width}, Wysokość: ${height}, Pozycja: (${x}, ${y})`}</li>
        ))}
      </ul>
    </div>
  );
};

export default NewDimensionsList;