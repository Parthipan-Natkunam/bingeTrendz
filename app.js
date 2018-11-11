(function initApp(){
    setDateTime();
})();
function setDateTime(){
    var dateCardDOM = document.getElementById('date-card__date'),
        timeCardDOM = document.getElementById('date-card__time'),
        dateObj = new Date();
    var date = dateObj.getDate(),
        month = dateObj.getMonth(),
        year = dateObj.getFullYear(),
        formattedDtString = formatDateString(date,month,year);
    var hour = dateObj.getHours(),
        minute = dateObj.getMinutes(),
        formattedTmString = formatTimeString(hour,minute);
    dateCardDOM.innerText = formattedDtString;
    timeCardDOM.innerText = formattedTmString;     
}
function formatDateString(date,month,year){
    var formattedResult = "";
    var monthShortNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var yearElements = void 0;
    var shortYear = void 0;
    date = ""+date;
    if(date.length === 1) date = "0"+date;
    month = monthShortNames[month];
    yearElements = (""+year).split('');
    shortYear = yearElements[2]+yearElements[3];
    formattedResult = date + " " + month + " "+ shortYear;
    return formattedResult;
}
function formatTimeString(hour,minute){
    var tailStr = "AM";
    if(hour > 12){
        tailStr = "PM";
        hour -= 12;
    }
    hour = ""+hour;
    return hour + ":" + minute + " " + tailStr;
}

