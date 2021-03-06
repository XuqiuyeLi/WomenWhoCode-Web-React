import {AppRoutes, AppRoutesProps} from '../AppRoutes'
import {StaticRouter} from 'react-router-dom'
import React from 'react'
import {render} from '@testing-library/react'
import {StaticRouterContext} from 'react-router'
import {act} from 'react-dom/test-utils'

export async function renderPathInRouter(path: string, props: Partial<AppRoutesProps>, context: StaticRouterContext = {}): Promise<void> {
    const propsWithDefaultDummy: AppRoutesProps = props as AppRoutesProps

    await act(async () => {
        render(
            <StaticRouter location={path} context={context}>
                <AppRoutes {...propsWithDefaultDummy}/>
            </StaticRouter>,
        )
    })
}