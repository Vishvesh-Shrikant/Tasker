import React from 'react'
import {FormControl, FormHelperText, Tooltip} from '@chakra-ui/react'
import { Pencil, Check } from 'lucide-react'; 
const TaskDetailEdit = ({label, isEdit , setIsEdit, colourScheme, taskData, handleChange, tooltipPlacement, handleSubmit}) => {

  return (
    <div className='flex my-1'>
          <p className='mr-1'>{label}: </p>
          {
            !isEdit ?
            <div className='flex items-center justify-between w-1/4 border rounded '>
              <p className={`text-[${colourScheme}] bg-background outline-none font-semibold p-1 rounded w-full`}>{taskData}</p>
              <Tooltip label={`Edit Task ${label}`} 
              placement={tooltipPlacement}>
                <div className='text-[#A0EADE] p-1 cursor-pointer hover:bg-white/30 rounded mx-1' onClick={()=> {
                setIsEdit(true)
                }}>
                    <Pencil size={18} />
                </div>
              </Tooltip>

            </div>:
            <FormControl >
              <div className='flex items-center justify-between w-1/3 border rounded'>
                <input
                value={taskData} 
                type='text'
                onChange={handleChange}
                className={`text-[${colourScheme}] bg-background border-none outline-none rounded p-1 font-semibold `}/>

                <Tooltip label={`Confirm Task ${label}`} placement={tooltipPlacement}>
                    <div className='text-[#A0EADE] p-1 cursor-pointer hover:bg-white/30 rounded mx-1' 
                    onClick={()=> {
                    setIsEdit(false)
                    handleSubmit()
                    }}>
                    <Check size={18} />  
                    </div>
                </Tooltip>
              </div>
              
              {
                isEdit && 
                <FormHelperText>
                  Task {label} editing on 
                </FormHelperText>
              }
            </FormControl>
          }
          
        </div>
  )
}

export default TaskDetailEdit