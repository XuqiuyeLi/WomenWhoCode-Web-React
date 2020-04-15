import React, {FormEvent, useState} from 'react'
import {NewWWCEvent} from '../Entity/WWCEvent'
import EventRepo from '../Repo/EventRepo'
import { Redirect, useHistory } from 'react-router-dom'

interface AddEventFormProps {
    eventRepo: EventRepo
}

function AddEventForm(props: AddEventFormProps) {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const history = useHistory()

    function handleAddEventFormSubmit(e: FormEvent) {
        e.preventDefault()
        const event = new NewWWCEvent(name, address)
        props.eventRepo.addEvent(event).then()
        history.push("/")
    }

    return (
        <div>
            <div>Add an Event</div>
            <form onSubmit={handleAddEventFormSubmit}>
                <label>
                    name:
                    <input
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
                <label>
                    address:
                    <input
                        type="text"
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddEventForm