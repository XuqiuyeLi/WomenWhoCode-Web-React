import React from 'react'
import {render, screen, wait, fireEvent} from '@testing-library/react'
import EventList from './EventList'
import {waitForElement} from '@testing-library/dom'
import StubEventRepo from '../Repo/StubEventRepo'
import SpyWWCRouter from '../Router/SpyWWCRouter'

describe('EventList', () => {
    let stubEventRepo: StubEventRepo
    let spyRouter:SpyWWCRouter

    beforeEach(() => {
            stubEventRepo = new StubEventRepo()
            spyRouter = new SpyWWCRouter()
        }
    )

    it('displays the events title', async () => {
        render(<EventList eventRepo={stubEventRepo} router={spyRouter}/>)

        await wait(() => expect(screen.getByText('Events')).toBeInTheDocument())
    })

    it('displays events', async () => {
        render(<EventList eventRepo={stubEventRepo} router={spyRouter}/>)

        await waitForElement(() => screen.getByText('First Event'))

        expect(screen.getByText('Code Chrysalis')).toBeInTheDocument()
        expect(screen.getByText('Apr 11, Sat')).toBeInTheDocument()
        expect(screen.getByText('9:00 AM - 5:30 PM')).toBeInTheDocument()
    })

    it('click on event item shows event details', async () => {
        render(<EventList eventRepo={stubEventRepo} router={spyRouter}/>)
        await waitForElement(() => screen.getByText('First Event'))

        const eventTitleElement = screen.getByText('First Event')
        fireEvent.click(eventTitleElement)

        expect(spyRouter.redirectToEventDetailsPage_calledWith).toEqual(111)
    })
})