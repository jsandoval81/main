
//======================
//== GLOBAL VARIABLES ==
//======================
	//== Store the parsable page URI
	var pageURL = $.url();

//======================
//== NAVIGATION MENUS ==
//======================
	//== Highlight the top nav menu items
	$('#top-menu a').filter(function() { 
		var thisURL = $(this).url();
		return thisURL.segment(2) == pageURL.segment(2);
	}).parent().addClass('active');

	//== Highlight the sub nav menu items
	$('#profile-menu a').filter(function() { 
		var thisURL = $(this).url();
		return thisURL.segment(3) == pageURL.segment(3);
	}).parent().addClass('active');

//===============
//== STRENGTHS ==
//===============
// TODO: Wrap tagsInput initializers in a document.ready so I can create a non-global variable with all the repeatable settings
// TODO: Find way to send calling element (or other arguments) for onAddTag and onRemoveTag calls so we can eliminate all the separate add and remove functions

	//== Initialize Team strengths input element
	$('#tags-team').tagsInput({
		"width": "100%",
		"height": "100px",
		"defaultText": "Add...",
		"removeWithBackspace": false,
		"maxChars": 20,
		"onAddTag": addTeamTag,
		"onRemoveTag": removeTeamTag
	});
	//== Initialize Company strengths input element
	$('#tags-company').tagsInput({
		"width": "100%",
		"height": "100px",
		"defaultText": "Add...",
		"removeWithBackspace": false,
		"maxChars": 20,
		"onAddTag": addCompanyTag,
		"onRemoveTag": removeCompanyTag
	});
	//== Initialize Other strengths input element
	$('#tags-other').tagsInput({
		"width": "100%",
		"height": "100px",
		"defaultText": "Add...",
		"removeWithBackspace": false,
		"maxChars": 20,
		"onAddTag": addOtherTag,
		"onRemoveTag": removeOtherTag
	});
	//== Add a Team strength
	function addTeamTag(tag) {
		$.ajax({
			url: "/formapp1/profiles/strengths",
			type: "PUT",
			data: {
				"tag": tag,
				"type": "Team",
				"action": "Add"
			}, 
			success: function (data, textStatus, jqXHR) { 
				//alert(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(errorThrown + ". Tag not added to profile");
				location.reload(true);
			}
		});
	}
	//== Remove a Team strength
	function removeTeamTag(tag) {
		$.ajax({
			url: "/formapp1/profiles/strengths",
			type: "PUT",
			data: {
				"tag": tag,
				"type": "Team",
				"action": "Remove"
			}, 
			success: function (data, textStatus, jqXHR) { 
				//alert(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(errorThrown + " - Tag not removed from profile");
				location.reload(true);
			}
		});
	}
	//== Add a Company strength
	function addCompanyTag(tag) {
		$.ajax({
			url: "/formapp1/profiles/strengths",
			type: "PUT",
			data: {
				"tag": tag,
				"type": "Company",
				"action": "Add"
			}, 
			success: function (data, textStatus, jqXHR) { 
				//alert(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(errorThrown + ". Tag not added to profile");
				location.reload(true);
			}
		});
	}
	//== Remove a Company strength
	function removeCompanyTag(tag) {
		$.ajax({
			url: "/formapp1/profiles/strengths",
			type: "PUT",
			data: {
				"tag": tag,
				"type": "Company",
				"action": "Remove"
			}, 
			success: function (data, textStatus, jqXHR) { 
				//alert(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(errorThrown + " - Tag not removed from profile");
				location.reload(true);
			}
		});
	}
	//== Add an Other strength
	function addOtherTag(tag) {
		$.ajax({
			url: "/formapp1/profiles/strengths",
			type: "PUT",
			data: {
				"tag": tag,
				"type": "Other",
				"action": "Add"
			}, 
			success: function (data, textStatus, jqXHR) { 
				//alert(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(errorThrown + ". Tag not added to profile");
				location.reload(true);
			}
		});
	}
	//== Remove an Other strength
	function removeOtherTag(tag) {
		$.ajax({
			url: "/formapp1/profiles/strengths",
			type: "PUT",
			data: {
				"tag": tag,
				"type": "Other",
				"action": "Remove"
			}, 
			success: function (data, textStatus, jqXHR) { 
				//alert(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(errorThrown + " - Tag not removed from profile");
				location.reload(true);
			}
		});
	}

//=================
//== PREFERENCES ==
//=================
//== Handle changes to Contact choices
$("select.contact-preferences").change(function(e, data) {

	//== Identify the elements
	var prefType = this.id.split('-').shift();
	var typeCategory = this.id.split('-')[1];
	var choice1 = '#' + prefType + '-' + typeCategory + '-1';
	var choice2 = '#' + prefType + '-' + typeCategory + '-2';
	var choice3 = '#' + prefType + '-' + typeCategory + '-3';

	//== If not initial load trigger then update DB
	if (typeof data == "undefined") {
		var choiceNum = this.id.split('-').pop();
		var choiceValue = this.value;
		updatePrefs(prefType, typeCategory, choiceNum, choiceValue);
	}

	//== Cascade Contact selection availability
	if ($(choice1).val() == "" || $(choice1).text() == "No Preference") {
		$(choice2 + ',' + choice3).val("");
		$(choice2 + ',' + choice3).prop('disabled', true);
	} else {
		$(choice2 + " option:contains('No Preference'), " + choice3 + " option:contains('No Preference')").hide();
		$(choice2).prop('disabled', false);
		if ($(choice2).val() == "") {
			$(choice3).val("");
			$(choice3).prop('disabled', true);
		} else {
			$(choice3).prop('disabled', false);
		}
	}
});
//== Handle changes to meeting preferences
$("select.meeting-preferences").change(function(e, data) {
	//== Identify the elements
	var id = this.id;
	var prefType = id.split('-').shift();
	var typeCategory = (function() {
		var idArr = id.split('-');
		idArr.shift();
		var className = '';
		for(i = 0; i < idArr.length; i++) {
			if (i == 0) {
				className = idArr[i];
			} else {
				className += '-' + idArr[i];
			}
		}
		return className;
	})();
	var choiceValue = this.value;
	if (choiceValue && choiceValue != '') {
		updatePrefs(prefType, typeCategory, 1, choiceValue);
	} else {
		location.reload(true);
	}
});

//== Reveal update button for changed Time preferences
$('.time-update').keyup(function() {
	var btnId = '#' + this.id + '-btn';
	if (!$(btnId).is(':visible') && this.value.trim() != '') {
		$(btnId).css('visibility','visible').hide().fadeIn().removeClass('hidden');
	} else {
		if (this.value == '') {
			$(btnId).hide('fast');
		}
	}
});

//== Handle changes to Time preferences
$(".time-preferences").click(function(e, data) {
	var idArr = this.id.split('-');
	var inputId = '';
	idArr.pop();
	for (i = 0; i < idArr.length; i++) {
		if (i == 0) {
			inputId = '#' + idArr[i];
		} else {
			inputId += '-' + idArr[i];
		}
	}
	var prefType = idArr.shift();
	var typeCategory = idArr.pop();
	var choiceValue = $(inputId).val();
	if (choiceValue && choiceValue != '') {
		updatePrefs(prefType, typeCategory, 1, choiceValue);
		$('#' + this.id).hide('fast');
	} else {
		location.reload(true);
	}
});

//== Update preferences in DB
function updatePrefs(prefType, typeCategory, choiceNum, choiceValue) {
	$.ajax({
		url: "/formapp1/profiles/preferences",
		type: "PUT",
		data: {
			"prefType"		: prefType,
			"typeCategory"	: typeCategory,
			"choiceNum"		: choiceNum,
			"choiceValue" 	: choiceValue
		}, 
		success: function (data, textStatus, jqXHR) {
			/** alert(data); **/
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert(errorThrown + ": Preferences not updated");
			location.reload(true);
		}
	});
}

$(function() {
	//== Make progressive list choices mutually exclusive
	$("select.contact-help").mutuallyExclusive();
	$("select.contact-announcements").mutuallyExclusive();
	$("select.contact-brainstorm").mutuallyExclusive();
	//== Trigger selection availability on load - 1 item from each list
	$("#contact-help-1").trigger("change", [{ initial: true}]);
	$("#contact-announcements-1").trigger("change", [{ initial: true}]);
	$("#contact-brainstorm-1").trigger("change", [{ initial: true}]);
});

//====================
//== ADMINISTRATION ==
//====================
//== Handle new values
$("button.admin-update").click(function() {
	//== Determine the type of list
	var updateTypeArr = this.id.split('-');
	updateTypeArr.shift();
	updateTypeArr.pop();
	for(i = 0; i < updateTypeArr.length; i++) {
		if(i == 0) { var updateType = updateTypeArr[i]; }
		else { updateType += '-' + updateTypeArr[i]; }
	}
	//== Determine which input field to read
	var input = '#' + this.id.replace('btn', 'input');
	var value = $(input).val();
	if (value.trim() != "") {
		updateAdmin("Add", updateType, value);
	}
});

//== Handle deleted values
$(".admin-delete").click(function() {
	var updateTypeArr = this.id.split('-');
	var value = updateTypeArr.pop();
	updateTypeArr.pop();
	for(i = 0; i < updateTypeArr.length; i++) {
		if(i == 0) { var updateType = updateTypeArr[i]; }
		else { updateType += '-' + updateTypeArr[i]; }
	}
	updateAdmin("Remove", updateType, value);
});

function updateAdmin(action, updateType, value) {
	$.ajax({
		url: "/formapp1/profiles/administrator",
		type: "PUT",
		data: {
			"action"	: action,
			"updateType": updateType,
			"value" 	: value
		}, 
		success: function (data, textStatus, jqXHR) { 
			/*alert(data);*/
			location.reload(true);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert(errorThrown + ": List not updated");
			location.reload(true);
		}
	});
}