/**
 * @var api_url
 * @type {string}
 * The URL that points to the main API path. All commands use this primary URL
 */
let api_url = 'https://acs2909.lusciousorange.com/t-api/';


/**
 * API KEYS
 * @type {string}
 * The three API keys for the three segments of the project. You must replace these YOUR KEYS for your respective roles.
 */
let api_key_time_tracking = 'k7hw8v6-8tg9sv2zp6qy1mc5-6f95p29';
let api_key_reports = 'gszb538-ngzcyjwk1tqx0098-4d91879';
let api_key_projects = 'tcj6481-b4nd9zmrf6wj2gh8-8rhcb08';

/**
 *
 * @var {string} my_api_key
 * YOUR api key which is used for basic connections. When submitting for the final project, any of the three API keys
 * can be included here, but for any development work, you must use your own API key.
 */
let my_api_key = 'k7hw8v6-8tg9sv2zp6qy1mc5-6f95p29';

/**
 * @var {int} company_id
 * Your company ID, you must replace this is your value once you know your company ID
 */
let company_id = 16;


/**
 * PROFILE CALL
 * This profile call must remain here as the first thing that happens in the config. It uses your API key to get the
 * profile of who is currently working.
 */
let my_api = new TimeTrackerApi( my_api_key, api_url );
my_api.makeRequest( 'GET','acs/profile', {}, saveUserID );
my_api = null;




function saveUserID(profile_object)
{
	console.log(profile_object);
	localStorage.setItem("user_id",profile_object.user_id);
}

/*function convertSecondsToHoursMinutesSeconds(seconds)
{
	let hours=seconds/( 3600 );//converting to hours
	let minutes=( seconds-( hours*3600 ) )/60;//second minus already counted hours
	let seconds=( seconds-( hours*3600 )-( minutes*60 ) )/60;//second minus already counted hours and minutes
	//return string=hours+" : "+minutes+" : "+seconds;
}*///as our program

function convertTimestampToDateFormat(timestamp)
{
	console.log('----- convertTimestampToDateFormat -----', timestamp);
	// INSERT YOUR CODE HERE

}

function showError(error_details)
{
  console.error('----- showError -----', error_details);
  // INSERT YOUR CODE HERE
  var div=document.createElement('div');
  div.id='error_box';
  div.append("ERROR: "+error_details.error_code+" : "+error_details.error_message+".");
  document.body.appendChild(div);

}
