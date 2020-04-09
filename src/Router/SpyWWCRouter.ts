import WWCRouter from './WWCRouter'

class SpyWWCRouter implements WWCRouter {
    redirectToEventDetailsPage_calledWith: Number = Number.MIN_VALUE

    redirectToEventDetailsPage(eventId: Number): void {
        this.redirectToEventDetailsPage_calledWith = eventId
    }
}

export default SpyWWCRouter