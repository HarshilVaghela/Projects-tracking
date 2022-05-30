
class Projects {

	/**
	* Projects Constructor
	* @param {TimeTrackerApi} api
	* @param {int} company_id
	*/
	constructor(api, company_id)
	{
		this.project_form = undefined;

		this.api = api;
		this.company_id = company_id;
		this.loadProjects();
		;
		// INSERT YOUR CODE HERE

	}

	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////



	/**
	* This method will use API to find the list of projects.
	*loadProjects method helps us to find the list of the projects.
	*/
	loadProjects()
	{
		api.makeRequest( "GET", "companies/" + this.company_id + "/projects/",{},
		this.fillProjectsWithResponse.bind(this)
	)

}

//}

/**
* This method will receive response from the API call and perfrom the action of filling the table
* with list of projects
* @param { object } xhr_response Object which is passed
*/
fillProjectsWithResponse(xhr_response)
{
	console.log(xhr_response);
	// INSERT YOUR CODE HERE
	var rr=document.getElementById('projects_table').getElementsByTagName('tbody')[0];
	for(let x in xhr_response){
		var row= this.createProjectRow(xhr_response[x]);
	}
}
/**
* createProjectRow uses project object as a parameter and generates rpw of project details in a table.
* @param { object } project Object which is passed.
*/
createProjectRow(project)
{
	var rr=document.getElementById('projects_table').getElementsByTagName('tbody')[0];
	var row = rr.insertRow(0);
	var one=row.insertCell(0);
	var two= row.insertCell(1);
	var three=row.insertCell(2);
	var four= row.insertCell(3);
	one.textContent=project.project_id;
	two.textContent= project.title;
	three.textContent= project.num_entries;
	four.textContent="delete";
	two.innerHTML = "<a href='#' class='edit_link'>"+project.title+"</a>";
	four.innerHtml= "<a href='#' class='delete_link'> delete </a>";


	// INSERT YOUR CODE HERE
}

/////////////////////////////////////////////
//
// FORMS
//
/////////////////////////////////////////////
/**
* This method will make the from appear when user want to create a new project.
* @param { object } event object which is passed
*/
showCreateForm(event)
{
	console.log('----- showCreateForm -----', event);
	// INSERT YOUR CODE HERE
	document.getElementById('form_project_id').value = "create NewProject";
}

/**
* This method will make the from appear when user want to create a edit an existing project.
* @param { object } event object which is passed
*/
showEditForm(event)
{
	console.log('----- showEditForm -----', event);
	// INSERT YOUR CODE HERE
	document.getElementById('form_project_id').type = event;
	document.getElementById('form_project_id').value = "Edit project";

}

/**
* This method will hide the form when its value is 0, which means it is in create mode
* and make it visible when it is in edit mode.
* hideForm method is used to hide form until the button is clicked.
*/
hideForm()
{
	console.log('----- hideForm -----');
	// INSERT YOUR CODE HERE

	document.getElementById('form_project_id').type = hidden;

}

/**
* This method will detect the submit event and determine weather the event is create or edit.
* @param { object } event object which is passed
*/
handleFormSubmit(event)
{
	console.log('----- handleFormSubmit -----', event);
	// INSERT YOUR CODE HERE

}

/////////////////////////////////////////////
//
// CREATE / EDIT
//
/////////////////////////////////////////////

/**
* This method will create the new project with related API call back
* @param { object } xhr_response object which is passed
*/
createNewProject()
{
	console.log('----- createNewProject -----');
	// INSERT YOUR CODE HERE
	//it is not fully function
	/*let formElem = document.getElementById('project_form');
	alert(formElem);
	formElem.onsubmit = async (e) => {
	e.preventDefault();
	var fpd=new FormData(formElem);
	let response = await fetch('https://acs2909.lusciousorange.com/t-api/projects/', {
	method: 'POST',
	body: fpd,
	headers: {
	'api-Key': 'tcj6481-b4nd9zmrf6wj2gh8-8rhcb08',
}

});
let result = await response.json();
alert(result.message);
}*/


}

/**
* This method will edit the existing project with the related API call back.
* @param { object } xhr_response object which is passed
*/
updateProject(xhr_response)
{
	console.log('----- updateProject -----', xhr_response);
	// INSERT YOUR CODE HERE
	var xhr=new XMLHttpRequest();
	var link=xhr.open('PATCH','https://acs2909.lusciousorange.com/t-api/projects/{project_id}');
	xhr.setRequestHeader('api-key', 'tcj6481-b4nd9zmrf6wj2gh8-8rhcb08');
	xhr.send();
	var result="t";
	xhr.onload= function(){
		result=JSON.parse(xhr.response);

	}
	xhr_response=result;

}

/////////////////////////////////////////////
//
// DELETE
//
/////////////////////////////////////////////
/**
* This method will detect the clicking of delete button and pass it to the following method.
* @param { object } event object which is passed
*/
handleDelete(event)
{
	console.log('----- handleDelete -----', event);
	// INSERT YOUR CODE HERE

}

/**
* This method will delete the project from the project table and update the form.
* updateFromDelete method is used to remove an project from the interface.
* @param { object } xhr_response object which is passed
*/
updateFromDelete(xhr_response)
{
	console.log('----- updateFromDelete -----', xhr_response);
	// INSERT YOUR CODE HERE,,
	var xhr=new XMLHttpRequest();
	var link=xhr.open('DELETE','https://acs2909.lusciousorange.com/t-api/projects/{project_id}');
	xhr.setRequestHeader('api-key', 'tcj6481-b4nd9zmrf6wj2gh8-8rhcb08');
	xhr.send();
	var res="t";
	xhr.onload= function(){
		res=JSON.parse(xhr.response);

	}
	xhr_response=res;
}

}
