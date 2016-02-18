Router.configure({
   notFoundTemplate: 'notFound',
   loadingTemplate: 'loading' // loading thr temolatre
});

Router.onBeforeAction('loading');// show loading tewmplate 

Router.route("/", {
    // name of the template
    name: "home",
    
    // layout template
    layoutTemplate: "homeLayout",
    
    // template on router
    template: "home",
    
    yieldRegions: {
        travelSearch: {to : "search"}
    }
});

Router.route("/create-travel", {
   name: "createTravel",
   layoutTemplate: "createTravelLayout",
   template: "createTravel"
});