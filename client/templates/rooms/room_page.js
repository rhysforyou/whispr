Template.roomPage.helpers({
  currentRoom: function() {
    return Rooms.find({_id: Session.get('currentRoomId')})
  },
  messages: function() {
    return Messages.find({roomId: Session.get('currentRoomId')})
  }
})