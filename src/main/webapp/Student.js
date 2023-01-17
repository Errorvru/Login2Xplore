
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var schoolDBName = "SCHOOL-DB";
var StudentRelationName = "STUDENT-TABLE";
var connToken = "90932422|-31949269678731585|90955703";

$("#rollNo").focus();

function saveRecNo2LS(jsonObj) {
	var lvData = JSON.parse(jsonObj.data);
	localStorage.setItem("recno", lvData.rec_no);
}

function getStudentRollNoAsJsonObj() {
	var rollno = $("#rollNo").val();
	var jsonStr = {
		id: rollno
	};
	return JSON.stringify(jsonStr);
}
function fillData(jsonObj) {
	saveRecNo2LS(jsonObj);
	var data = JSON.parse(jsonObj.data).record;
	$("#rollNo").val(record.RollNo)
	$("#fullName").val(record.FullName);
	$("#Class").val(record.Class);
	$("#DOB").val(record.BirthDate);
	$("#address").val(record.Address);
	$("#enrDate").val(record.EnrollmentDate);
}

function resetForm() {
	$("#rollNo").val("")
	$("#fullName").val("");
	$("#Class").val("");
	$("#DOB").val("");
	$("#address").val("");
	$("#enrDate").val("");
	$("#rollNo").prop("disable", false);
	$("#save").prop("disable", true);
	$("#change").prop("disable", true);
	$("#reset").prop("disable", true);
	$("#rollNo").focus();
}/*{Roll-No, Full-Name, Class, Birth-Date, Address, Enrollment-Date}  */

function validateData() {
	var rollNo, fullName, Class, DOB, address, enrDate;
	rollNo = $("#rollNo").val();
	fullName = $("#fullName").val();
	Class = $("#Class").val();
	DOB = $("#DOB").val();
	address = $("#address").val();
	enrDate = $("#enrDate").val();

	if (rollNo === "") {
		alert("Roll Number missing");
		$("#rollNo").focus();
		return "";
	}
	if (fullName === "") {
		alert("Full Name missing");
		$("#fullName").focus();
		return "";
	}
	if (Class === "") {
		alert("Class missing");
		$("#Class").focus();
		return "";
	}
	if (DOB === "") {
		alert("Birth Date missing");
		$("#DOB").focus();
		return "";
	}
	if (address === "") {
		alert("Address missing");
		$("#address").focus();
		return "";
	}
	if (enrDate === "") {
		alert("Enrollment-Date missing");
		$("#enrDate").focus();
		return "";
	}
	var jsonStrObj = {
		RollNo: rollNo,
		FullName: fullName,
		Class: Class,
		BirthDate: DOB,
		Address: address,
		EnrollmentDate: enrDate
	};
	return JSON.stringify(jsonStrObj);
}

function getStudent() {
	var studentIdJsonObj = getStudentRollNoAsJsonObj();
	var getRequest = createGet_BY_KEYRequest(connToken, schoolDBName, StudentRelationName, studentIdJsonObj);
	jQuery.ajaxSetup({ async: false });
	var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
	jQuery.ajaxSetup({ async: true });
	if (resJsonObj.status === 400) {
		$("#save").prop("disable", false);
		$("#reset").prop("disable", false);
		$("#rollNo").focus();
	} else if (resJsonObj.status === 200) {
		$("#rollNo").prop("disable", true);
		fillDate(resJsonObj);
		$("#change").prop("disable", false);
		$("#reset").prop("disable", false);
		$("#rollNo").focus();
	}
}

function saveData() {
	var jsonStrObj = validateData();
	if (jsonStrObj === '') {
		return "";
	}
	var putRequest = createPUTRequest(connToken, jsonStrObj, schoolDBName, StudentRelationName);
	jQuery.ajaxSetup({ async: true });
	var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
	jQuery.ajaxSetup({ async: true });
	resetForm();
	$("#rollNo").focus();
}
function changeDate() {
	$("#change").prop("disabled", true);
	jsonChg = validateDate();
	var updateRequest = createUPDATERecordRequest(connChg, jsonChg, schoolDBName, StudentRelationName, localStorage.getItem(""));
	jQuery.ajaxSetup({ async: false });
	var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
	jQuery.ajaxSetup({ async: true });
	console.log(resJsonObj);
	resetForm();
	$("#rollNo").focus();
}


































