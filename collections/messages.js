Messages = new Meteor.Collection("messages")

Meteor.methods({
  newMessage: function(message) {
    var room = Rooms.findOne({_id: message.roomId})

    if (!message.body)
      throw new Meteor.Error(400, "Messages need a body")
    if (!room)
      throw new Meteor.Error(400, "Messages must be posted to a valid room")

    message = _.extend(_.pick(message, "body"), {
      createdAt: new Date().getTime(),
      roomId: room._id
    })

    message._id = Messages.insert(message)

    return message
  }
})
