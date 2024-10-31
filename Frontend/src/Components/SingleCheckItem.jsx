import React, {useRef, useState} from 'react'
import {Select} from '@chakra-ui/react'
import { Trash } from 'lucide-react'


const SingleCheckItem = ({id, bgColour, itemName, onDropdownChange, status, deleteChecklist}) => {
  return (
    <div className='my-5 px-10 flex items-center '>
        <div className='cursor-pointer border rounded p-1' onClick={()=>{deleteChecklist(id)}}>
          <Trash size={22} color='red' />
        </div>
        <Select 
        size='sm' 
        width={'25%'} 
        bg={bgColour} borderColor={bgColour}
        className='border-none outline-none rounded mx-2 font-semibold text-lg'
        onChange={e=>onDropdownChange(e, id)}
        defaultValue={status}>
            <option value='backlog'>Backlog</option>
            <option value='todo'>To-Do</option>
            <option value='ongoing'>In-Progress</option>
            <option value='completed'>Done</option>
        </Select>
        <p className={`mx-5 text-xl ${status==='completed'? 'line-through opacity-80':'opacity-100'}`}>
        {itemName}
        </p>

    </div>
  )
}

export default SingleCheckItem