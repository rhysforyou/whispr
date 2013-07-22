Rooms = new Meteor.Collection('rooms')

Meteor.methods({
  newRoom: function() {
    var room = {}

    room._id = Rooms.insert(room)

    return room
  }
})
