import React from 'react'
import {render, screen} from '@testing-library/react'
import EventList from './EventList'
import {waitForElement} from '@testing-library/dom'
import StubEventRepo from '../Repo/StubEventRepo'

describe('EventList', () => {
  it('displays the events title', () => {
    const stubEventRepo = new StubEventRepo()
    const {getByText} = render(<EventList eventRepo={stubEventRepo}/>)

    const title = getByText('Events')

    expect(title).toBeInTheDocument()
  })

  it('displays events', async() => {
    const stubEventRepo = new StubEventRepo()

    render(<EventList eventRepo={stubEventRepo}/>)
    await waitForElement(() => screen.getByText('First Event'))
    const firstEventName = screen.getByText('First Event')

    expect(firstEventName).toBeInTheDocument()
  })
})