import NetworkEventRepo from './NetworkEventRepo'
import SpyHttpClient from './SpyHttpClient'
import WWCEvent, {NewWWCEvent} from '../Entity/WWCEvent'
import StubHttpClient from './StubHttpClient'
import {flushPromises} from '../testHelpers/flushPromises'

describe('NetworkEventRepo', () => {
    describe('getList', () => {
        it('makes request with correct url', () => {
            const spyHttpClient = new SpyHttpClient()
            const repo = new NetworkEventRepo(spyHttpClient)

            repo.getList()

            expect(spyHttpClient.request_argument_url).toBe('/api/events')
        })

        it('returns an array of WWCEvents', async () => {
            const stubHttpClient = new StubHttpClient()
            stubHttpClient.get_returnValue = [{
                id: '1',
                name: 'First Event',
                startDateTime: '2020-04-11T09:00:00',
                endDateTime: '2020-04-11T20:00:00',
                description: 'event description',
                venueName: 'Code Chrysalis',
            }]

            const repo = new NetworkEventRepo(stubHttpClient)

            const events = await repo.getList()
            expect(events[0].constructor).toBe(WWCEvent)
            expect(events).toStrictEqual([
                new WWCEvent(
                    '1',
                    'First Event',
                    '2020-04-11T09:00:00',
                    '2020-04-11T20:00:00',
                    'event description',
                    'Code Chrysalis',
                ),
            ])
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
})
