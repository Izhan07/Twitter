import React, { useId } from 'react'
import { forwardRef } from 'react'

 function Input({
    type,
    className,
    labelClass,
    label,
    ...props
 },ref){
    const Id = useId()

    return(
        <>
         {label && <label className={`${labelClass} `} htmlFor={Id}>
            {label}
            </label>}
            <input
            type={type}
            className={`${className}  autofill:bg-white
            `}
            ref= {ref}
            id = {Id}
            {...props}
            >
            
            </input>
        </>
    )
 }

 export default forwardRef(Input)