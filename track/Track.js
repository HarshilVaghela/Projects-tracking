class Track {
  /**
   * Track Constructor
   * @param {TimeTrackerApi} api
   * @param {int} company_id
   * */
  constructor(api, company_id) {
    this.start_button = undefined;
    this.stop_button = undefined;
    this.track_form = undefined;

    // Update the timer immediately, then trigger the callback every second to update the clock
    this.updateTimer();
    setInterval(this.updateTimer, 1000);

    this.api = api;
    this.company_id = company_id;

    // INSERT YOUR CODE HERE
    // Loading  the projects inside the form
    this.loadProjects();

    // use of eventListner to listen for stop button
    this.stop_button = document.getElementById("stop_button");
    this.stop_button.addEventListener("click", this.stop.bind(this));

    // use of eventListner to listen for stop button
    this.start_button = document.getElementById("start_button");
    this.start_button.addEventListener("click", this.start.bind(this));


  // Tracking  the local timer
  let timer_timestamp = localStorage.getItem("timer_timestamp");
  console.log("timer_timestamp", timer_timestamp);


  this.track_form = document.getElementById("track_form");

    // initally it is not started
    if (timer_timestamp !== null) {
      this.start_button.classList.add("hidden");
    } else {
      this.stop_button.classList.add("hidden");
    }
  }

  updateTimer() {
    console.log("----- updateTimer -----");
    // INSERT YOUR CODE HERE

    //use of math floor function inorder to update the time from the current date.
    let timer = localStorage.getItem("timer_timestamp");
    if (timer != null) {
      let seconds = Math.floor((Date.now() - timer) / 1000);
      let time_string = convertSecondsToHoursMinutesSeconds(seconds);

      document.getElementById("counter").textContent = time_string;
    }
  }

  /////////////////////////////////////////////
  //
  // EVENTS
  //
  /////////////////////////////////////////////

  start(event) {
    console.log("----- start -----", event);
    // INSERT YOUR CODE HERE
    // INSERT YOUR CODE HERE


    document.getElementById("stop_button").classList.remove("hidden");
    document.getElementById("start_button").classList.add("hidden");

    event.preventDefault();

    // Getting the current timestamp and saving to localstorage.
    let timestamp = Date.now();
    localStorage.setItem("timer_timestamp", timestamp);

    console.log(timestamp);
  }

  stop(event) {
    console.log("----- stop -----", event);

    // INSERT YOUR CODE HERE
    //saving the start time into the localStorage of timer_timestamp to calculate the time in seconds.
    let start_time = localStorage.getItem("timer_timestamp");
    let stop_time = Date.now();
    console.log("start_time",start_time, convertTimestampToDateFormat(start_time)
    );

    let parameters = {
      description: document.getElementById("description").value,
      project_id: document.getElementById("project_id").value,
      user_id: localStorage.getItem("user_id"),
      start_time: convertTimestampToDateFormat(start_time),
      stop_time: convertTimestampToDateFormat(stop_time),
    };

    console.log(parameters);

    this.api.makeRequest("POST", "projects/entries", parameters, () => {
      console.log("success");
      this.stop_button.classList.add("hidden");
      this.start_button.classList.remove("hidden");
      localStorage.setItem("timer_timestamp", null);
    });

    event.preventDefault();
  }

  /////////////////////////////////////////////
  //
  // PROJECTS
  //
  /////////////////////////////////////////////

  loadProjects() {

    console.log("----- loadProjects -----");
    // INSERT YOUR CODE HERE

    //loading the projects by making the request with the api to fill the projects in the select options
    // in order to see which project is created.
    this.api.makeRequest( "GET", "/companies/" + this.company_id + "/projects",{},
    this.fillProjectsWithResponse.bind(this)
    );
  }

  fillProjectsWithResponse(xhr_response) {
    console.log("----- fillProjectsWithResponse -----", xhr_response);
    // INSERT YOUR CODE HERE


    this.projects = xhr_response;

    // Saving the projects to the track class
    let selection = document.getElementById("project_id");
    for (let project_id in xhr_response) {
      let project = xhr_response[project_id];
      let option = document.createElement("option");
      option.setAttribute("value", project.project_id);
      option.textContent = project.title;
      selection.append(option);
    }
  }
}
