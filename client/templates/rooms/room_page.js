Template.roomPage.helpers({
  currentRoom: function() {
    return Rooms.find({_id: Session.get('currentRoomId')})
  }
})