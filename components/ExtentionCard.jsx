import { useState } from "react";
import '../components/ExtentionCard.css'

const ExtentionCard = ({logo, name, description, isActive, handlecheckbox})=>{

    const [checked, isChecked] = useState(isActive)

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
                        onChange={ (e)=> {
                            isChecked(!checked) 
                            handlecheckbox(e)
                } }/>
                <label htmlFor={name}></label>
                
            </div>

        </li>
    )

}

export default ExtentionCard;