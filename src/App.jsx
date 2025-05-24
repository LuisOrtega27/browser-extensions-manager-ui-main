import { useEffect, useState } from "react"
import '../components/ExtentionsShowcase.css';
import '../components/ExtentionCard.css'
import ExtentionCard from "../components/ExtentionCard";

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
  const [currentFilter, setcurrentFilter] = useState("all")
  const [filteredExtentions, setFilteredExtentions] = useState(extentions)

  useEffect( () => { FetchData( URL, setExtentions ) },[]); // FETCH

  useEffect(()=>{ //FILTER

      switch (currentFilter){
          case "all":  
              setFilteredExtentions(extentions) // do nothing
              break;

          case "active": 
              setFilteredExtentions( extentions.filter( (item)=> item.isActive===true ) )
              break;

          case "inactive": 
              setFilteredExtentions( extentions.filter( (item)=> item.isActive===false ) )
              break;
          default: console.log(`there's been an error`)
      }

  }, [currentFilter, extentions])
  
  const handleRadio = (e)=>{ // CHANGE FILTER
      setcurrentFilter(e.target.value)
  }
  

  return (
    <>
      <main>

        <header>
          
          <div>
            <img src="./assets/images/logo.svg" alt="./assets/images/logo.svg" />
            <button><img src="./assets/images/icon-sun.svg" alt="./assets/images/icon-sun.svg" /></button>
          </div>

          <h1>Extentions</h1>

          <div className="filterArea">
              <label htmlFor="all">All</label>
              <input type="radio" name="selection" id="all" value="all" onChange={ (e)=>handleRadio(e) } defaultChecked/>
              
              <label htmlFor="active">Active</label>
              <input type="radio" name="selection" id="active" value="active" onChange={ (e)=>handleRadio(e) } />

              <label htmlFor="inactive">Inactive</label>
              <input type="radio" name="selection" id="inactive" value="inactive" onChange={ (e)=>handleRadio(e) } />
          </div>

        </header>

            <ul className="ExtentionsShowcase">

            { filteredExtentions.length === 0 
              ?
              <p>There's no items in the list</p>
              :

              filteredExtentions.map( (extention,index) => {

                return ( 
                  <ExtentionCard 
                    extention={extention} 
                    setExtentions={setExtentions} 
                    extentions={extentions} 
                    index={index} 
                    key={index}/> 
                )

              })

            }

            </ul>

      </main>      
    </>
  )
}

export default App
