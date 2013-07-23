Meteor.Router.add({
  '/': 'home',
  '/:_id': {
    to: 'roomPage',
    and: function(roomId) {
      Session.set('currentRoomId', roomId)

      if (Meteor.user()) {
        Meteor.users.update(Meteor.userId(), {
          $addToSet: {"profile.roomIds": roomId}
        })
      }
    }
  }
})