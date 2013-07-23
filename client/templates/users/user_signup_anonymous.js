Template.userSignupAnonymous.events({
  'submit form': function() {
    event.preventDefault()

    var nickname = $(event.target).find(".nickname").val()
    var email    = $(event.target).find(".email").val()

    var userAttributes = {
      nickname: nickname,
      email: email,
      roomId: Session.get("currentRoomId")
    }

    Meteor.call("anonymousUser", userAttributes, function(error, user) {
      if (error) {
        alert(error.message)
      } else {
        console.log("Logging in " + user.username + " with " + user.password)
        Meteor.loginWithPassword(user.username, user.password, function(error) {
          if (error)
            alert(error)
        })
      }
    })
  }
})