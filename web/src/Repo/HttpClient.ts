export interface HttpClient {
    get(url: string): Promise<any>

    post(url: string, body: object): Promise<void>

    postForm(url: string, body: FormData): Promise<void>
}