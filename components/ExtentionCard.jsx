import { useState } from "react";
import '../components/ExtentionCard.css'

const ExtentionCard = ( {extention, setExtentions, extentions} )=>{

    const {logo, name, description, isActive} = extention

    const handleCheckbox = ( currentExtention )=>{ // CHANGE CARD CHECKBOX

        let newArr = JSON.parse(
            JSON.stringify(
                [...extentions, currentExtention.isActive= !currentExtention.isActive ]
            )
        )
        newArr.pop()

        setExtentions(newArr)
    
    }

    const handleRemove = (name)=>{ // REMOVE CARD

        let targetIndex = extentions.findIndex( obj => obj.name == name)

        let newArr = JSON.parse(JSON.stringify(extentions))

        
        newArr.splice(targetIndex, 1)

        setExtentions(newArr)

    }

    return(
        <li className="ExtentionCard">
            
            <div>
                <picture> <img src={logo} alt={logo}/> </picture>
                <div> 
                    <h4>{name}</h4> 
                    <p>{description}</p>
                </div>
            </div>
            
            <div className="ExtentionCardActions">

                <button onClick={ ()=> handleRemove(name) }>Remove</button>

                <input type="checkbox" 
                        checked={isActive} 
                        id={name}
                        name={name}
                        onChange={ ()=> handleCheckbox(extention) }
                />

                <label htmlFor={name}></label>
                
            </div>

        </li>
    )

}

export default ExtentionCard;