import React from 'react'
import {render, screen} from '@testing-library/react'
import AddEventForm from './AddEventForm'
import {SpyEventRepo} from '../Repo/SpyEventRepo'
import userEvent from '@testing-library/user-event'
import {NewWWCEvent} from '../Entity/WWCEvent'
import {StaticRouter} from 'react-router-dom'
import {StaticRouterContext} from 'react-router'
import {Simulate} from 'react-dom/test-utils'
import EventRepo from '../Repo/EventRepo'

describe('AddEventForm', () => {
    const dummyRepo = {} as any
    it('shows page title', () => {
        renderAddEventForm(dummyRepo)


        expect(screen.getByText('Add an Event')).toBeInTheDocument()
    })

    it('shows add event form', () => {
        renderAddEventForm(dummyRepo)

        expect(screen.getByLabelText('name:', {selector: 'input'}))
            .toBeInTheDocument()
        expect(screen.getByLabelText('address:', {selector: 'input'}))
            .toBeInTheDocument()
    })

    it('submit clicked passes input values', () => {
        const spyEventRepo = new SpyEventRepo()
        renderAddEventForm(spyEventRepo)


        userEvent.type(screen.getByLabelText('name:'), 'WTF is React?')
        userEvent.type(screen.getByLabelText('address:'), 'Code Chrysalis')
        const submitButton = screen.getByText('Submit')
        userEvent.click(submitButton)


        expect(spyEventRepo.addEvent_argument_event).toEqual(
            new NewWWCEvent('WTF is React?', 'Code Chrysalis'),
        )
    })

    it('redirects to home page after submit form', () => {
        const routerContext: StaticRouterContext = {}
        renderAddEventForm(new SpyEventRepo(), routerContext)


        const submitButton = screen.getByText('Submit')
        userEvent.click(submitButton)


        expect(routerContext.url).toEqual('/')
    })

    it('submit form event default is prevented', () => {
        renderAddEventForm(new SpyEventRepo())


        const submitButton = screen.getByText('Submit')
        let preventDefaultSpy = jest.fn()
        Simulate.submit(submitButton, {preventDefault: preventDefaultSpy})


        expect(preventDefaultSpy).toBeCalled()
    })
})

function renderAddEventForm(eventRepo: EventRepo, context: StaticRouterContext = {}) {
    render(
        <StaticRouter context={context}>
            <AddEventForm eventRepo={eventRepo}/>
        </StaticRouter>,
    )
}