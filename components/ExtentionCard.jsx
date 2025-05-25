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
        <li className="
            bg-Neutral800 ExtentionCard 
            p-4 border border-Neutral600 rounded-2xl
            flex flex-wrap gap-4
        ">
            
            <picture className="w-[20%]"> <img src={logo} alt={logo}/> </picture>
            <div className="w-[70%]"> 
                <h2 className="text-xl font-bold mb-1">{name}</h2> 
                <p className="text-Neutral300">{description}</p>
            </div>
            
            <div className="
                    my-auto
                    ExtentionCardActions
                    w-full
                    flex justify-between items-center
                ">

                <button className=" 
                    border border-Neutral600 rounded-full
                    py-2 px-4
                    hover:bg-Red500
                    cursor-pointer
                " onClick={ ()=> handleRemove(name) }>Remove</button>

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