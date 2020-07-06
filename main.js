	/* ******************* Welcome to render table timing sctipt ********************* */

	$('#loadModalCenter').modal({
	    backdrop: 'static',
	    keyboard: false
	})
	//let data = [];  // uncoment this section
	//let uNits = []; // uncoment this section
	let dataNames = [];

	// ************************************ DATE STACK ***************************************

	let dateStack = {
	    _callBackDate: "Fri Jun 11 2018 16:09:11 GMT+0300 (FLE Daylight Time)",
	    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	    _now: new Date(),
	    nMonthDays: null,

	    renderMonthName: function() {
	        $('#dateNow').append(this.monthNames[this._now.getMonth()])
	    }, // render month name
	    daysInThisMonth: function() {
	        let _date = new Date(this._callBackDate);

	        this.nMonthDays = new Date(_date.getFullYear(), _date.getMonth() + 1, 0).getDate();

	        return new Date(_date.getFullYear(), _date.getMonth() + 1, 0).getDate();
	    },

	    weekendDays: function(arr1) {
	        let _date = new Date(this._callBackDate);

	        let my_date = ((_date.getFullYear()).toString() + "-" + ((_date.getMonth() + 1)).toString() + "-5").split('-');
	        // let my_date = "2018-05-01".split('-');
	        let year = parseInt(my_date[0]);
	        let month = parseInt(my_date[1]) - 1;
	        let saturdays = [];
	        let sundays = [];



	        for (let i = 1; i <= new Date(year, month, 0).getDate()-1; i++) {
	            let date = new Date(year, month, i);
	            if (date.getDay() == 6) {
	                saturdays.push(date.toString().split(" ")[2])
	            } else if (date.getDay() == 0) {
	                sundays.push(date.toString().split(" ")[2])
	            }
	        }
	        if (arr1 === true) {
	            return saturdays;
	        } else {
	            return sundays;
	        }
	    },
	    daysInMonth: function() {
	        let allMonthDays = [];
	        let _date = new Date(this._callBackDate);
	        for (i = 1; i <= this.nMonthDays; i++) {
	            if (i < 10) {
	                allMonthDays.push("2018-" + (_date.getMonth() <= 9 ? "0" + (_date.getMonth() + 1) : _date.getMonth() + 1) + "-0" + i);
	            } else {
	                allMonthDays.push("2018-" + (_date.getMonth() <= 9 ? "0" + (_date.getMonth() + 1) : _date.getMonth() + 1) + "-" + i);
	            }
	        }
	        return allMonthDays;
	    },
	    renderWeekends: function() {

	        //  format - classDay30

	        let renderVar = this.weekendDays(false).map(function(num) {
	            return " .classDay" + num
	        });
	        let renderVar2 = this.weekendDays(true).map(function(num) {
	            return " .classDay" + num
	        });

	        $(renderVar.toString()).css("background-color", "#c0c0c0");
	        $(renderVar2.toString()).css("background-color", "#c0c0c0");
	    }

	}


	 // dateStack._callBackDate = new Date(); // uncoment this for use NOW date, date set to JUNE to view fake data.

	dateStack.renderMonthName();
	dateStack.daysInThisMonth(); // get now month days number

	//**************************************************************************************************************************
	//********************************************************************* SORT STACK ******************************************
	let sortStack = {

	    sortByDep: function(arg) {
	        let namesToDepRender = [];
	        let names = [];
	        $('#body').remove();
	        $('table').append('<tbody id="body"class="table-striped table-hover">');



	        for (i = 0; i < uNits.length; i++) {
	            if (uNits[i]['departament'] === arg) {
	                names.push(uNits[i]['concat']);

	            }
	        }

	        namesToDepRender = [...new Set(names)];

			      // ***************************

	        $.each(namesToDepRender, function(index, value) {

	            dataMain.getDataByName(value);

	        });
	        $('#dep').modal('toggle');
	    },
	    sortByName: function(arg) {

	        $('#body').remove();
	        $('table').append('<tbody id="body"class="table-striped table-hover">')
	        dataMain.getDataByName(arg);
	        $('#exampleModalLong').modal('toggle');

	    }

	}
	//************************************ SERVER STACK ******************************************
	let getDataFromServerStack = {
	    getTimeData: function(arg) {
	        data.length = 0;


	        var xhttp = new XMLHttpRequest();
	        xhttp.onreadystatechange = function() {
	            if (this.readyState == 4 && this.status == 200) {

	                try {

	                    Array.from(JSON.parse(this.responseText)).map(v => (
	                        data.push(v)));


	                } catch (err) {
	                    console.log(err);
	                  $('#exampleModalLongTitle').text('Sorry No data recived from server!');
	                }

	            }
	        };

	        xhttp.open("GET", "app.php?q=2&time=" + arg);
	        xhttp.send();

	    },
	    getWorkersData: function() {
	        var xhttp = new XMLHttpRequest();
	        xhttp.onreadystatechange = function() {
	            if (this.readyState == 4 && this.status == 200) {
	                try {

	                    Array.from(JSON.parse(this.responseText)).map(v => (

	                        uNits.push(v)));
                        console.log("RECIVED WORKERS");
	                } catch (err) {
	                    console.log(err);
						$('#exampleModalLongTitle').text('Sorry No data recived from server!');
	                }

	            }
	        };
	        xhttp.open("GET", "app.php?time=5&q=1");
	        xhttp.send();

	    },
	    getArchiveData: function(arg) {

				$('#loadModalCenter').modal({
	    backdrop: 'static',
	    keyboard: false});

	        let month = dateStack.monthNames[arg - 1];
	        $('#dateNow').empty()
	        $('#dateNow').append(month)


	        dateStack._callBackDate = new Date(2018, arg - 1, 05);


	        $('#body').remove();
	        $('table').append('<tbody id="body"class="table-striped table-hover">');
	        getDataFromServerStack.getTimeData(arg)
	        $('#head').empty()
	        dataMain.renderMainTable();
	        $('#archive').modal('toggle');

	        setTimeout(run, 5000);



	    }
	}

 // uncoment this two 'start' functions
//setTimeout(getDataFromServerStack.getTimeData(dateStack._now.getMonth() + 1), 200); // run server request for now time *** data setTimeout need for recive Worker names first (for render data).

	//getDataFromServerStack.getWorkersData(); // run server request for time workers name



	//***************************************************************************************************

	function getUnitsArray() {
	    for (i = 0; i < uNits.length; i++) {
	        dataNames.push(uNits[i]['concat'])
	    }
	}
	setTimeout(getUnitsArray, 2500);



	// ************************************************************************
	//                               START FUNCTION
	//*************************************************************************
	function run() {
	    if (data.length === 1 && uNits.length === 1) { // check for ip error
	        $('#exampleModalLongTitle').text('Sorry Time sheet aviable only from Local IP');


	    } else {
	        dateStack.daysInThisMonth();
	        dataMain.renderDepartNames()

	        $.each(dataNames, function(index, value) {
	            dataMain.getDataByName(value);

	        });


	        dataNames.map(v => {
	            $("#darbList").append("<option>" + v + "</option>")
	        });




	      /*  setTimeout(function() {
	            $('#loadModalCenter').modal('hide');
	        }, 500); // LOADING - dialog */
	    }
	}
	setTimeout(run, 2500);


	//*****************************************RENDER TABLE/GET DATA**********************************************************

	let dataMain = {
	    renderTable: function(name) {
	        let dday = "dday";
	        let ddnight = "dnight";
	        let total = "total";
	        let day = "day";
	        let night = "night";
	        let allDayzz = dateStack.daysInMonth();

	        $("#body").append("<tr class=\"deleteElements\" style=\"border-top: 2px solid #d2d2d2;\" id=" + dday + name + "><th  scope=\"row\"  rowspan=\"2\"  >" + name + "</th><td>Day</td></tr><tr id=" + ddnight + name + "><td>Night</td></tr>");

	        for (i = 0; i < allDayzz.length; i++) {
	            let day2 = i < 9 ? "classDay0" + (i + 1) : "classDay" + (i + 1);
	            let night2 = i < 9 ? "classDay0" + (i + 1) : "classDay" + (i + 1);
	            $("#dday" + name).append("<td class=" + day2 + " id=" + day + name + allDayzz[i] + " ></td>");
	            $("#dnight" + name).append("<td class=" + night2 + " id=" + night + name + allDayzz[i] + "></td>");

	        }
	        $("#dday" + name).append("<td  id=" + total + day + name + "></td>");
	        $("#dnight" + name).append("<td id=" + total + night + name + "></td>");

	    },
	    //**************************************************************
	    insertData: function(start, arrLength, name) {
	        let run = start + arrLength;
	        let totalDay = 0;
	        let totalNight = 0;

	        function callBack(arg) { // this function check to not NULL
	            if (arg !== null) {
	                return arg
	            } else {
	                return "&nbsp;";
	            }

	        }

	        for (i = 0; i < data.length; i++) {

	            if (data[i]['concat'] == name) {
	                $("#day" + name + data[i]['work_day']).append("<span>" + data[i]['day_hours'] + "</span>");
	                $("#night" + name + data[i]['work_day']).append("<span>" + callBack(data[i]['night_hours']) + "</span>");
	                totalDay = totalDay + Number(data[i]['day_hours'])
	                totalNight = totalNight + Number(data[i]['night_hours'])

	            }
	        }


	        $("#totalday" + name).append("<span>" + this.round(totalDay, 2) + "</span>");
	        $("#totalnight" + name).append("<span>" + this.round(totalNight, 2) + "</span>");
            $('#loadModalCenter').modal('hide');

	    },
	    //**************************************************************
	    renderDepartNames: function() {
	        let unicDepNames = [];
	        let dataDep = [];

	        // function creates unic Array of departament names
	        for (i = 0; i < uNits.length; i++) {
	            dataDep.push(uNits[i]['departament'])
	        }

	        unicDepNames = [...new Set(dataDep)]; // get unic departaments name array
	        unicDepNames.map(v => {
	            $("#depList").append("<option>" + v + "</option>")
	        });

	        dataDep.length = 0

	    },
	    //******************************************************************
	    round: function(number, precision) {
	        var shift = function(number, precision, reverseShift) {
	            if (reverseShift) {
	                precision = -precision;
	            }
	            var numArray = ("" + number).split("e");
	            return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
	        };
	        return shift(Math.round(shift(number, precision, false)), precision, true);

	    },
	    renderMainTable: function() {

	        $("#head").append("<th scope=\"row\">Name Surname</th><th scope=\"row\">Shift</th>");
	        for (i = 1; i < dateStack.daysInThisMonth() + 1; i++) {
	            let idClass = i < 10 ? "classDay0" + i : "classDay" + i
	            $("#head").append("	<th class=" + idClass + " id=\"head" + i + "\" scope=\"col\">" + i + "</th>"); //  format - classDay30
	        }
	        $("#head").append("<th id=\"head" + i + "\" scope=\"col\">Total</th>"); //  total


	    },
	    //**************************************************************
	    getDataByName: function(name) {
	        let start = 0;
	        let status = false
	        let arrLength = 0;

	        for (i = 0; i < data.length; i++) {
	            if (data[i]['concat'] === name) {
	                if (status === false) {
	                    status = true
	                    start = i;
	                }

	                arrLength++
	            }

	        }

	        this.renderTable(name); // run generator table
	        this.insertData(start, arrLength, name) // add data to table
	        dateStack.renderWeekends()

	    },
	    renderMonthNames: function() {
	        let renderVar2 = dateStack.monthNames.map(function(num, index) {
	            $("#archiveList").append("<option value=" + (index + 1) + ">" + num + "</option>");
	        });


	    }

	}

	dataMain.renderMonthNames();
	dataMain.renderMainTable();
