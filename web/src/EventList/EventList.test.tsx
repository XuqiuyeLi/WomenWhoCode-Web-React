import React from 'react'
import {fireEvent, screen, wait} from '@testing-library/react'
import EventList from './EventList'
import {waitForElement} from '@testing-library/dom'
import StubEventRepo from '../Repo/StubEventRepo'
import {renderPathInRouter} from '../testHelpers/renderPathInRouter'
import {StaticRouterContext} from 'react-router'

describe('EventList', () => {
    let stubEventRepo: StubEventRepo

    beforeEach(() => {
            stubEventRepo = new StubEventRepo()
        },
    )

    it('displays the events title', async () => {
        renderPathInRouter('/', {eventRepo: stubEventRepo})


        await wait(() => expect(screen.getByText('Events')).toBeInTheDocument())
    })

    it('displays events', async () => {
        renderPathInRouter('/', {eventRepo: stubEventRepo})


        await waitForElement(() => screen.getByText('First Event'))

        expect(screen.getByText('Code Chrysalis')).toBeInTheDocument()
        expect(screen.getByText('Apr 11, Sat')).toBeInTheDocument()
        expect(screen.getByText('9:00 AM - 5:30 PM')).toBeInTheDocument()
    })

    it('click on event item shows event details', async () => {
        const context: StaticRouterContext = {}
        renderPathInRouter('/', {eventRepo: stubEventRepo}, context)
        await waitForElement(() => screen.getByText('First Event'))


        const eventTitleElement = screen.getByText('First Event')
        fireEvent.click(eventTitleElement)


        expect(context.url).toEqual('/events/111')
    })
})