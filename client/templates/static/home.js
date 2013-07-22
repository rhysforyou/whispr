Template.home.events({
  'click #new-room': function(event) {
    event.preventDefault()

    Meteor.call('newRoom', function(error, room) {
      if (!error)
        Meteor.Router.to('roomPage', room._id)
    })
  }
})