import React, { useState} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import { format } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'


const AddScheduleModal = ({ closeModal, selectedDay }) => {

    const [formData, setFormData] = useState({
        text: '',
        day: selectedDay,
        startHour: '',
        endHour: '',
    })

    const { text, day, startHour, endHour} = formData

    const dispatch = useDispatch()

    const onChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const handleCreateGoal = (e) => {
        e.preventDefault()


        const userData = {text, day, startHour, endHour}
        dispatch(createGoal(userData))
        closeModal(false)
    }

  return (
    <div className='w-full h-screen flex fixed top-0 left-0 bg-neutral-950/[.06] justify-center items-center'>
        <div className='w-[400px] bg-white shadow flex flex-col p-6 items-center'>
            <div className='flex justify-between w-full'>
                <h1 className='font-bold'>Add Schedule</h1>
                <button onClick={() => closeModal(false)}>
                    <AiOutlineClose size={24} className='hover:bg-slate-100 p-1 rounded-full duration-200'/>
                </button>
            </div>
            <form onSubmit={handleCreateGoal} className='flex flex-col justify-between w-[400px] p-6 pb-0'>
                <div className='mb-2 w-full flex items-center justify-between'>
                    <label htmlFor='text' className='font-bold mr-4'>Title</label>
                    <input name='text' value={text} onChange={onChangeHandler} className='border p-2 rounded-md'/>
                </div>
                <div className='mb-2 w-full flex items-center justify-between'>
                    <label htmlFor='day' className='font-bold mr-4'>Day</label>
                    <input name='day' disabled value={format(selectedDay, 'MMM dd, yyy')} className='border p-2 rounded-md'/>
                </div>
                <div className='mb-2 w-full flex items-center justify-between'>
                    <label htmlFor='startHour' className='font-bold mr-4'>Starting</label>
                    <input name='startHour' value={startHour} onChange={onChangeHandler} className='border p-2 rounded-md'/>
                </div>
                <div className='mb-4 w-full flex items-center justify-between'>
                    <label htmlFor='endHour' className='font-bold mr-4'>Ending</label>
                    <input name='endHour' value={endHour} onChange={onChangeHandler} className='border p-2 rounded-md'/>
                </div>
                <button type='submit' className='bg-green-500 px-3 py-2 rounded-sm font-semibold text-white hover:bg-green-400 hover:rounded-lg duration-200'>Add Schedule</button>
            </form>
        </div>
    </div>
  )
}

export default AddScheduleModal