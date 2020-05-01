interface AuthRepo {
    login(username: string, password: string): Promise<void>

    logout(): Promise<void>
}

export default AuthRepo