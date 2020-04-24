import {Route, Switch} from 'react-router-dom'
import EventDetail from './EventDetail/EventDetail'
import {AddEventForm} from './EventList/AddEventForm'
import EventList from './EventList/EventList'
import React from 'react'
import EventRepo from './Repo/EventRepo'
import Login from './ Authentication/Login'
import AuthRepo from './ Authentication/AuthRepo'

export interface AppRoutesProps {
    eventRepo: EventRepo
    authRepo: AuthRepo
}

export function AppRoutes(props: AppRoutesProps) {
    const {eventRepo, authRepo} = props
    return (
        <Switch>
            <Route
                path='/login'
            >
                <Login authRepo={authRepo}/>
            </Route>
            <Route
                path='/events/:eventId'
            >
                <EventDetail eventRepo={eventRepo}/>
            </Route>
            <Route path='/add-event'>
                <AddEventForm eventRepo={eventRepo}/>
            </Route>
            <Route path='/events'>
                <EventList eventRepo={eventRepo}/>
            </Route>
            <Route exact path='/'>
                <EventList eventRepo={eventRepo}/>
            </Route>
        </Switch>
    )
}