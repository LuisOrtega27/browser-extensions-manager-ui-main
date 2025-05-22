import { useEffect, useState } from "react"
import ExtentionsShowcase from "../components/extentionsShowcase";
const URL = `./data.json`


// const FetchData = async(URL) =>{
  
//   try {
   
//     const response = await fetch(URL);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     // console.log(json);

//     return json;

//   } catch (error) {
//     console.error(error.message);
//   }

// }


function App() {
  const [extentions, setExtentions] = useState([])

  useEffect( () => {

    fetch(URL)
    .then( response => response.json() )
    .then( data => setExtentions(data) )

    
  }, []);

  return (
    <>
      <main>

        <header>
          <img src="./assets/images/favicon-32x32.png" alt="./assets/images/favicon-32x32.png" />
          <h2>Extentions</h2>
          <button><img src="./assets/images/icon-sun.svg" alt="./assets/images/icon-sun.svg" /></button>
        </header>

        <ExtentionsShowcase extentions={extentions} setExtentions={setExtentions}/>
        
      </main>      
    </>
  )
}

export default App
