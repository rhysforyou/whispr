Rooms = new Meteor.Collection('rooms')

Meteor.methods({
  newRoom: function() {
    var room = { createdAt: new Date().getTime() }

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
  },

  // Send a transcript to the emails of any participants
  //
  // This is plain text for now, but when the new and improved Meteor UI 
  // arrives with server-side template rendering, we'll use that for nice,
  // clean HTML emails. Probably in like 0.7 or something.
  sendRoomTranscript: function(roomId) {
    // Email doesn't work on the client
    if (Meteor.isClient) return

    // Check we got a valid room
    var room = Rooms.findOne(roomId)
    
    if (!room)
      throw new Meteor.error(404, "Room not found")
    
    // Build a transcript
    var transcript=""

    Messages.find({roomId: room._id}, {createdAt: 1}).forEach(function(message) {
      transcript += message.author + ": " + message.body + "\n"
    })

    this.unblock()

    // Get users that were in the room and have an email set up
    Meteor.users.find({
      "profile.roomIds": room._id, 
      email: {$exists: true}
    }).forEach(function(user) {
      Email.send({
        to: user.email,
        from: "noreply@whispr.us",
        subject: "[Whispr] Your chat on " + new Date(room.createdAt),
        text: transcript
      })
    })


  }
})
