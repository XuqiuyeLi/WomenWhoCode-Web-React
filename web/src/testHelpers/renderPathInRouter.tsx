import {AppRoutes, AppRoutesProps} from '../AppRoutes'
import {StaticRouter} from 'react-router-dom'
import React from 'react'
import { render } from '@testing-library/react'
import {StaticRouterContext} from 'react-router'

export function renderPathInRouter(path: string, props: Partial<AppRoutesProps>, context: StaticRouterContext = {}): void {
    const propsWithDefaultDummy: AppRoutesProps = props as AppRoutesProps

    render(
    <StaticRouter location={path} context={context}>
        <AppRoutes {...propsWithDefaultDummy}/>
    </StaticRouter>,
    )
}