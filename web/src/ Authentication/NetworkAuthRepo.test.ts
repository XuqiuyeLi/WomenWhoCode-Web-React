import SpyHttpClient from '../Repo/SpyHttpClient'
import {NetworkAuthRepo} from './NetworkAuthRepo'
import StubHttpClient from '../Repo/StubHttpClient'

describe('NetworkAuthRepo', () => {
    it('login makes post request with correct form data', () => {
        const spyHttpClient = new SpyHttpClient()
        const repo = new NetworkAuthRepo(spyHttpClient)


        repo.login('foo', 'bar')


        expect(spyHttpClient.postForm_argument_url).toEqual('/api/login')
        const formData = new FormData()
        formData.append('username', 'foo')
        formData.append('password', 'bar')
        expect(spyHttpClient.postForm_argument_body).toEqual(formData)
    })

    it('login throws error when login failed', async () => {
        const stubHttpClient = new StubHttpClient()
        const repo = new NetworkAuthRepo(stubHttpClient)
        stubHttpClient.postForm_returnValue = Promise.reject()


        let promiseRejected = false
        try {
            await repo.login('invalidUser', 'invalidPassword')
        } catch (e) {
            promiseRejected = true
        }


        expect(promiseRejected).toEqual(true)
    })
})