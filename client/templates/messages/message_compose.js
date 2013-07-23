Template.messageCompose.events({
  "submit form#new-message": function(event) {
    event.preventDefault()
    submitForm()
  },
  "keydown": function(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      submitForm()
    }
  }
})

var submitForm = function() {
  var body = $("#new-message .body").val()

  var message = {
    body: body,
    roomId: Session.get("currentRoomId")
  }

  Meteor.call("newMessage", message, function(error) {
    // Super crude error reporting
    if (error)
      alert(error.message)
  })

  $("#new-message .body").val("")
}
