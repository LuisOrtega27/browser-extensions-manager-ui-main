import { useEffect, useState } from "react"
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
      <main className="
            bg-linear-to-b from-darkTop to-darkbottom
            min-h-full
            text-Neutral0 
            p-4 lg:p-20 
            font-notoVariable 
      ">

        <header>
          
          <div className="bg-Neutral800 rounded-xl p-2 flex justify-between">
            <img src="./assets/images/logo.svg" alt="./assets/images/logo.svg" />
            <button className="bg-Neutral700 hover:bg-Neutral600 p-4 rounded-2xl cursor-pointer"><img src="./assets/images/icon-sun.svg" alt="./assets/images/icon-sun.svg" /></button>
          </div>

          <h1 className="text-Neutral0 text-4xl font-bold text-center mt-8">Extentions List</h1>

          <div className="filterArea flex justify-around">
              
              <input className="filterRadio hidden" type="radio" name="selection" id="all" value="all" onChange={ (e)=>handleRadio(e) } defaultChecked/>  
              <label className="
                      cursor-pointer
                      filterButton
                      bg-Neutral700 
                      hover:bg-Neutral600
                      text-Neutral300 text-xl 
                      py-2 px-6 my-6
                      inline-block 
                      rounded-full" htmlFor="all">
                  All
              </label>
              
              <input className="filterRadio hidden" type="radio" name="selection" id="active" value="active" onChange={ (e)=>handleRadio(e) } />  
              <label className="
                      cursor-pointer
                      filterButton
                      bg-Neutral700 
                      hover:bg-Neutral600
                      text-Neutral300 text-xl 
                      py-2 px-6 my-6
                      inline-block 
                      rounded-full" htmlFor="active">
                  Active
              </label>
              
              <input className="filterRadio hidden" type="radio" name="selection" id="inactive" value="inactive" onChange={ (e)=>handleRadio(e) } />  
              <label className="
                      cursor-pointer
                      filterButton
                      bg-Neutral700 
                      hover:bg-Neutral600
                      text-Neutral300 text-xl 
                      py-2 px-6 my-6
                      inline-block 
                      rounded-full" htmlFor="inactive">
                  Inactive
              </label>
              

          </div>

        </header>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            { filteredExtentions.length === 0 
              ?
              <p className="mx-auto mt-10 text-2xl align-bottom">There's no items in this list</p>
              :

              filteredExtentions.map( (extention,index) => {

                return ( 
                  <ExtentionCard 
                    extention={extention} 
                    setExtentions={setExtentions} 
                    extentions={extentions} 
                    index={index} 
                    key={index}
                  /> 
                )

              })

            }

            </ul>

      </main>      
    </>
  )
}

export default App
