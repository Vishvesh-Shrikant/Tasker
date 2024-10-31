
import React, {useState} from 'react'
import { FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, ModalHeader, Input, Select, ModalFooter, Button} from '@chakra-ui/react'
import api from '../api/AxiosApi'


const ChecklistModal = ({isOpen, onClose, taskId, getChecklistItems}) => {
    
    const [itemName, setItemName]= useState('')
    const [itemStatus, setItemStatus]= useState('')


    const addNewItem=()=>{
        api.post(`/user/${taskId}/checklist/create`, {name:itemName, status: itemStatus, rank:0},{
            headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
        })
        .then(res=>{
            if(res.data.success)
                getChecklistItems()
        })
        .catch(err=>{
            console.log(err)
        })
      }

  return (
    <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent backgroundColor={"#2B2C28"} textColor={"#EEEEEE"}>
                <ModalHeader>Add New Checklist Item</ModalHeader>
                <ModalCloseButton/>

                <ModalBody>
                    <FormControl>
                        <FormLabel>List Item Name: </FormLabel>
                        <Input placeholder='Enter Task Name' type='text' onChange={e=> setItemName(e.target.value)}/>
                        <FormLabel>List Item Status: </FormLabel>
                        <Select onChange={e=> setItemStatus(e.target.value)}>
                            <option value='backlog'>Backlog</option>
                            <option value='todo'>To-Do</option>
                            <option value='ongoing'>In-Progress</option>
                            <option value='completed'>Done</option>
                        </Select>
                    </FormControl>
                    <ModalFooter>
                        <Button bgColor="#FF8427" mr={3} onClick={()=>{
                            addNewItem()
                            onClose()
                        }}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
  )
}

export default ChecklistModal