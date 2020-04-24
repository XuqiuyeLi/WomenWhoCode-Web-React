import React, {useState} from 'react'
import AuthRepo from './AuthRepo'
import {useHistory} from 'react-router-dom'

interface LoginProps {
    authRepo: AuthRepo
}

export default function Login(props: LoginProps) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoginFailed, setIsLoginFailed] = useState(false)
    const history = useHistory()

    function handleLoginFormSubmit() {
        props.authRepo.login(username, password)
            .then(() => {
                history.push('/')
            })
            .catch(() => {
                setIsLoginFailed(true)
            })
    }

    return (
        <div>
            {isLoginFailed && <div>Login Failed</div>}
            <div>
                <label>
                    username
                    <input onChange={(event) => setUsername(event.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    password
                    <input type="password" onChange={(event => setPassword(event.target.value))}/>
                </label>
            </div>
            <button onClick={handleLoginFormSubmit}>Submit</button>
        </div>
    )
}