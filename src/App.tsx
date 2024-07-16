import { Toaster } from 'react-hot-toast';
import './App.css';
import DisplayWeather from './components/DisplayWeather';

function App() {
  return (
    <div className="App">
     <DisplayWeather/>
     <Toaster/>
    </div>
  );
}

export default App;
