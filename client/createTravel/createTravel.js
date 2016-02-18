Template.createTravel.events({
   "submit form": function (event) {
       event.preventDefault();
       // creating one object with all the properties set fro user input
       var busService = {
           name: event.target.name.value,
           agency: event.target.agency.value,
           seats: parseInt(event.target.seats.value, 10),
           source: event.target.startpoint.value,
           destination: event.target.endpoint.value,
           startDateTime: new Date(event . target.startdate.value+ " "+ event.target.starttime.value),
           endDateTime: new Date(event. target.enddate.value+ " " + event.target.endtime.value),
           fare: event.target.fare.value
       };
       // Checking the start time is greater than end time.
       if(busService.startDateTime.getTime() > busService.endDateTime.getTime()) {
           $(event.target).find(".error").html("Start time is greater");
           return false;
       }
       
       // server call to persist date
       Meteor.call("createBusService", busService, function(error, result) {
           if(error) {
               $(event.target).find(".error").html(error.reason);
           } else {
               Router.go("home");
           }
       });
   } 
});