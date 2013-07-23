Template.messageItem.helpers({
  author: function() {
    return Meteor.users.findOne(this.userId).profile.nickname
  }
})