Template.messageCompose.events({
  'submit form#new-message': function(event) {
    event.preventDefault()

    var body = $(event.target).find(".body").val()

    var message = {
      body: body,
      roomId: Session.get('currentRoomId')
    }

    Meteor.call('newMessage', message, function(error) {
      // Super crude error reporting
      if (error)
        alert(error.message)
    })

    $(event.target).find(".body").val('')
  }
})
