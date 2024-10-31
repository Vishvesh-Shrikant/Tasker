import React, {useRef, useState} from 'react'
import {Select} from '@chakra-ui/react'
import { Trash } from 'lucide-react'


const SingleCheckItem = ({id, bgColour, itemName, onDropdownChange, status}) => {
  const [checked, setIsChecked]= useState(false)
  const {optRef}= useRef()
  return (
    <div className='my-5 px-10 flex items-center '>
        <div className='cursor-pointer border rounded p-1'>
          <Trash size={18} color='red' />
        </div>
        <Select 
        ref={optRef}
        size='xs' 
        width={'15%'} 
        bg={bgColour} borderColor={bgColour}
        className='border-none outline-none rounded mx-2 font-semibold text-lg'
        onChange={e=>onDropdownChange(e, id)}
        defaultValue={status}>
            <option value='backlog'>Backlog</option>
            <option value='todo'>To-Do</option>
            <option value='ongoing'>In-Progress</option>
            <option value='completed'>Done</option>
        </Select>
        <p className={`mx-5 ${checked? 'line-through opacity-80':'opacity-100'}`}>
        {itemName}
        </p>

    </div>
  )
}

export default SingleCheckItem