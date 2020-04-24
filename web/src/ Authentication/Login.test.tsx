import React from 'react'
import {screen} from '@testing-library/react'
import Login from './Login'
import userEvent from '@testing-library/user-event'
import SpyAuthRepo from './SpyAuthRepo'
import {StubAuthRepo} from './StubAuthRepo'
import {StaticRouterContext} from 'react-router'
import {renderPathInRouter} from '../testHelpers/renderPathInRouter'
import {act} from 'react-dom/test-utils'
import AuthRepo from './AuthRepo'

describe('Login', () => {
    it('calls authentication repo with correct username and password',  async () => {
        const spyAuthRepo = new SpyAuthRepo()
        renderLogin(spyAuthRepo, {})


        await submitLoginForm()


        expect(spyAuthRepo.login_argument_username).toEqual('username')
        expect(spyAuthRepo.login_argument_password).toEqual('password')
    })

    it('login successful redirects to / ', async () => {
        const context: StaticRouterContext = {}
        const stubAuthRepo = new StubAuthRepo()
        stubAuthRepo.login_returnValue = Promise.resolve()
        renderLogin(stubAuthRepo, context)


        await submitLoginForm()


        expect(context.url).toEqual('/')
        expect(getLoginFailedMessage()).not.toBeInTheDocument()
    })


    it('login failure shows error message', async () => {
        const context: StaticRouterContext = {}
        const stubAuthRepo = new StubAuthRepo()
        stubAuthRepo.login_returnValue = Promise.reject()
        renderLogin(stubAuthRepo, context)


        await submitLoginForm()


        expect(context.url).toEqual(undefined)
        expect(getLoginFailedMessage()).toBeInTheDocument()
    })

    function getLoginFailedMessage() {
        return screen.queryByText('Login Failed')
    }

    async function submitLoginForm() {
        await act(async () => {
            await userEvent.type(screen.getByLabelText('username', {selector: 'input'}), 'username')
            await userEvent.type(screen.getByLabelText('password', {selector: 'input[type="password"]'}), 'password')
            userEvent.click(screen.getByText('Submit'))
        })
    }

    function renderLogin(authRepo: AuthRepo, context: StaticRouterContext) {
        renderPathInRouter('/login', {authRepo: authRepo}, context)
    }
})
