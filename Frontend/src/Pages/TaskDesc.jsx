import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/AxiosApi'
import TaskDetailEdit from '../Components/TaskDetailEdit';
import SingleCheckItem from '../Components/SingleCheckItem';
import { Plus } from 'lucide-react';
import ChecklistModal from '../Components/ChecklistModal';
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
    const [checklist, setChecklist]= useState([])
    const [dropdownVal,setDropdownVal]= useState([])
    const [isNameEdit, setIsNameEdit]= useState(false)
    const [isDescEdit , setIsDescEdit]= useState(false)
    const [taskName, setTaskName]= useState(task.taskName)
    const [taskDescription, setTaskDescription]= useState(task.taskDescription)
    const [isOpen, setIsOpen]= useState(false)

    const onOpen=()=> setIsOpen(true)
    const onClose=()=> setIsOpen(false)


    let counter=0
    let taskStatus=''

    const dropdownBg={
      'backlog':'#77878BBB',
      'todo':'#FEEA0099',
      'ongoing':'#00AFB999',
      'completed':'#5CF64A88'
    }


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
    const getChecklistItems=()=>{
      api.get(`/user/${taskId}/checklist/get`, {
        headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
      })
      .then(res=>{
        if(res.data.success)
        {
          setChecklist(res.data.getListItems)
          let items=[]
          for(let i=0; i < res.data.getListItems.length ;i++)
          { 
            items[i]=res.data.getListItems[i].status
          }
          setDropdownVal(items)
        }
          
      })
      .catch(err=>{
        console.log(err)
      })
    }

    useEffect(()=>{
      getTask()
      getChecklistItems()
    },[])


    if(task!==undefined)
    {
      taskStatus= task.status
    }
    
    const handleNameChange=(e)=>{
      let newTaskName= e.target.value
      setTaskName(newTaskName)
    }
    const handleNameSubmit=()=>{
      api.patch(`/user/${teamId}/task/update/${taskId}`, {taskName: taskName}, {
        headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
      })
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    }

    const handleDescChange=(e)=>{
      let newTaskDesc= e.target.value
      setTaskDescription(newTaskDesc)
    }
    const handleDescSubmit=()=>{
        api.patch(`/user/${teamId}/task/update/${taskId}`, {taskDescription: taskDescription}, {
          headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
        })
        .then(res=>{
          console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })
    }

    const onDropdownChange=(e, id)=>{
      let listId= checklist[id]._id
      let status= e.target.value
      api.patch(`/user/${taskId}/checklist/update/${listId}`, {status: status}, {
        headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
      })
      .then(res=>{
        getChecklistItems()
      })
      .catch(err=>{
        console.log(err )
      })
    }
    const deleteChecklist= (id)=>{
      let listId= checklist[id]._id
      api.delete(`/user/${taskId}/checklist/delete/${listId}`,{
        headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
      })
      .then(res=>{
        getChecklistItems()
      })
      .catch(err=>{
        console.log(err)
      })
    }
    
    
    
    
    
    
  return (
    <div className='ml-20 py-10 px-5 font-Raleway'>
      {/* Task Information */}
      <div className='text-lg'>
        <TaskDetailEdit label='Name' isEdit={isNameEdit} setIsEdit={setIsNameEdit} colourScheme={colourScheme[taskStatus]} taskData={taskName} handleChange={handleNameChange} tooltipPlacement='top' handleSubmit={handleNameSubmit}/>

        <TaskDetailEdit label='Description' isEdit={isDescEdit} setIsEdit={setIsDescEdit} colourScheme={colourScheme[taskStatus]} taskData={taskDescription} handleChange={handleDescChange} tooltipPlacement='bottom' handleSubmit={handleDescSubmit}/>

        <p>Task Status: <span className={`text-[${colourScheme[taskStatus]}] font-semibold`}> {status[taskStatus]}</span></p>
      </div>
      {/* Checklist */}

      <div className='mt-10'>
        <div className='flex mb-2 items-center'>
          <p className='text-xl font-semibold '>Checklist </p>
          <div className='mx-3 border rounded hover:scale-105 duration-150 ease-in-out cursor-pointer'
          onClick={onOpen}>
            <Plus size={22}/>
          </div>
          <ChecklistModal isOpen={isOpen} onClose={onClose} taskId={taskId} getChecklistItems={getChecklistItems}/>
        </div>
        
        {
          checklist &&
          checklist.map(item=>{

            let status= dropdownVal[counter]
            return(
            <SingleCheckItem id={counter++} status={status} bgColour={dropdownBg[status]} itemName={item.name} key={item._id} onDropdownChange={onDropdownChange} deleteChecklist={deleteChecklist}/>
          )}
          )
        }
      </div>
    </div>
  )
}

export default TaskDesc