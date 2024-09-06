import React, { useId } from 'react'
import { forwardRef } from 'react'

 function Input({
    type,
    className,
    label,
    ...props
 },ref){
    const Id = useId()

    return(
        <>
         {label && <label htmlFor={Id}>
            {label}
            </label>}
            <input
            type={type}
            className={`${className}`}
            ref= {ref}
            id = {Id}
            {...props}
            >
            
            </input>
        </>
    )
 }

 export default forwardRef(Input)