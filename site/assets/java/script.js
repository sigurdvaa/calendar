$(document).ready(function() {

    getCalInfo();
    var myClock = setInterval(updateClock, 1000);

});

function updateClock() {

    var now = new Date();
        hours = now.getHours();
        mins = now.getMinutes();
        secs = now.getSeconds();
        date = now.getDate();
        now = null;    
  
    hours = hours < 10 ? '0' + hours : hours;
    mins = mins < 10 ? '0' + mins : mins;
    secs = secs < 10 ? '0' + secs : secs;
    
    newTime = hours + ":" + mins + ":" + secs;
    
    $('#today span#clock').html(newTime);
}

function getCalInfo(when) {
    //Current date-info
    var now = when == null ? new Date() : new Date(when),
        showToday = when == null ? true : false,
        year = now.getFullYear(),
        nrMonth = now.getMonth(),
        month = nameMonth(nrMonth),
        date = now.getDate(),
        nrDaysInMonth = daysInMonth(nrMonth, year),
        firstDayInMonth = firstDay(year, nrMonth),
        hours = now.getHours(),
        mins = now.getMinutes(),
        secs = now.getSeconds(),
        time = null,
        now = null,
        now = new Date(),
        showToday = now.getFullYear() == year && now.getMonth() == nrMonth ? true : false,
        now = null;
        
    if (showToday) {
        now = new Date();
        hours = now.getHours();
        mins = now.getMinutes();
        secs = now.getSeconds();
        date = now.getDate();
        now = null;
        myClock = setInterval(updateClock, 1000);
    };
    
  
    hours = hours < 10 ? '0' + hours : hours;
    mins = mins < 10 ? '0' + mins : mins;
    secs = secs < 10 ? '0' + secs : secs;
    
    time = "<span id='clock'>" + hours + ":" + mins + ":" + secs + "</span>";

    function nameMonth(nr){
        var names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Desember");
        return names[nr];
    }
    
    function isLeapYear(yr) {
        if (yr % 4 == 0){
            return true;
        }else{
            return false;
        }
    }
    
    function firstDay(yr, mo){
        var first = new Date(yr, mo, 1),
            first = first.getDay();
        return first;
    }
    
    function daysInMonth(mo, yr) {
        var nrDays = new Array(12);
        nrDays[0] = 31;
        nrDays[1] = isLeapYear(yr) ? 29 : 28;
        nrDays[2] = 31;
        nrDays[3] = 30;
        nrDays[4] = 31;
        nrDays[5] = 30;
        nrDays[6] = 31;
        nrDays[7] = 31;
        nrDays[8] = 30;
        nrDays[9] = 31;
        nrDays[10] = 30;
        nrDays[11] = 31;
        return nrDays[mo];
    }
    
    var listForMonth;
   
    buildSpecialDaysLists();
  
    function buildSpecialDaysLists() {
                 
        listForMonth = new Array(12);
            listForMonth[0] = [1];
            listForMonth[1] = [];
            listForMonth[2] = [];
            listForMonth[3] = [];
            listForMonth[4] = [1, 17];
            listForMonth[5] = [];
            listForMonth[6] = [];
            listForMonth[7] = [];
            listForMonth[8] = [];
            listForMonth[9] = [];
            listForMonth[10] = [];
            listForMonth[11] = [25, 26];
    
        var easter = easterSunday(year),
            easterDate = easter[0],
            easterMonth = easter[1]-1,
            easterDates = new Array(easterDate, easterDate +4, easterDate +5, easterDate +7, easterDate +8);
        
        var forwardByDays,
            currentMonth;
        
        for(s=0;s<5;s++){
            if (easterDates[s]>31) {
                listForMonth[easterMonth+1].push(easterDates[s]-31);
                if (s==3) {
                    forwardByDays = easterDates[s]-31;
                    currentMonth = easterMonth+1;
                };
            }else{
                listForMonth[easterMonth].push(easterDates[s]);
                if (s==3) {
                    forwardByDays = easterDates[s];
                    currentMonth = easterMonth;
                };
            };
        };
        
        for(s=0;s<49;s++) {
            forwardByDays += 1;
            if (forwardByDays > daysInMonth(currentMonth, year)) {
                forwardByDays = 1;
                currentMonth += 1;
            };
            if (s==38) {
                listForMonth[currentMonth].push(forwardByDays);
            }
        };

        listForMonth[currentMonth].push(forwardByDays);
        
        if ((forwardByDays+1) > daysInMonth(currentMonth, year)) {
            listForMonth[currentMonth+1].push(1);
        }else{
            listForMonth[currentMonth].push(forwardByDays+1);
        };
    }
    
    function isSpecial(checkDate, whatMonth) {
        
        if (listForMonth[whatMonth].indexOf(checkDate) > -1) {
            return true;
        }else{
            return false;
        }
        
    }

    function easterSunday (InputYear) {
        var a = InputYear % 19;
        var b = Math.floor(InputYear/100);
        var c = InputYear % 100;
        var d = Math.floor(b/4);
        var e = b % 4;
        var f = Math.floor((b+8)/25);   
        var g = Math.floor((b-f+1)/3);
        var h = (19*a+b-d-g+15) % 30;      
        var i = Math.floor(c/4);
        var k = c % 4;
        var l = (32 + 2*e + 2* i - h - k) % 7;
        var m = Math.floor((a+11*h+22*l)/451);
        var n = Math.floor((h+l-7*m+114)/31);
        var p = (h+l-7*m+114) % 31;
        p++;
        var t = p - 7;
        
        if (t < 1) {
            n--;
            p = 31 + t;
        }else{
            p -= 7;
        }
        
        var svar = new Array(p, n);

        return svar;
    }

    createCal();
    
function createCal(){

        var output = "<table><tr><th tabindex='0' class='calbtn' id='minusmonth'>-</th><th id='currentmonth' colspan='2'>"+month+"<th tabindex='0' class='calbtn' id='plusmonth'>+</th><th tabindex='0' class='calbtn' id='minusyear'>-</th><th id='currentyear'>"+year+"</th><th tabindex='0' class='calbtn' id='plusyear'>+</th></tr><tr><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td><td>Sun</td></tr>",
            amountWeeks = howManyWeeks(firstDayInMonth, nrDaysInMonth),
            currentDate = 1;

        for (nrWeek = 0; nrWeek < amountWeeks; nrWeek++){
            output = output + "<tr>" + addWeek(nrWeek, firstDayInMonth) + "</tr>";
        }

        output = output + "</table>";
        $('.calendarwrap').html(output);
        calButtons();

    function addWeek(week, startDay){

        var temp = "",
            start = 0 + (7*week),
            end = start + 7;
        if (startDay == 0){
            startDay = 7;
        }
        for(i=start;i<end;i++) {
            if(currentDate > nrDaysInMonth) {
                temp = temp + "<td class='noborder'></td>";
            }else if(i >= startDay-1){
                 if (currentDate == date && showToday){
                    if (i==end-1 || isSpecial(currentDate, nrMonth)) {
                        if (isSpecial(currentDate, nrMonth)) {
                            temp = temp + '<td class="special" ';
                        }else{
                            temp = temp + '<td class="sunday" ';
                        };
                    }else{
                        temp = temp + '<td ';
                    }
                    temp = temp + 'tabindex="0" id="today">' + currentDate + time + '</td>';
                    currentDate++;
                }else{
                    if (i==end-1 || isSpecial(currentDate, nrMonth)) {
                        if (isSpecial(currentDate, nrMonth)) {
                            temp = temp + "<td class='special' ";
                        }else{
                            temp = temp + "<td class='sunday' ";
                        };                        
                    }else{
                        temp = temp + "<td ";
                    }
                    temp = temp + "tabindex='0'>" + currentDate + "</td>";
                        currentDate++;
                }
            }else{
                temp = temp + "<td class='noborder'></td>";
            };
        }
        return temp;
    }
    
        function howManyWeeks(firstDay, daysInMonth){
        
            if (firstDay == 6) {
                if (daysInMonth == 31) {
                    return 6;
                }
            }else if (firstDay == 0) {
                if (daysInMonth > 29) {
                    return 6;
                }
            }else if (firstDay == 1) {
                if (daysInMonth == 28) {
                    return 4;
                }
            }
            return 5;
        }
        
        var weekNrArrayForMonth = new Array(12);
        buildWeekNr();
        
        addWeekNr();
    
        function addWeekNr() {
            
            var trs = $('table tr');
            
            for(i=2;i<howManyWeeks(firstDayInMonth, nrDaysInMonth)+2;i++){
                var temp = trs[i].childNodes[0].innerHTML;
                temp = "<span class='weeknr'>" + weekNrArrayForMonth[nrMonth][i-2] + "</span>" + temp;
                trs[i].childNodes[0].innerHTML = temp;                
            };
        }
        
        function buildWeekNr(mo){
            
            var firstJanDayNr = new Date(year, 0, 1).getDay(),
                firstWeekNrOfYear = null,
                lastDesDayNr = new Date(year, 11, 31).getDay(),
                lastWeekNrOfYear = null;
            
            if (firstJanDayNr == 6){
                firstWeekNrOfYear = isLeapYear(year-1) ? 53 : 52;
            } else if (firstJanDayNr == 0) {
                firstWeekNrOfYear = 52;
            } else if (firstJanDayNr == 5) {
                firstWeekNrOfYear = 53;
            } else {
                firstWeekNrOfYear = 1;
            };
            
            if (lastDesDayNr == 4) {
                lastWeekNrOfYear = 53;
            } else if (lastDesDayNr == 5) {
                lastWeekNrOfYear = isLeapYear(year) ? 53 : 52;
            } else if (lastDesDayNr > 0 && lastDesDayNr < 4) {
                lastWeekNrOfYear = 1;
            } else {
                lastWeekNrOfYear = 52;    
            };
            
            w = firstWeekNrOfYear;
            
            for (m=0;m<12;m++) {

                var firstDay = new Date(year, m, 1).getDay(),
                    numberOfDays = daysInMonth(m, year),
                    lastDay = new Date(year, m, numberOfDays).getDay(),
                    end = howManyWeeks(firstDay, numberOfDays);
                    
                weekNrArrayForMonth[m] = new Array();

                for(i=0;i<end;i++){

                    weekNrArrayForMonth[m].push(w);
                    
                    if (m < 11) {
                        if (w == 52 || w == 53) {
                            w = 1;
                        } else {
                            w++;
                        };
                    } else {
                        if (i == end - 2) {
                            w = lastWeekNrOfYear;
                        } else {
                            w++;
                        }
                    }
                };
                            
                if (lastDay != 0) {
                    w--;
                };
                
            };
            
        }    
    }   
}

function calButtons() {
    
    $('.calbtn').on('click', function(){
        
        clearInterval(myClock);
        
        var yr = parseInt($('#currentyear').text()),
            month = ($('#currentmonth').text()),
            output = null;

            month = parseInt(monthNr(month)+1);

        if ($(this).is('#minusmonth')){
            if (month==1) {
                month = 12;
                yr -= 1;
            }else{
                month -= 1;
            }
        }else if ($(this).is('#plusmonth')){
            if (month==12) {
                month = 1;
                yr += 1;
            }else{
                month += 1;
            }
        }else if ($(this).is('#minusyear')){
            yr -= 1;
        }else if ($(this).is('#plusyear')) {
            yr += 1;
        }
        output = yr + ", " + month + ", 1";

        getCalInfo(output);
    });
    
    function monthNr(name){

        var names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Desember");

    return names.indexOf(name);
    }
}