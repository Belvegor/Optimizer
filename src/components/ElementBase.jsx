
const ElementBase = ({ baseWidth, baseHeight, packedDimensions }) => {
    if (baseWidth <= 0 || baseHeight <= 0 || !Array.isArray(packedDimensions) || packedDimensions.length === 0) {
      return <p>Brak danych do wyświetlenia</p>;
    }
  
    return (
      <svg width={baseWidth} height={baseHeight} style={{ border: '2px solid black' }}>
        <rect width="100%" height="100%" fill="#eee" />
        {packedDimensions.map(({ width, height, x, y }, index) => (
          <rect key={index} x={x} y={y} width={width} height={height} fill="blue" stroke="black" strokeWidth="2" />
        ))}
      </svg>
    );
  };
  
  export default ElementBase;   