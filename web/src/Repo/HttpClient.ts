export interface HttpClient {
    get(url: string): Promise<any>

    post(url: string, body: object | null): Promise<void>

    postForm(url: string, body: FormData): Promise<void>

    delete(url: string): Promise<void>
}