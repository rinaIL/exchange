import './App.css';
import Nav2 from '../src/components/navbar/navbar'
import LineChart from './components/charts/linechart';

function App() {
  return (
    <div className="App">
       <Nav2 />
      <div className="main-chart">
        <div className='chart'>
          <LineChart />
        </div>
      </div>

    </div>
  );
}

export default App;
