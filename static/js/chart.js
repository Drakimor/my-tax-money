google.load('visualization', '1', {packages: ['corechart']});

// Hard coded until datastore is running
gov_spending = {
	'Pensions': 780.8,
	'Health Care': 898.0,
	'Education': 140.9,
	'Defense': 928.5,
	'Wellfare': 478.5,
	'Protection': 57.3,
	'Transportation': 104.2,
	'General Government': 29.0,
	'Other Spending': 173.1,
	'Interest': 250.7,
}

// Hard coded until datastore is running
gov_budget = {
	'Income': 2567.2,
	'Deficit': 1266.7
}

/* 
Turns the spending array into something consumable by Google Charts, adds title
This should be updated to the recommended format of initializing array with title
and then adding the rows.
*/
function getSpendingArray() {
	var income_field = document.getElementById('income');
	var spending_total = 0;
	var array = [];
	$.each(gov_spending, function(index, value) {
		spending_total += value
	});
	if(income_field.value != "") {
		$.each(gov_spending, function(index, value) {
			array[array.length] = [index, Math.round(((income_field.value * (value/spending_total))*100))/100]
		})
	} else {
		$.each(gov_spending, function(index, value) {
			array[array.length] = [index, value]
		})
	}
	array.sort(function(a,b) {
		if (a[1] < b[1]) {return 1}
		else if (a[1] > b[1]) {return -1}
		else {return 0}
	})
	array.unshift(['Department', 'Amount'])
	return array
}

// Draw the chart
function drawVisualization() {
	// Create and populate the data table.
	var data = google.visualization.arrayToDataTable(getSpendingArray());

	// Set options for the chart
	var options = {
		title: "Tax money went to: (in billions)",
		is3D: true,
		backgroundColor: "black",
		titleTextStyle: {color: "white"},
		legend: {textStyle: {color: 'lightgrey'}},
		pieSliceText: "value"
	}

	// Change title once tax amount inputted
	if (document.getElementById('income').value != "") {
		options['title'] = "Your money went to:"
	}

	// Create and draw the visualization.
	new google.visualization.PieChart(document.getElementById('taxchart')).
	    draw(data, options);
}

// Draw the chart once page loads
google.setOnLoadCallback(drawVisualization);