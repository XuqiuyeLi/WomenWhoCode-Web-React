import {match, RouteProps} from 'react-router'
import {useRouteMatch} from 'react-router-dom'

export function useSafeRouteMatch<Params extends { [K in keyof Params]?: string } = {}>(
    path: string | string[] | RouteProps,
): match<Params> {
    const routeMatch = useRouteMatch<Params>(path)
    if (routeMatch === null) {
        throw new Error('Could not get match from path')
    }
    return routeMatch
}