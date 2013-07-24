Template.roomParticipants.helpers({
  participants: function() {
    return Meteor.users.find({"profile.roomIds": Session.get("currentRoomId")})
  }
})