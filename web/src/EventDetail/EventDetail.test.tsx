import React from 'react'
import SpyEventRepo from '../Repo/SpyEventRepo'
import {render, screen, wait} from '@testing-library/react'
import {Router, StaticRouter} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {AppRoutes} from '../AppRoutes'
import StubEventRepo from '../Repo/StubEventRepo'
import {createWWCEvent} from '../testHelpers/createEntities'
import {act} from 'react-dom/test-utils'
import EventRepo from '../Repo/EventRepo'

describe('EventDetail', () => {
    it('calls repo with correct event id', async () => {
        const spyEventRepo = new SpyEventRepo()


        renderEventDetailInRouter('react-event', spyEventRepo)


        await wait(() => expect(spyEventRepo.getEvent_argument_id).toEqual('react-event'))
    })

    it('calls repo with the updated event id when route changes', async () => {
        const spyEventRepo = new SpyEventRepo()
        let memoryHistory = createMemoryHistory({
            initialEntries: ['/events/react-event'],
        })

        render(
            <Router history={memoryHistory}>
                <AppRoutes
                    eventRepo={spyEventRepo}
                    wwcRouter={{} as any}
                />
            </Router>,
        )


        memoryHistory.push('/events/react-event2')


        await wait(() => expect(spyEventRepo.getEvent_argument_id).toEqual('react-event2'))
    })

    it('displays event name and description', async () => {
        const stubEventRepo = new StubEventRepo()
        stubEventRepo.getEvent_returnValue = Promise.resolve(
            createWWCEvent({name: 'Tokyo Olympics', description: '2021 Tokyo Olympics'}))


        await act(async () => {
                renderEventDetailInRouter('tokyo-olympics', stubEventRepo)
            },
        )


        expect(screen.getByText('Tokyo Olympics')).toBeInTheDocument()
        expect(screen.getByText('2021 Tokyo Olympics')).toBeInTheDocument()
    })
})

function renderEventDetailInRouter(id: string, eventRepo: EventRepo) {
    render(
        <StaticRouter location={`/events/${id}`}>
            <AppRoutes eventRepo={eventRepo} wwcRouter={{} as any}/>
        </StaticRouter>,
    )
}