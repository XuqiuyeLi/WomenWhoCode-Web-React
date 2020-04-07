import NetworkEventRepo from "./NetworkEventRepo";
import SpyHttpClient from "./SpyHttpClient";

describe('NetworkEventRepo', () => {
    it('makes request with correct url', () => {
        const spyHttpClient = new SpyHttpClient()
        const repo = new NetworkEventRepo(spyHttpClient)

        repo.getList()

        expect(spyHttpClient.request_url).toBe("http://localhost:8080/api/events/past")
    })
})
