var MyCron = new Cron(1000) // Job runner with 1 second tick

// Every ten minutes, delete inactive rooms
MyCron.addJob(10 * 60, function() {
  var now = new Date().getTime()
  var activeWindow = 1000 * 60 * 60 // 1 hour window

  Rooms.find({lastActive: {$lt: now - activeWindow }}).forEach(function(room) {
    Meteor.call("closeRoom", room._id)
  })
})
