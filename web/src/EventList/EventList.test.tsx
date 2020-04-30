import {fireEvent, screen, wait} from '@testing-library/react'
import {waitForElement} from '@testing-library/dom'
import StubEventRepo from '../Repo/StubEventRepo'
import {renderPathInRouter} from '../testHelpers/renderPathInRouter'
import {StaticRouterContext} from 'react-router'
import Sinon from 'sinon'
import NetworkEventRepo from '../Repo/NetworkEventRepo'
import {createWWCEvent} from '../testHelpers/createEntities'
import {act} from 'react-dom/test-utils'

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
        expect(screen.getByText('Remove')).toBeInTheDocument()
    })

    it('click on event item shows event details', async () => {
        const context: StaticRouterContext = {}
        renderPathInRouter('/', {eventRepo: stubEventRepo}, context)
        await waitForElement(() => screen.getByText('First Event'))


        const eventTitleElement = screen.getByText('First Event')
        fireEvent.click(eventTitleElement)


        expect(context.url).toEqual('/events/111')
    })

    describe('deleting an event', () => {
        let spyEventRepo: Sinon.SinonStubbedInstance<NetworkEventRepo>
        let routerContext: StaticRouterContext
        const firstWWCEvent = createWWCEvent({id: '111', name: 'First Event'})
        const secondWWCEvent = createWWCEvent({id: '222', name: 'Second Event'})

        beforeEach(async () => {
            spyEventRepo = Sinon.createStubInstance(NetworkEventRepo)
            spyEventRepo.getList.resolves([
                firstWWCEvent,
                secondWWCEvent,
            ])
            routerContext = {}
            await act(async () => {
                renderPathInRouter('/', {eventRepo: spyEventRepo}, routerContext)
            })
        })

        it('click on remove button calls the repo to delete event', async () => {
            spyEventRepo.deleteEvent.resolves()
            await clickRemoveButtonForFirstEvent()

            Sinon.assert.calledWith(spyEventRepo.deleteEvent, '111')
        })

        describe('when the delete succeeds', () => {
            beforeEach(() => {
                spyEventRepo.deleteEvent.resolves()
            })

            it('when an event is removed, reload the events', async () => {
                spyEventRepo.getList.resolves([secondWWCEvent])


                await clickRemoveButtonForFirstEvent()


                expect(screen.queryByText('First Event')).not.toBeInTheDocument()
                expect(screen.queryByText('Second Event')).toBeInTheDocument()
            })

            it('Page does not change', async () => {
                spyEventRepo.getList.resolves([])


                await clickRemoveButtonForFirstEvent()


                expect(routerContext.url).toEqual(undefined)
            })
        })

        it('redirects to login page if user not logged in', async () => {
            spyEventRepo.deleteEvent.rejects()


            await clickRemoveButtonForFirstEvent()


            expect(routerContext.url).toEqual('/login')
        })

        async function clickRemoveButtonForFirstEvent() {
            const removeButtons = screen.getAllByText('Remove')
            await act(async () => {
                fireEvent.click(removeButtons[0])
            })
        }
    })
})