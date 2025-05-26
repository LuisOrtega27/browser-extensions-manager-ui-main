import '../components/ExtentionList.css'

const ExtentionCard = ( {extention, setExtentions, extentions, theme} )=>{

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
        <li className={`
            ExtentionCard
            ${theme === 'dark' ? 'bg-Neutral800 border border-Neutral600 ' : 'bg-Neutral0 shadow-neutral'}
            flex flex-wrap gap-4
            rounded-2xl
            p-4 
            lg:min-h-50
        `}>
            
            <picture className="w-[20%]"> <img src={`browser-extensions-manager-ui-main/${logo}`} alt={`browser-extensions-manager-ui-main/${logo}`}/> </picture>
            <div className="w-[70%]"> 
                <h2 className="text-xl font-bold mb-1">{name}</h2> 
                <p className={`
                    ${theme === 'dark' ? 'text-Neutral300' : 'text-Neutral800'}
                `}>{description}</p>
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
                    outline-custom

                " onClick={ ()=> handleRemove(name) }>Remove</button>

                <input type="checkbox" 
                        checked={isActive} 
                        id={name}
                        name={name}
                        onChange={ ()=> handleCheckbox(extention) }
                />

                <label htmlFor={name}><button className="outline-custom"></button></label>
                
            </div>

        </li>
    )

}

export default ExtentionCard;