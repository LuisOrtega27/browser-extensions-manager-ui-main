import { useEffect, useState } from "react"
import ExtentionsShowcase from "../components/extentionsShowcase";
const URL = `./data.json`


const FetchData = async(URL, setExtentions) =>{
  
  try {
   
    const response = await fetch(URL);

    if (!response.ok) {

      throw new Error(`Response status: ${response.status}`);

    }

    const json = await response.json();

    setExtentions(json)

  } catch (error) {

    console.error(error.message);

  }

}


function App() {
  const [extentions, setExtentions] = useState([])

  useEffect( () => { FetchData( URL, setExtentions ), [] });

  return (
    <>
      <main>

        <header>
          <img src="./assets/images/favicon-32x32.png" alt="./assets/images/logo.svg" />
          <h2>Extentions</h2>
          <button><img src="./assets/images/icon-sun.svg" alt="./assets/images/icon-sun.svg" /></button>
        </header>

        <ExtentionsShowcase extentions={extentions} setExtentions={setExtentions}/>
        
      </main>      
    </>
  )
}

export default App
