Deps.autorun(function() {
  Meteor.subscribe('currentRoom', Session.get('currentRoomId'))
  Meteor.subscribe('currentRoomMessages', Session.get('currentRoomId'))
})
