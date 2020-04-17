import {Route, Switch} from 'react-router-dom'
import EventDetail from './EventDetail/EventDetail'
import {AddEventForm} from './EventList/AddEventForm'
import EventList from './EventList/EventList'
import React from 'react'
import EventRepo from './Repo/EventRepo'
import WWCRouter from './Router/WWCRouter'

interface AppRoutesProps {
    eventRepo: EventRepo
    wwcRouter: WWCRouter
}

export function AppRoutes(props: AppRoutesProps) {
    const {eventRepo, wwcRouter} = props
    return (
        <Switch>
            <Route
                path='/events/:eventId'
            >
                <EventDetail eventRepo={eventRepo}/>
            </Route>
            <Route path='/add-event'>
                <AddEventForm eventRepo={eventRepo}/>
            </Route>
            <Route path='/events'>
                <EventList eventRepo={eventRepo}
                           router={wwcRouter}/>
            </Route>
            <Route path='/'>
                <EventList eventRepo={eventRepo}
                           router={wwcRouter}/>
            </Route>
        </Switch>
    )
}