Template.header.helpers({
  onHomePage: function() {
    return Meteor.Router.page() === "home"
  }
})
