Template.messageItem.helpers({
  ownerClass: function() {
    return this.userId === Meteor.userId() ? 'user' : ''
  }
})