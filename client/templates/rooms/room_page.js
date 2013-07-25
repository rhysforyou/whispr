Template.roomPage.helpers({
  currentRoom: function() {
    return Rooms.find({_id: Session.get('currentRoomId')})
  },
  messages: function() {
    return Messages.find({roomId: Session.get('currentRoomId')})
  }
})

Template.roomPage.created = function() {
  var now = new Date().getTime()

  this.observeHandle = Messages.find({roomId: Session.get('currentRoomId')}).observeChanges({
    added: function(id, fields) {
      // New message received from server
      if (fields.createdAt > now && !fields.simulated) {
        // Scroll to show the new message
        $("html, body").animate({
          scrollTop: $(document).height() - $(window).height() 
        }, "fast")
      }
    }
  })
}

Template.roomPage.destroyed = function() {
  this.observeHandle.stop()
}

