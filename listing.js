var data;

// the rest of the HTML document needs to be loaded before running this,
// else place the data at the top of the file instead of the bottom
window.addEventListener("load", function(){

	// also works: document.querySelector("#csv");
	const csvScriptTag = document.getElementById("csv");

	// wrapper HTML instead of lots of quotes and \n JS syntax 
	// need X.trim() or merge header line with opening line of script tag
	const csv = csvScriptTag.innerText.trim();

	// d3.csv is a file fetch wrapper around this function anyway 
	data = d3.csvParse(csv);

	for(const button of document.querySelectorAll("button.set.data")) {
		const name = button.dataset.name;
		button.addEventListener("click", updateList.bind(null, name));
	}
});

function updateList(name) {
	// remove the old list to replace with new one
	var list = document.getElementById("list");
	if (list) {
		list.remove();
	}

	list = buildList();

	const orderedList = document.createElement("ol");
	list.append(orderedList);

	const pluck = function(name) {
		return function(item) {
			return item[name];
		}
	};

	const values = data
		.map(pluck(name))
		.map(x=>Number.parseInt(x))
		.map(JSON.stringify);

	for(const value of values) {
		const listItem = document.createElement("li");
		orderedList.append(listItem);
		listItem.innerText = value;
	}
}

// adds a new div to the page with supplied content
function buildList() {
	const newDiv = document.createElement("div");
	newDiv.setAttribute("id", "list")
	document.body.append(newDiv);
	return newDiv;
}