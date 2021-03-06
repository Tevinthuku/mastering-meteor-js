Meteor.subscribe("BusServices");

var busServiceList = new ReactiveVar([]);
Template.home.onCreated(function () {
   busServiceList.set(BusServices.find({}));
});

Template.home.helpers({
   list: function() {
       return BusServices.get();
   },
   
   hasItem: function() {
       return BusServices.get().count();
   },
   
   humanReadableDate: function (date) {
       var m = moment(date);
       return m.format("MMM, DD, YYYY HH:mm");
   }
});

Template.travelSearch.events({
  "keyup input": _.debounce(function(e) {
    var source = $("[name='startpoint']").val().trim(),
      destination = $("[name='endpoint']").val().trim(),
      date = $("[name='startdate']").val().trim(),
      fare = $("[name='fare']").val().trim(),
      search = {};
    if(source) search.source = {$regex: new RegExp(source), $options: "i"};
    if(destination) search.destination = {$regex: new RegExp(destination), $options: "i"};
    if(date) {
      var userDate = new Date(date);
      search.startDateTime = {
        $gte: userDate,
          $lte: new Date(moment(userDate).add(1, "day").unix()*1000)
      }
    }
    if(fare) search.fare = {$lte: fare};
    busServiceList.set(BusServices.find(search, {sort: {createdAt: -1}}));
  }, 200)
});



