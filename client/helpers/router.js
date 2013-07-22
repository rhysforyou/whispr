Meteor.Router.add({
  '/': 'home',
  '/:_id': {
    to: 'roomPage',
    and: function(roomId) { Session.set('currentRoomId', roomId) }
  }
})