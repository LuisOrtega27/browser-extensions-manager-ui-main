import { useState } from "react";

const ExtentionCard = ({logo, name, description, isActive})=>{

    const [checked, isChecked] = useState(isActive)

    return(
        <li>
            
            <div>
                <picture> <img src={logo} alt={logo}/> </picture>
                <div> 
                    <h4>{name}</h4> 
                    <p>{description}</p>
                </div>
            </div>
            
            <div>
                <button>Remove</button>
                <input type="checkbox" defaultChecked={checked} onClick={ ()=> isChecked(!checked) }/>
            </div>

        </li>
    )

}

export default ExtentionCard;