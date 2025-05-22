import { useEffect, useState } from "react";
import ExtentionCard from "../components/ExtentionCard";




const ExtentionsShowcase = ({extentions})=>{
    
    const [isChecked, setIsChecked] = useState("all")

    useEffect(()=>{



    }, [isChecked])
    
    const handleRadio = (e)=>{
        setIsChecked(e.target.value)
    }

    return(
        <>
            <header>
                <h1>Extentions</h1>

                <div>
                    <input type="radio" name="selection" id="all" value="all" onChange={ (e)=>handleRadio(e) } />
                    <input type="radio" name="selection" id="Active" value="Active" onChange={ (e)=>handleRadio(e) } />
                    <input type="radio" name="selection" id="Inactive" value="Inactive" onChange={ (e)=>handleRadio(e) } />
                </div>
                
            </header>
            <ul>

            { extentions.length>0 && 

                extentions.map( (extention,index) => {

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