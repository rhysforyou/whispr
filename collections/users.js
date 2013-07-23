// Meteor's account system provides us with the Meteor.users collection
Meteor.methods({
  anonymousUser: function(userAttributes) {
    var room = Rooms.findOne({_id: userAttributes.roomId})
    var userCount = Meteor.users.find({"profile.roomIds": room._id}).count()

    if (!room)
      throw new Meteor.Error(400, "Anonymous users must belong to a room")
    if (!userAttributes.nickname || userAttributes.nickname.length === 0)
      throw new Meteor.Error(400, "You must provide a nickname")
    if (userCount >= 5)
      throw new Meteor.Error(401, "Too many users in this room")

    var username = room._id + "-anon-" + userCount
    var password = username + new Date().getTime()

    var user = {
      profile: _.extend(_.pick(userAttributes, "nickname", "email"), {
        roomIds: [room._id],
        anonymous: true
      }),
      username: username,
      password: password
    }

    user._id = Accounts.createUser(user)

    return user
  }
})