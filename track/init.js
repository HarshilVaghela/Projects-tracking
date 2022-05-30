
const api = new TimeTrackerApi(api_key_time_tracking , api_url);

// INSERT YOUR CODE HERE
api_key=this.api_key_time_tracking;
base_url=this.api_url;

//adding the listen funtion.
window.addEventListener('DOMContentLoaded',() => new Track(api, company_id));
