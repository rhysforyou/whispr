Template.roomHeader.events({
  'click #close-room': function(event) {
    event.preventDefault()

    Meteor.call("sendRoomTranscript", Session.get("currentRoomId"))
    Meteor.call("closeRoom", Session.get("currentRoomId"))
  }
})