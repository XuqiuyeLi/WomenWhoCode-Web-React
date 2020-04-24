import {flushPromises} from '../testHelpers/flushPromises'
import {NetworkHttpClient} from './NetworkHttpClient'

describe('NetworkHttpClient', () => {
    describe('get', () => {
        it('calls fetch with the right url and headers', () => {
            const spyFetch = jest.fn()
            spyFetch.mockResolvedValue(new Response('{}'))


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
            spyFetch.mockResolvedValue(new Response('{\n  "name": "event name"\n}'))
            const subject = new NetworkHttpClient(spyFetch)


            const getResult = await subject.get('/')


            expect(getResult).toEqual({name: 'event name'})
        })
    })

    describe('post', () => {
        it('post with right url, headers and body', () => {
            const spyFetch = jest.fn()
            spyFetch.mockResolvedValue(new Response('{}'))
            const subject = new NetworkHttpClient(spyFetch)


            subject.post(
                '/some/url',
                {
                    name: 'event name',
                },
            )


            expect(spyFetch).toBeCalledWith('/some/url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '{"name":"event name"}',
            })
        })

        it('does not resolve if fetch never resolves', async () => {
            const stubFetch = jest.fn()
            const promiseThatNeverResolves = new Promise(() => undefined)
            stubFetch.mockReturnValue(promiseThatNeverResolves)
            const subject = new NetworkHttpClient(stubFetch)


            let postHasResolved = false
            subject.post('', {})
                .then(() => {
                    postHasResolved = true
                })
            await flushPromises()


            expect(postHasResolved).toEqual(false)
        })


        it('resolves if fetch resolves', async () => {
            const stubFetch = jest.fn()
            stubFetch.mockResolvedValue(new Response(''))
            const subject = new NetworkHttpClient(stubFetch)


            let postHasResolved = false
            subject.post('', {})
                .then(() => postHasResolved = true)
            await flushPromises()


            expect(postHasResolved).toBe(true)
        })
    })

    describe('postForm', () => {
        it('post form with right url, headers and body', () => {
            const spyFetch = jest.fn()
            spyFetch.mockResolvedValue(new Response(''))
            const subject = new NetworkHttpClient(spyFetch)
            const formData = new FormData()
            formData.append('key', 'value')


            subject.postForm('/some/url', formData)


            expect(spyFetch).toBeCalledWith('/some/url', {
                method: 'POST',
                body: formData
            })
        })

        it('reject if the response is Unauthorized', async () => {
            const stubFetch = jest.fn()
            stubFetch.mockResolvedValue(new Response('', {status: 401}))
            const subject = new NetworkHttpClient(stubFetch)


            let postHasRejected = false
            subject.postForm('', new FormData())
                .catch(() => postHasRejected = true)
            await flushPromises()


            expect(postHasRejected).toBe(true)
        })

        it('does not resolve if fetch never resolves', async () => {
            const stubFetch = jest.fn()
            const promiseThatNeverResolves = new Promise(() => undefined)
            stubFetch.mockReturnValue(promiseThatNeverResolves)
            const subject = new NetworkHttpClient(stubFetch)


            let postHasResolved = false
            subject.postForm('', new FormData())
                .then(() => {
                    postHasResolved = true
                })
            await flushPromises()


            expect(postHasResolved).toEqual(false)
        })

        it('resolves if fetch resolves', async () => {
            const stubFetch = jest.fn()
            stubFetch.mockResolvedValue(new Response(''))
            const subject = new NetworkHttpClient(stubFetch)


            let postHasResolved = false
            subject.postForm('', new FormData())
                .then(() => postHasResolved = true)
            await flushPromises()


            expect(postHasResolved).toBe(true)
        })
    })
})