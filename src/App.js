import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './components/TopButtons';
import Input from './components/Input';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function App() {

  const [query, setQuery] = useState({q: 'chernivtsi'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)


  useEffect(() => {
    const fetchWeater = async () =>{
      const message = query.q ? query.q : 'current location.'

      toast.info('Fetching weather from ' + message)

      await getFormattedWeatherData({...query, units}).then(data => {

        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)

        setWeather(data);
      });
      
    }
  
    fetchWeater();
  }, [query, units])

  return (
   <div className={`mx-auto max-w-sreen-md mt-4 py-5 px-32 bg-gradient-to-br from-green-700 to-blue-700 h-fit shadow-xl shadow-gray-400 `}>
    <TopButtons setQuery={setQuery}/>
    <Input setQuery={setQuery} units={units} setUnits={setUnits}/>

    {weather && (
      <div>
        <TimeAndLocation weather={weather}/>
        <TemperatureAndDetails weather={weather}/>
        <Forecast title='hourly forecast' items={weather.hourly}/>
        <Forecast title='dayly forecast' items={weather.daily}/> 
        </div>
    )}



  <ToastContainer autoClose={1500} theme='colored' newestOnTop={true}/>

   </div>
  );
}

export default App;
