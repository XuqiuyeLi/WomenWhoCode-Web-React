import React from 'react'
import {render, screen} from '@testing-library/react'
import EventList from './EventList'
import {waitForElement} from '@testing-library/dom'

describe('EventList', () => {
  it('displays the events title', () => {
    const {getByText} = render(<EventList/>)

    const title = getByText('Events')

    expect(title).toBeInTheDocument()
  })

  it('displays events', async() => {
    const stubEventRepo = {
      getList: () => {
        return Promise.resolve([
          {id: 1, name: 'First Event'},
          {id: 2, name: 'Second Event'}
        ])
      }
    }

    render(<EventList eventRepo={stubEventRepo}/>)
    await waitForElement(() => screen.getByText('First Event'))
    const firstEventName = screen.getByText('First Event')

    expect(firstEventName).toBeInTheDocument()
  })
})