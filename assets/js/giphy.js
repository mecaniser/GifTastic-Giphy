$(document).ready(function () {
    //Array for searched carChoice to be added
    var carChoice = [];

    //Function with AJAX call to GIPHY; "q" parameters for API link set to search term, limit 15 results and without a fixed rating
    //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
    function displayNewCar() {
        var x = $(this).data("search");
        console.log(x);
        var myAPI = "&api_key=0iKJvSjZ5WSw65Kch4s0mddSPH8UAVIa"
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + myAPI + "&limit=15";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var cloneDiv = $("<div class='col-lg-4'>");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var cloneImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                cloneImage.attr("src", staticSrc);
                cloneImage.addClass("carGiphy");
                
                cloneImage.attr("data-state", "still");
                cloneImage.attr("data-still", staticSrc);
                cloneImage.attr("data-animate", defaultAnimatedSrc);
                cloneDiv.append(p);
                cloneDiv.append(cloneImage);
                $("#gifZone").prepend(cloneDiv);

            }
        });
    }

    //Submit button click event takes search term from "form input", trims and pushes to carChoice array, creates and displays button
    $("#addNewCar").on("click", function (event) {
    
        event.preventDefault();
        var NewCar = $("#carInput").val().trim();
        carChoice.push(NewCar);
        console.log(carChoice);
        $("#carInput").val('');
        displayBtns();
    });

    //Function iterates through carChoice array to display button with array values in "myBtns" section of HTML
    function displayBtns() {
        $("#myBtns").empty();
        for (var i = 0; i < carChoice.length; i++) {
            var w = $('<button class="btn btn-outline-success">');
            w.attr("id", "newCar");
            w.attr("data-search", carChoice[i]);
            w.text(carChoice[i]);
            $("#myBtns").append(w);
        }
    }


    displayBtns();

    // displayNewCar function will be executed by Click event on button with id of "newCar"
    $(document).on("click", "#newCar", displayNewCar);

    //Click event on gifs with class of "carGiphy" executes pausePlayGifs function
    $(document).on("click", ".carGiphy", pausePlayGifs);

    // Image source: "data-animate" or "data-still" will be triggered by the Function "data-state" attribute and depending on status will change animate or still state 
    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});