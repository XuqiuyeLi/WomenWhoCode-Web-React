import NetworkEventRepo from './NetworkEventRepo'
import SpyHttpClient from './SpyHttpClient'
import WWCEvent, {NewWWCEvent} from '../Entity/WWCEvent'
import StubHttpClient from './StubHttpClient'
import {flushPromises} from '../testHelpers/flushPromises'
import {createWWCEvent} from '../testHelpers/createEntities'

describe('NetworkEventRepo', () => {
    describe('getList', () => {
        it('makes request with correct url', () => {
            const spyHttpClient = new SpyHttpClient()
            const repo = new NetworkEventRepo(spyHttpClient)

            repo.getList()

            expect(spyHttpClient.get_argument_url).toBe('/api/events')
        })

        it('returns an array of WWCEvents', async () => {
            const stubHttpClient = new StubHttpClient()
            stubHttpClient.get_returnValue = Promise.resolve([{
                id: '1',
                name: 'First Event',
                startDateTime: '2020-04-11T09:00:00Z',
                endDateTime: '2020-04-11T20:00:00Z',
                description: 'event description',
                venueName: 'Code Chrysalis',
            }])

            const repo = new NetworkEventRepo(stubHttpClient)

            const events = await repo.getList()
            expect(events[0].constructor).toBe(WWCEvent)
            expect(events).toStrictEqual([
                new WWCEvent(
                    '1',
                    'First Event',
                    new Date('2020-04-11T09:00:00Z'),
                    new Date('2020-04-11T20:00:00Z'),
                    'event description',
                    'Code Chrysalis',
                ),
            ])
        })
    })

    describe('getEvent', () => {
        it('get event makes get request with event id', () => {
            const spyHttpClient = new SpyHttpClient()
            const repo = new NetworkEventRepo(spyHttpClient)


            repo.getEvent('event100')


            expect(spyHttpClient.get_argument_url).toEqual('/api/events/event100')
        })

        it('get event with id returns an event', async () => {
            const stubHttpClient = new StubHttpClient()
            stubHttpClient.get_returnValue = Promise.resolve(
                {
                    id: '100',
                    name: 'event100',
                    startDateTime: '2020-04-11T17:00:00',
                    endDateTime: '2020-04-11T21:00:00',
                    description: 'event100 description',
                    venueName: 'Minato-ku',
                })
            const repo = new NetworkEventRepo(stubHttpClient)


            const event: WWCEvent = await repo.getEvent('event100')


            expect(event).toEqual(
                createWWCEvent({
                    id: '100',
                    name: 'event100',
                    startDateTime: new Date('2020-04-11T17:00:00'),
                    endDateTime: new Date('2020-04-11T21:00:00'),
                    description: 'event100 description',
                    venueName: 'Minato-ku',
                }),
            )
        })
    })

    describe('addEvent', () => {
        const newWWCEvent = new NewWWCEvent(
            'Event name',
            '2020-04-11T17:00:00',
            '2020-04-11T20:00:00',
            'event description',
            'Code Chrysalis',
        )
        it('add event posts request with correct body', () => {
            const spyHttpClient = new SpyHttpClient()
            const repo = new NetworkEventRepo(spyHttpClient)

            repo.addEvent(newWWCEvent)


            expect(spyHttpClient.post_argument_url).toEqual('/api/events')
            expect(spyHttpClient.post_argument_body).toEqual(
                new NewWWCEvent(
                    'Event name',
                    '2020-04-11T17:00:00',
                    '2020-04-11T20:00:00',
                    'event description',
                    'Code Chrysalis',
                ))
        })


        it('does not resolve if addEvent never resolves', async () => {
            const stubHttpClient = new StubHttpClient()
            stubHttpClient.post_returnValue = new Promise<void>(() => undefined)
            const subject = new NetworkEventRepo(stubHttpClient)


            let addEventHasResolved = false
            subject.addEvent(newWWCEvent)
                .then(() => {
                    addEventHasResolved = true
                })
            await flushPromises()


            expect(addEventHasResolved).toEqual(false)
        })

        it('resolves if addEvent resolves', async () => {
            const stubHttpClient = new StubHttpClient()
            const subject = new NetworkEventRepo(stubHttpClient)


            let addEventHasResolved = false
            subject.addEvent(newWWCEvent)
                .then(() => addEventHasResolved = true)
            await flushPromises()


            expect(addEventHasResolved).toBe(true)
        })
    })

    describe('deleteEvent', () => {
        it('delete event sends delete request with correct body', () => {
            const spyHttpClient = new SpyHttpClient()
            const repo = new NetworkEventRepo(spyHttpClient)


            repo.deleteEvent('1')


            expect(spyHttpClient.delete_argument_url).toEqual('/api/events/1')
        })
    })
})
