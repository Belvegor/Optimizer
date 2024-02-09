import DimensionsForm from './DimensionsForm';

const App = () => {
    const handleAddDimensions = (dimensionsData) => {
      // Ta funkcja zostanie wywołana po naciśnięciu przycisku "Zapisz" w DimensionsForm
      console.log('Nowe wymiary:', dimensionsData);
      
    };

        return (
    <div>
        <h1>PUT YOUR DIMENSONS HERE</h1>
        <DimensionsForm onAddDimensions={handleAddDimensions} />
    </div>
);

};

export default App;