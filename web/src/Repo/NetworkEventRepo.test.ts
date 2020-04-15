import NetworkEventRepo from './NetworkEventRepo'
import SpyHttpClient from './SpyHttpClient'
import WWCEvent from '../Entity/WWCEvent'
import StubHttpClient from './StubHttpClient'

describe('NetworkEventRepo', () => {
    describe('getList', () => {
        it('makes request with correct url', () => {
            const spyHttpClient = new SpyHttpClient()
            const repo = new NetworkEventRepo(spyHttpClient)

            repo.getList()

            expect(spyHttpClient.request_url).toBe('/api/events')
        })

        it('returns an array of WWCEvents', async () => {
            const stubHttpClient = new StubHttpClient()
            stubHttpClient.httpFetch_returnValue = [{
                id:"1",
                name: 'First Event',
                startDateTime: '2020-04-11T09:00:00',
                endDateTime: '2020-04-11T20:00:00',
                venue: {name: 'Code Chrysalis'},
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
                    {name: 'Code Chrysalis'},
                ),
            ])
        })
    })
})
