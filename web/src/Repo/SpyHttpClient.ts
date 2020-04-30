import {HttpClient} from './HttpClient'

class SpyHttpClient implements HttpClient{
    get_argument_url: string = ''
    post_argument_url: string = ''
    delete_argument_url: string = ''
    post_argument_body?: object
    postForm_argument_url?: string
    postForm_argument_body?: FormData


    get(url: string): Promise<any> {
        this.get_argument_url = url
        return Promise.resolve([])
    }

    post(url: string, body: object): Promise<void> {
        this.post_argument_url = url
        this.post_argument_body = body
        return Promise.resolve();
    }

    postForm(url: string, body: FormData): Promise<void> {
        this.postForm_argument_url = url
        this.postForm_argument_body = body
        return Promise.resolve();
    }

    delete(url: string): Promise<void> {
        this.delete_argument_url = url
        return Promise.resolve();
    }
}

export default SpyHttpClient