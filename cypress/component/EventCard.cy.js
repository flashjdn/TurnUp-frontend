import { mount } from 'cypress/react'
import { EventCard } from '../../src/Components/EventCard'

describe('My First Test', function () {
  it('Does Not Do Much', function() {
    expect(true).to.equal(true)
  })

});

describe('EventCard', function() {
  it('Displays the image', function() {
    const eventObj={lng: 50.22, lat: 0.02, eventId: 2, eventTags:["night"]}
    mount(<EventCard eventObj={eventObj}></EventCard>)
  })
});

// Arrange, set-up initial app state
// Act, take an action 
// Assert, make an assertion

