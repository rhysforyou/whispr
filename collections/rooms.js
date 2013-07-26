Rooms = new Meteor.Collection('rooms')

Meteor.methods({
  newRoom: function() {
    var room = {}

    room._id = Rooms.insert(room)

    if (Meteor.user())
      Meteor.users.update(Meteor.userId(), {$addToSet: {"profile.roomIds": room._id}})

    return room
  },

  // Delete the room and any data associated with it
  closeRoom: function(roomId) {
    var room = Rooms.findOne(roomId)
    
    if (!room)
      throw new Meteor.error(404, "Room not found")

    // Remove any users in this room
    // Sadly the $pull operator doesn't seem to work in minimongo so this is a
    // little verbose.
    Meteor.users.find({"profile.roomIds": room._id}).forEach(function(user) {
      var newRoomIds = _.without(user.profile.roomIds, room._id)
      Meteor.users.update(user._id, {$set: {roomIds: newRoomIds}})
    })

    // Delete this room's messages
    Messages.remove({roomId: room._id})

    // Delete the room
    Rooms.remove(room._id)
  }
})
