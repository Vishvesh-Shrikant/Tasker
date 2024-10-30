import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/AxiosApi'
import { Pencil, Check } from 'lucide-react';

const colourScheme={
  'backlog':'#8D99AE',
  'todo':'#FFB100',
  'inprogress':'#25CED1',
  'completed':'#7AC74F'
}

const status={
  'backlog':'Backlog',
  'todo':'To-do',
  'inprogress':'In Progress',
  'completed':'Completed'
}


const TaskDesc = () => {

    const {teamId, taskId}= useParams()
    const [task, setTask]= useState({})
    const [isNameEdit, setIsNameEdit]= useState(false)

    const [taskName, setTaskName]= useState(task.taskName)
    const [taskDescription, setTaskDescription]= useState(task.taskDescription)

    let taskStatus=''

    const getTask=()=>{
      api.get(`/user/${teamId}/task/get/${taskId}`, {
        headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
      })
      .then(res=>{
        if(res.data.success)
        {
          setTask(res.data.task)
          setTaskName(res.data.task.taskName)
          setTaskDescription(res.data.task.taskDescription)
        }
      })
      .catch(err=>console.log(err))
    }
    useEffect(()=>{
      getTask()
    },[])

    if(task!==undefined)
    {
      taskStatus= task.status
    }
    
    const handleChange=(e)=>{
      let newTask= e.target.value
      setTaskName(newTask)
    }
    
  return (
    <div className='ml-20 py-10 px-5 font-Raleway'>
      <div className='text-xl'>
        <div className='flex '>
          <p className='mr-1'>Name: </p>
          {
            !isNameEdit ?
            <div className='flex justify-center items-center '>
              <span className={`text-[${colourScheme[taskStatus]}] bg-background outline-none font-semibold mx-1 w-1/3`}>{taskName}</span>
              <div className='text-[#A0EADE] border rounded p-1 cursor-pointer' onClick={()=> setIsNameEdit(true)}>
                <Pencil size={18} />
              </div>
              
            </div>:
            <div className='flex justify-center items-center' >
              <input
              value={taskName} 
              type='text'
              onChange={handleChange}
              className={`text-[${colourScheme[taskStatus]}] bg-background outline-none font-semibold`}/>
              <div className='text-[#A0EADE] border rounded p-1 cursor-pointer w-1/3' onClick={()=> setIsNameEdit(false)}>
                <Check size={18} />  
              </div>
            </div>

          }
          
        </div>
        <p>Description: <span className={`text-[${colourScheme[taskStatus]}] font-semibold`}>{taskDescription}</span></p>
        <p>Task Status: <span className={`text-[${colourScheme[taskStatus]}] font-semibold`}> {status[taskStatus]}</span></p>
      </div>
    </div>
  )
}

export default TaskDesc