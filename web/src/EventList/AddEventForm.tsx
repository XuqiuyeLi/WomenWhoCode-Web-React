import React, {useState} from 'react'
import {NewWWCEvent} from '../Entity/WWCEvent'
import EventRepo from '../Repo/EventRepo'

interface AddEventFormProps {
    eventRepo: EventRepo
}

function AddEventForm(props: AddEventFormProps) {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

    function handleAddEventClick() {
        const event = new NewWWCEvent(name, address)
        props.eventRepo.addEvent(event)
    }

    return (
        <div>
            <div>Event Title</div>
            <form>
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
            </form>
            <button onClick={handleAddEventClick}>Submit</button>
        </div>
    )
}

export default AddEventForm