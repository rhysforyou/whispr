Rooms = new Meteor.Collection('rooms')

Meteor.methods({
  newRoom: function() {
    var room = {}

    room._id = Rooms.insert(room)

    if (Meteor.user())
      Meteor.users.update(Meteor.userId(), {$addToSet: {"profile.roomIds": room._id}})

    return room
  }
})
