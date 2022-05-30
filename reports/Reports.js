class Reports {

	/**
	 * Reports Constructor
	 * @param {TimeTrackerApi} api
	 * @param {int} company_id
	 */
	constructor( api, company_id )
	{
		// Must filled via the API calls
		this.projects = undefined;
		this.users = undefined;

		this.api = api;
		this.company_id = company_id;

		this.loadProjects();
		this.loadUsers();
		this.loadTimeEntries();

		// INSERT YOUR CODE HERE


	}

	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////


	loadProjects()
	{

		//making request and getting all the projects of a company passing success method fillProjectsWithResponse
		api.makeRequest( "GET", "companies/" + this.company_id + "/projects/", { }, this.fillProjectsWithResponse.bind( this ) );

	}

	fillProjectsWithResponse( xhr_response ){
		this.projects=xhr_response;


		let projectOptions=document.getElementById( "project_id");//projects select element
		for( let project in xhr_response ){//adding the projects to the select element
			let option=document.createElement("option");//creating the option
			option.text= xhr_response[ project ].title;
			option.value=xhr_response[ project ].project_id;
			projectOptions.add( option );//adding the option finally
		}
	}



	handleProjectChange( event )
	{
		/*window.onclick=function(event){
			if(event.target.matches('#project_id')){

			}*/
		}




	/////////////////////////////////////////////
	//
	// USERS
	//
	/////////////////////////////////////////////


	loadUsers()
	{
		//making request and getting all the users of a company passing success method fillUsersWithResponse
		api.makeRequest( "GET", "companies/" + this.company_id + "/users/",{},this.fillUsersWithResponse.bind(this) );
	}

	fillUsersWithResponse( xhr_response )
	{
		this.users=xhr_response;
		var userOptions="t";
		userOptions = document.getElementById( "user_id" );//getting the users select element in the document
		for( let user in xhr_response ){
			var option=document.createElement( "option" );
			var fName=xhr_response[user].first_name;
			var lName=xhr_response[user].last_name;
			option.text=fName+" "+lName;
			option.value=xhr_response[ user ].user_id;
			userOptions.add( option );
		}
	}

	handleUserChange( event )
	{
		console.log('----- handleUserChange -----', event);


	}

	/////////////////////////////////////////////
	//
	// TIME ENTRIES
	//
	/////////////////////////////////////////////

	loadTimeEntries()
	{

		// making request to get alltime entries for company and passing the success method fillTimeEntriesWithResponse
		api.makeRequest( "GET", "companies/" + this.company_id + "/entries/",{},this.fillTimeEntriesWithResponse.bind(this));

	}

	fillTimeEntriesWithResponse( xhr_response )
	{
		var entryTable ="t";
		entryTable = document.getElementById( "results" );let count1=0;
		for( let entry in xhr_response ){
			var row=entryTable.insertRow( count1 );//creatng row for every entry
			let count2=0;

			for( let element in entry ){//if(count==5){break;}
			/*if(count==4){var start=entry[4];var end=entry[]}*/
			//creating cell for every entry attribute
				var cell=row.insertCell(count2);
				cell.innerText=entry[element];//setting cell text
				count2++;
			}
			entryTable.appendChild(row);//appending row to table
			count1++;
		}

}
}
