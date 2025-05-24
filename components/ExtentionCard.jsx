import { useState } from "react";
import '../components/ExtentionCard.css'

const ExtentionCard = ({index, extention, logo, name, description, isActive, handlecheckbox})=>{



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

                <button>Remove</button>

                <input type="checkbox" 
                        checked={isActive} 
                        id={name}
                        name={name}
                        onChange={ ()=> handlecheckbox(index) }
                />
                <label htmlFor={name}></label>
                
            </div>

        </li>
    )

}

export default ExtentionCard;