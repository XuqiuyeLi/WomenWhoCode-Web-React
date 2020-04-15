import {NetworkHttpClient} from './NetworkEventRepo'

describe('NetworkHttpClient', () => {
    describe('get', () => {
        it('calls fetch with the right url and headers', () => {
            const spyFetch = jest.fn()
            spyFetch.mockResolvedValue(new Response("{}"))

            const subject = new NetworkHttpClient(spyFetch)
            subject.get('/some/url')

            expect(spyFetch).toBeCalledWith(
                '/some/url',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                },
            )
        })

        it('calls fetch return an object from JSON', async () => {
            const spyFetch = jest.fn()
            spyFetch.mockResolvedValue(new Response("{\n  \"name\": \"event name\"\n}"))

            const subject = new NetworkHttpClient(spyFetch)
            const getResult = await subject.get("/")

            expect(getResult).toEqual({name: 'event name'})
        })
    })
})