Meteor.publish('currentRoom', function(roomId) {
  return Rooms.find({_id: roomId})
})