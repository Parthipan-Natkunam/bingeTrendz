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
    minute = ""+minute;
    if(minute.length === 1) minute = "0"+minute;
    return hour + ":" + minute + " " + tailStr;
}

function setBackdropImg(imgList){
    var backdropDOM = document.getElementById('full-cover__img'),
        backdropImg = selectImage(imgList);
        fullImgURI = tmdb.images_uri+'/w500/'+backdropImg;
    backdropDOM.src = fullImgURI;
}

function selectImage(imageList){
    if(imageList.length){
        var index = Math.floor(Math.random() * (imageList.length));
        return imageList[index]; 
    }
    return "";
}

function testTMDBCall(){
    tmdb.call('/trending',{'media_type':'tv','time_window':'day'},
    function(data){
        var imgList = data.results.map(function(result){return result.poster_path});
        setBackdropImg(imgList);
    },
    function(e){
        console.log(e);
    });
}

(function() {
	window.tmdb = {
		"api_key": "25a75c01db2880fe53666785fe0ed4d6",
		"base_uri": "http://api.themoviedb.org/3",
		"images_uri": "http://image.tmdb.org/t/p",
		"timeout": 5000,
		call: function(url, params, success, error){
			var params_str = "";
			for (var key in params) {
				if (params.hasOwnProperty(key)) {
                    params_str+="/"+encodeURIComponent(params[key]);
				}
            }
            params_str +="?api_key="+tmdb.api_key;
			var xhr = new XMLHttpRequest();
			xhr.timeout = tmdb.timeout;
			xhr.ontimeout = function () {
				throw("Request timed out: " + url +" "+ params_str);
			};
			xhr.open("GET", tmdb.base_uri + url + params_str, true);
			xhr.setRequestHeader('Accept', 'application/json');
			xhr.responseType = "text";
			xhr.onreadystatechange = function () {
				if (this.readyState === 4) {
					if (this.status === 200){
						if (typeof success == "function") {
							success(JSON.parse(this.response));	
						}else{
							throw('No success callback, but the request gave results')
						}
					}else{
						if (typeof error == "function") {
							error(JSON.parse(this.response));
						}else{
							throw('No error callback')
						}
					}
				}
			};
			xhr.send();
		}
	}
})();

(function initApp(){
    setDateTime();
    testTMDBCall();
})();
