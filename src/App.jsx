import { useEffect, useState } from "react"

import ExtentionCard from "./components/ExtentionCard";

const URL = `data.json` 

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
  const [theme, setTheme] = useState('dark')

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

  const handleTheme = ()=>{ theme === 'dark' ? setTheme('light') : setTheme('dark') }



  return (
    <>
      <main className={`
        bg-linear-to-b
        ${theme === 'dark' ? ' from-darkTop to-darkbottom text-Neutral0 ' : 'from-lightTop to-lightbottom text-Neutral900'}
        transition-colors
        min-h-full
        p-4 lg:px-20 
        font-notoVariable 
      `}>

        <header className="flex flex-wrap">
          
          <div className={` THEME-ICON
            ${theme === 'dark' ? 'bg-Neutral800' : 'bg-Neutral0'}
            w-full
            sm:mb-10
            rounded-xl p-2 
            flex justify-between
          `}>

            <img src="./assets/images/logo.svg" alt="./assets/images/logo.svg"/>

            <button className={`
              ${theme === 'dark' ? 'bg-Neutral700 hover:bg-Neutral600' : 'bg-Neutral200 hover:bg-Neutral100'}
              p-4 rounded-2xl 
              cursor-pointer
              outline-custom
            `} onClick={handleTheme}>
              {theme === 'dark' 
                ? 
                <img src="./assets/images/icon-sun.svg" alt="./assets/images/icon-sun.svg" />
                :
                <img src="./assets/images/icon-moon.svg" alt="./assets/images//icon-moon.svg" />  
              }
              
            </button>

          </div>

          <h1 className="w-full sm:w-1/2 text-4xl font-bold text-center sm:text-left mt-8">Extentions List</h1>

          <div className="w-full sm:w-1/2 filterArea flex justify-around sm:justify-end sm:gap-4">
              
            <input className="filterRadio hidden" type="radio" name="selection" id="all" value="all" onChange={ (e)=>handleRadio(e) } defaultChecked/>  
            <label  htmlFor="all" className="cursor-pointer ">
              <button className={`
                ${theme === 'dark' 
                  ? 'bg-Neutral700  text-Neutral300 text-xl '
                  : 'bg-Neutral0 text-Neutral900'
                }
              hover:bg-Neutral600
                filterButton
                py-2 px-6 my-6
                inline-block 
                rounded-full
                outline-custom
                pointer-events-none
              `}>
                All
              </button>
            </label>
            
            <input className="filterRadio hidden" type="radio" name="selection" id="active" value="active" onChange={ (e)=>handleRadio(e) } />  
            <label htmlFor="active" className="cursor-pointer">
              <button className={`
                ${theme === 'dark' 
                  ? 'bg-Neutral700  text-Neutral300 text-xl '
                  : 'bg-Neutral0 text-Neutral900'
                }
                filterButton
                hover:bg-Neutral600
                py-2 px-6 my-6
                inline-block 
                rounded-full
                outline-custom
                pointer-events-none
              `}>
                Active
              </button>
            </label>
            
            <input className="filterRadio hidden" type="radio" name="selection" id="inactive" value="inactive" onChange={ (e)=>handleRadio(e) } />  
            <label htmlFor="inactive" className="cursor-pointer">
              <button className={`
                ${theme === 'dark' 
                  ? 'bg-Neutral700  text-Neutral300 text-xl '
                  : 'bg-Neutral0 text-Neutral900'
                }
                filterButton
                hover:bg-Neutral600
                py-2 px-6 my-6
                inline-block 
                rounded-full
                outline-custom
                pointer-events-none
              `}>
                Inactive
              </button>
            </label>
              

          </div>

        </header>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            { filteredExtentions.length === 0 
              ?
              <p className="w-full col-span-3 text-center mx-auto mt-20 text-2xl">There's no items in this list</p>
              :

              filteredExtentions.map( (extention,index) => {

                return ( 
                  <ExtentionCard 
                    extention={extention} 
                    setExtentions={setExtentions} 
                    extentions={extentions} 
                    index={index} 
                    key={index}
                    theme={theme}
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
