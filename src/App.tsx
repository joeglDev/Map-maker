import './App.css'
import { explanatoryText } from './constants/text.constants'
import { MapAndControls } from './components/MapAndControls'

function App() {


  return (
    <>
      <h1>Fantasy map generator</h1>
      <p>{explanatoryText}</p>
      <MapAndControls />
    </>
  )
}

export default App
