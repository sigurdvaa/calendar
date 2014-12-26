$(document).ready(function() {

    getCalInfo();
    calButtons();
    
});

function getCalInfo(when) {
    //Current date-info
    var now = when == null ? new Date() : new Date(when),
        year = now.getFullYear(),
        nrMonth = now.getMonth(),
        month = nameMonth(nrMonth),
        date = now.getDate(),
        nrDay = now.getDay(),
        nrDaysInMonth = daysInMonth(nrMonth, year),
        firstDayInMonth = firstDay(year, nrMonth),
        hours = now.getHours(),
        mins = now.getMinutes(),
        secs = now.getSeconds(),
        time = null,
        now = null;
        
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

    createCal();
    
function createCal(){
    //header and days
        var output = "<table><tr><th tabindex='0' class='calbtn' id='minusmonth'>-</th><th id='currentmonth' colspan='2'>"+month+"<th tabindex='0' class='calbtn' id='plusmonth'>+</th><th tabindex='0' class='calbtn' id='minusyear'>-</th><th id='currentyear'>"+year+"</th><th tabindex='0' class='calbtn' id='plusyear'>+</th></tr><tr><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td><td>Sun</td></tr>",
            amountWeeks = howManyWeeks(),
            currentDate = 1;
    //add week
        for (nrWeek = 0; nrWeek < amountWeeks; nrWeek++){
            output = output + "<tr>" + addWeek(nrWeek, firstDayInMonth) + "</tr>";
        }

    //End tags
        output = output + "</table>";
        $('.calendarwrap').html(output);
    //builds a week with html tags and info
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
                 if (currentDate == date){
                    temp = temp + '<td tabindex="0" id="today">' + currentDate + time + '</td>';
                    currentDate++;
                }else{
                    temp = temp + "<td tabindex='0'>" + currentDate + "</td>";
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
        calButtons();
    });
    
    function monthNr(name){

        var names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Desember");

    return names.indexOf(name);
    }
}