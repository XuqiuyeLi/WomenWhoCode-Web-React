import WWCRouter from './WWCRouter'

type WWCHistory = {
    push: (url: string) => void
}

class DefaultWWCRouter implements WWCRouter{
    private history: WWCHistory
    constructor(browserHistory: WWCHistory) {
        this.history = browserHistory
    }

    redirectToEventDetailsPage(eventId: Number): void {
        this.history.push(`/events/${eventId}`)
    }
}

export default DefaultWWCRouter