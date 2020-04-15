import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import AddEventForm from './AddEventForm'
import {SpyEventRepo} from '../Repo/SpyEventRepo'
import userEvent from '@testing-library/user-event'
import {NewWWCEvent} from '../Entity/WWCEvent'

describe('AddEventForm', () => {
    it('shows event title', () => {
        const dummyRepo = {} as any
        render(<AddEventForm eventRepo={dummyRepo}/>)


        expect(screen.getByText('Event Title')).toBeInTheDocument()
    })

    it('shows add event form', () => {
        const dummyRepo = {} as any
        render(<AddEventForm eventRepo={dummyRepo}/>)

        expect(screen.getByLabelText('name:', {selector: 'input'}))
            .toBeInTheDocument()
        expect(screen.getByLabelText('address:', {selector: 'input'}))
            .toBeInTheDocument()
    })

    it('submit clicked will call addEvent() on repo', () => {
        const spyEventRepo = new SpyEventRepo()
        render(<AddEventForm eventRepo={spyEventRepo}/>)


        const submitButton = screen.getByText('Submit')
        fireEvent.click(submitButton)


        expect(spyEventRepo.addEvent_Was_Called).toBe(true)
    })

    it('submit clicked passes input values', () => {
        const spyEventRepo = new SpyEventRepo()
        render(<AddEventForm eventRepo={spyEventRepo}/>)


        userEvent.type(screen.getByLabelText('name:'), 'WTF is React?')
        userEvent.type(screen.getByLabelText('address:'), 'Code Chrysalis')
        const submitButton = screen.getByText('Submit')
        userEvent.click(submitButton)


        expect(spyEventRepo.addEvent_argument_event).toEqual(
            new NewWWCEvent('WTF is React?', 'Code Chrysalis'),
        )
    })
})