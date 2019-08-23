var config = {
    apiKey: "AIzaSyDcVrNeRCS6hmaEQOg0TNPrDPA1e9zeO5U",
    authDomain: "train-schedule-9e31d.firebaseapp.com",
    databaseURL: "https://train-schedule-9e31d.firebaseio.com",
    projectId: "train-schedule-9e31d",
    storageBucket: "",
    messagingSenderId: "465749917760",
    appId: "1:465749917760:web:1d7ebce0034f82f0"
};

firebase.initializeApp(config);

var database = firebase.database();

database.ref("Trains").on("child_added", function(snapshot) {
    //Variables
    var trainName = "";
    var destination = "";
    var startTime = "";
    var frequency = "";
    //On Submit Click

    $("#buttonHolder").on("click", function(event) {
        event.preventDefault();

        // function to call the button event, and store the values in the input form
        var storeInputs = function(event) {
            // prevent from from reseting
            event.preventDefault();
            //Grab All the values from the input fields
            //PUSH all values to database using database.ref(/trainData).push({ *names*:*values*})
            var tName = $("#Train-ID");
            var tDestination = $("#Location");
            var tTime = $("#Time");
            var tFrequency = $("#Frequency");

            // form validation for Time using jQuery Mask plugin




            trainName = tName.val().trim();
            destination = tDestination.val().trim();
            startTime = moment(tTime.val().trim(), "HH:mm").subtract(1, "years");
            frequency = tFrequency.val().trim();

            database.ref("Trains").push({
                name: trainName,
                destination: destination,
                time: startTime,
                frequency: frequency,

                date_added: firebase.database.ServerValue.TIMESTAMP
            });
            tName.val("");
            tDestination.val("");
            tTime.val("");
            tFrequency.val("");
        };

        storeInputs(event);
    });
});
//On Database value
//Loop through the SNAPSHOT to grab all train data
//for each train
//Write appropriate data to table