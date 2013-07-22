Meteor.publish("currentRoom", function(roomId) {
  return Rooms.find({_id: roomId})
})

Meteor.publish("currentRoomMessages", function(roomId) {
  return Messages.find({roomId: roomId})
})
