let token = "90937407"
let dbname = 'Class'
let dbrel = 'Student-Rel'
$("#id").focus();
function validateAndGetFormData() {
    var studRoll = $("#id").val();
    if (studRoll === "") {
        alert("Roll No is Required Value");
        $("#id").focus();
        return "";
    }
    var studname = $("#name").val();
    if (studname === "") {
        alert("Student Name is Required Value");
        $("#name").focus();
        return "";
    }
    var studclass = $("#class").val();
    if (studclass === "") {
        alert("Class is Required Value");
        $("#class").focus();
        return "";
    }
    var studMarks = $("#Marks").val();
    if (studMarks === "") {
        alert("Student Marks is Required Value");
        $("#Marks").focus();
        return "";
    }
    var jsonStrObj = {
        Roll_No: studRoll,
        Name: studname,
        Class: studclass,
        Marks: studMarks
    };
    return JSON.stringify(jsonStrObj);
}

function validateAndupdateFormData() {
    var jsonStrObj = {};

    var studRoll = $("#id_update").val();
    if (studRoll !== "") {
        var namepair = {
            Roll_No: studRoll
        }
        $.extend(jsonStrObj, namepair)
    }

    var studname = $("#name_update").val();
    if (studname !== "") {
        var namepair = {
            Name: studname
        }
        $.extend(jsonStrObj, namepair)
    }
    var studclass = $("#class_update").val();
    if (studclass !== "") {
        var classpair = {
            Class: studclass
        }
        $.extend(jsonStrObj, classpair)
    }
    var studMarks = $("#Marks_update").val();
    if (studMarks === "") {
        alert("Student Marks is Required Value");
        $("#Marks_update").focus();
        return "";
    }
    jsonStrObj = {
        ...jsonStrObj,
        Marks: studMarks
    };
    console.log(jsonStrObj)

    return JSON.stringify(jsonStrObj);
}

function resetForm() {
    $("#id").val("")
    $("#name").val("");
    $("#class").val("");
    $("#Marks").val("");
    $("#id_update_record").val("");
    $("#id_update").val("")
    $("#name_update").val("");
    $("#class_update").val("");
    $("#Marks_update").val("");
    $("#id_retrieve").val("");
    $("#id_record").val("");
    $("#id").focus();
}

function tablevisible() {
    document.getElementById('table').style.display = 'flex';
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// This method is used to create PUT Json.
function saveStudent() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(token,
        jsonStr, dbname, dbrel);
    // alert(putReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    console.log(JSON.stringify(resultObj))
    jQuery.ajaxSetup({ async: true });
    resetForm();
}

// This method is used to Retrieve All Data .
function retrieveall() {
    var x = createGETALLRecordRequest(token,
        dbname, dbrel, 1, 10, true, true);
    // alert(x);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(x,
        "http://api.login2explore.com:5577", "/api/irl");
    var data = JSON.stringify(resultObj)
    // alert(data);
    // console.log(data)
    jQuery.ajaxSetup({ async: true });

    var res = data.split("\"");
    console.log(res)
    let varjson = ''
    for (let i = 0; i < res.length; i++) {
        if (res[i].includes('Name')) {
            // console.log(res[i + 2].replace("\\", ""))
            varjson += `<td>${res[i + 2].replace("\\", "")}</td></tr>`

        } else if (res[i].includes('Class')) {
            // console.log(res[i + 2].replace("\\", ""))
            varjson += `<td>${res[i + 2].replace("\\", "")}</td>`

        } else if (res[i].includes('Roll_No')) {
            // console.log(res[i + 2].replace("\\", ""))
            varjson += `<td>${res[i + 2].replace("\\", "")}</td>`

        } else if (res[i].includes('Marks')) {
            // console.log(res[i + 2].replace("\\", ""))
            varjson += `<td>${res[i + 2].replace("\\", "")}</td>`

        } else if (res[i].includes('rec_no')) {
            // console.log(res[i + 2].replace("\\", ""))
            let temp = res[i + 1].replace("\\", "")
            temp = temp.replace(":", "")
            temp = temp.replace(",", "")
            varjson += `<tr><td>${temp}</td>`

        }
    }
    var trs = document.querySelectorAll("tr");
    for (var i = 1; i < trs.length; i++)
        (function (e) {
            trs[e].remove();
        })(i)
    tablevisible()
    document.getElementById("td-list").innerHTML += varjson;
    resetForm()
}

// This method is used to Retrieve By Key Data.
function retrieveByKey() {
    var record_no = $("#id_retrieve").val();
    if (record_no === "") {
        alert("Student Record is Required Value");
        $("#id_retrieve").focus();
        return "";
    }

    let x = createGET_RECORDRequest(token, dbname, dbrel, record_no)
    // alert(x);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(x,
        "http://api.login2explore.com:5577", "/api/irl");
    // alert(JSON.stringify(resultObj));
    let data = JSON.stringify(resultObj)
    jQuery.ajaxSetup({ async: true });
    resetForm();
    try {
        var res = data.split("\"");
        var varjson = `<tr><td>${record_no}</td><td>${res[6].replace("\\", "")}</td><td>${res[10].replace("\\", "")}</td><td>${res[14].replace("\\", "")}</td><td>${res[18].replace("\\", "")}</td></tr>`
    } catch (error) {
        console.log(error)
        alert(error)
        return
    }
    var trs = document.querySelectorAll("tr");
    for (var i = 1; i < trs.length; i++)
        (function (e) {
            trs[e].remove();
        })(i)
    tablevisible()
    document.getElementById("td-list").innerHTML += varjson;
    resetForm()
}

// This method is used to Remove Data.
function remove() {
    var id_record = $("#id_record").val();
    if (id_record === "") {
        alert("Student Record is Required Value");
        $("#id_record").focus();
        return "";
    }
    var x = createREMOVERecordRequest(token,
        dbname, dbrel, id_record)
    alert(x);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(x,
        "http://api.login2explore.com:5577", "/api/iml");
    var data = JSON.stringify(resultObj)
    alert(data);
    console.log(data)
    jQuery.ajaxSetup({ async: true });
    resetForm()
}

// This method is used to Update Data.
function updatedata() {
    var jsonStr = validateAndupdateFormData();
    if (jsonStr === "") {
        return;
    }
    var studRecord = $("#id_update_record").val();
    if (studRecord === "") {
        alert("Student Record is Required Value");
        $("#id_update_record").focus();
        return "";
    }
    var x = createUPDATERecordRequest(token, jsonStr, dbname, dbrel, studRecord)
    alert(x);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(x,
        "http://api.login2explore.com:5577", "/api/iml");
    var data = JSON.stringify(resultObj)
    alert(data);
    console.log(data)
    jQuery.ajaxSetup({ async: true });
    resetForm()
}
