import React, {ChangeEventHandler, FormEvent, useState} from 'react'
import {NewWWCEvent} from '../Entity/WWCEvent'
import EventRepo from '../Repo/EventRepo'
import {useHistory} from 'react-router-dom'

interface AddEventFormProps {
    eventRepo: EventRepo
}

export function AddEventForm(props: AddEventFormProps) {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [description, setDescription] = useState('')
    const history = useHistory()

    function handleAddEventFormSubmit(e: FormEvent) {
        e.preventDefault()

        const startDateTime = `${date}T${startTime}:00`
        const endDateTime = `${date}T${endTime}:00`
        const event = new NewWWCEvent(name, startDateTime, endDateTime, description, address)
        props.eventRepo.addEvent(event)
            .then(() => history.push('/'))
            .catch(() => history.push('/login'))
    }

    return (
        <div>
            <h1>Add an Event</h1>
            <form onSubmit={handleAddEventFormSubmit}>
                <FormInput
                    type="text"
                    label="Name"
                    onChange={(event) => setName(event.target.value)}
                />
                <FormInput
                    type="text"
                    label="Venue Name"
                    onChange={(event) => setAddress(event.target.value)}
                />
                <FormInput
                    type="date"
                    label="Date"
                    onChange={(event) => setDate(event.target.value)}
                />
                <FormInput
                    type="time"
                    label="Start Time"
                    onChange={(event) => setStartTime(event.target.value)}
                />
                <FormInput
                    type="time"
                    label="End Time"
                    onChange={(event) => setEndTime(event.target.value)}
                />
                <FormInput
                    type="text"
                    label="Description"
                    onChange={(event) => setDescription(event.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

interface FormInputProps {
    label: string
    type: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

function FormInput(props: FormInputProps) {
    return (
        <div>
            <label>
                {props.label}
                <input
                    type={props.type}
                    onChange={props.onChange}
                />
            </label>
        </div>
    )
}
