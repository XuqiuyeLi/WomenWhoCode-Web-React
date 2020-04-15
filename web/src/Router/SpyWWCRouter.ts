import WWCRouter from './WWCRouter'

class SpyWWCRouter implements WWCRouter {
    redirectToEventDetailsPage_calledWith?: string

    redirectToEventDetailsPage(eventId: string): void {
        this.redirectToEventDetailsPage_calledWith = eventId
    }
}

export default SpyWWCRouter