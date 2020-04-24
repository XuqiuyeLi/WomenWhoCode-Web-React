interface AuthRepo {
    login(username: string, password: string): Promise<void>
}

export default AuthRepo