import { useEffect, useState } from "react"
import '../components/ExtentionsShowcase.css';
import '../components/ExtentionCard.css'

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
  
  const handlecheckbox = ( currentExtention )=>{
    
    setExtentions(
      [...extentions, currentExtention.isActive= !currentExtention.isActive]
    )
    console.log(currentExtention)    
    
  }

  const handleRemove = (name)=>{

    let targetIndex = extentions.findIndex( obj => obj.name == name)

    let newArr = JSON.parse(JSON.stringify(extentions))
    
    newArr.splice(targetIndex, 1)

    setExtentions(newArr)

  }

  return (
    <>
      <main>

        <header>
          
          <img src="./assets/images/logo.svg" alt="./assets/images/logo.svg" />
          
          <button><img src="./assets/images/icon-sun.svg" alt="./assets/images/icon-sun.svg" /></button>

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

            { filteredExtentions.length>0 && 

              filteredExtentions.map( (extention,index) => {

                return (
                  <li className="ExtentionCard" key={`extention-${index}`}>
            
                      <div>
                          <picture> <img src={extention.logo} alt={extention.logo}/> </picture>
                          <div> 
                              <h4>{extention.name}</h4> 
                              <p>{extention.description}</p>
                          </div>
                      </div>
                      
                      <div className="ExtentionCardActions">

                          <button onClick={ ()=> handleRemove(extention.name) }>Remove</button>

                          <input type="checkbox" 
                                  checked={extention.isActive} 
                                  id={extention.name}
                                  name={extention.name}
                                  onChange={ ()=> handlecheckbox(extention) }
                          />

                          <label htmlFor={extention.name}></label>
                          
                      </div>

                  </li>
                )

              })

            }

            </ul>

      </main>      
    </>
  )
}

export default App
