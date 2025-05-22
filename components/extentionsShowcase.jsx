import { useEffect, useState } from "react";
import ExtentionCard from "../components/ExtentionCard";

import '../components/ExtentionsShowcase.css';


const ExtentionsShowcase = ({extentions})=>{
    
    const [currentFilter, setcurrentFilter] = useState("all")
    const [filteredExtentions, setFilteredExtentions] = useState(extentions)


    useEffect(()=>{

        switch (currentFilter){
            case "all":  
                setFilteredExtentions(extentions) // do nothing
                break;

            case "active": 
                setFilteredExtentions( null )
                setFilteredExtentions( extentions.filter( (item)=> item.isActive===true ) )
                break;

            case "inactive": 
                setFilteredExtentions( null )
                setFilteredExtentions( extentions.filter( (item)=> item.isActive===false ) )
                break;
            default: console.log(`there's been an error`)
        }

    }, [currentFilter, extentions])
    
    const handleRadio = (e)=>{
        setcurrentFilter(e.target.value)
    }

    return(
        <>
            <header>
                <h1>Extentions</h1>

                <div>
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

                return <ExtentionCard 
                            key={`extention-${index}`}
                            logo={extention.logo} 
                            name={extention.name} 
                            description={extention.description} 
                            isActive={extention.isActive} />
                })

            }

            </ul>
        </>

    )

}

export default ExtentionsShowcase