$(document).ready(function() {

    getCalInfo();
    var myClock = myClock = setInterval(updateClock, 1000);

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
    
    $('#today span').html(newTime);
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
    
    time = "<span>" + hours + ":" + mins + ":" + secs + "</span>";
        
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
            listForMonth[0] = new Array(1);
            listForMonth[1] = new Array();
            listForMonth[2] = new Array(29);
            listForMonth[3] = new Array();
            listForMonth[4] = new Array(1, 17);
            listForMonth[5] = new Array();
            listForMonth[6] = new Array();
            listForMonth[7] = new Array();
            listForMonth[8] = new Array();
            listForMonth[9] = new Array();
            listForMonth[10] = new Array();
            listForMonth[11] = new Array(25, 26, 31);
    
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
            amountWeeks = howManyWeeks(),
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
    
    function howManyWeeks(){
        
            if (firstDayInMonth == 6) {
                if (nrDaysInMonth == 31) {
                    return 6;
                }
            }else if (firstDayInMonth == 0) {
                if (nrDaysInMonth > 29) {
                    return 6;
                }
            }else if (firstDayInMonth == 1) {
                if (nrDaysInMonth == 28) {
                    return 4;
                }
            }
            return 5;
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