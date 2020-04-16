import React from 'react'
import {render, screen} from '@testing-library/react'
import {AddEventForm} from './AddEventForm'
import {SpyEventRepo} from '../Repo/SpyEventRepo'
import userEvent from '@testing-library/user-event'
import {NewWWCEvent} from '../Entity/WWCEvent'
import {StaticRouter} from 'react-router-dom'
import {StaticRouterContext} from 'react-router'
import {act, Simulate} from 'react-dom/test-utils'
import EventRepo from '../Repo/EventRepo'
import StubEventRepo from '../Repo/StubEventRepo'

describe('AddEventForm', () => {
    const dummyRepo = {} as any
    it('shows page title', () => {
        renderAddEventForm(dummyRepo)


        expect(screen.getByText('Add an Event')).toBeInTheDocument()
    })

    it('shows add event form', () => {
        renderAddEventForm(dummyRepo)

        expect(screen.getByLabelText('Name', {selector: 'input[type=text]'}))
            .toBeInTheDocument()
        expect(screen.getByLabelText('Venue Name', {selector: 'input[type=text]'}))
            .toBeInTheDocument()
        expect(screen.getByLabelText('Date', {selector: 'input[type=date]'}))
            .toBeInTheDocument()
        expect(screen.getByLabelText('Start Time', {selector: 'input[type=time]'}))
            .toBeInTheDocument()
        expect(screen.getByLabelText('End Time', {selector: 'input[type=time]'}))
            .toBeInTheDocument()
        expect(screen.getByLabelText('Description', {selector: 'input[type=text]'}))
            .toBeInTheDocument()
    })

    it('submit clicked passes input values', () => {
        const spyEventRepo = new SpyEventRepo()
        renderAddEventForm(spyEventRepo)


        userEvent.type(screen.getByLabelText('Name'), 'WTF is React?')
        userEvent.type(screen.getByLabelText('Venue Name'), 'Code Chrysalis')
        userEvent.type(screen.getByLabelText('Date'), '2020-04-18')
        userEvent.type(screen.getByLabelText('Start Time'), '18:00')
        userEvent.type(screen.getByLabelText('End Time'), '21:00')
        userEvent.type(screen.getByLabelText('Description'), 'React for beginners')
        const submitButton = screen.getByText('Submit')
        userEvent.click(submitButton)

        expect(spyEventRepo.addEvent_argument_event).toEqual(
            new NewWWCEvent(
                'WTF is React?',
                '2020-04-18T18:00:00',
                '2020-04-18T21:00:00',
                'React for beginners',
                'Code Chrysalis',
            ),
        )
    })

    it('redirects to home page after submit form', async () => {
        const routerContext: StaticRouterContext = {}
        renderAddEventForm(new StubEventRepo(), routerContext)


        await act(async () => {
            await userEvent.click(screen.getByText('Submit'))
        })


        expect(routerContext.url).toEqual('/')
    })

    it('does not redirect to home page if addEvent does not resolve', async () => {
        const routerContext: StaticRouterContext = {}
        const stubEventRepo = new StubEventRepo()
        stubEventRepo.addEvent_returnValue = new Promise<void>(() => undefined)
        renderAddEventForm(stubEventRepo, routerContext)


        await act(async () => {
            await userEvent.click(screen.getByText('Submit'))
        })


        expect(routerContext.url).toEqual(undefined)
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