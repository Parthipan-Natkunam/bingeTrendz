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
    }else if(hour === 0){
        hour = 12;
        tailStr = "AM";
    }
    hour = ""+hour;
    minute = ""+minute;
    if(minute.length === 1) minute = "0"+minute;
    return hour + ":" + minute + " " + tailStr;
}

function setBackdropImg(imgList){
    var backdropDOM = document.getElementById('full-cover__img'),
        loaderDOM = document.getElementById('load_spinner'),
        backdropImg = selectImage(imgList);
        fullImgURI = tmdb.images_uri+'/w500/'+backdropImg;
    backdropDOM.src = fullImgURI;
    loaderDOM.style.display = "none";
    backdropDOM.style.display = "inline";
}

function selectImage(imageList){
    if(imageList.length){
        var index = Math.floor(Math.random() * (imageList.length));
        return imageList[index]; 
    }
    return "";
}

function testTMDBCall(){
    var loaderDOM = document.getElementById('load_spinner'),
    imgList;
    loaderDOM.style.display = "block";
    
    /*data = {
        results:[
            {
                "original_name":"Titans",
                "id":75450,"name":"Titans",
                "vote_count":24,"vote_average":6.4,
                "first_air_date":"2018-10-12",
                "poster_path":"/oCK6fykCZUQjTJG4IDhfWCxcXqG.jpg",
                "genre_ids":[10759,10765],
                "original_language":"en",
                "backdrop_path":"/9foO1E8sliKN2dvtMOEwwQgynlW.jpg",
                "overview":"A team of young superheroes led by Nightwing (formerly Batman's first Robin) form to combat evil and other perils.",
                "origin_country":["US"],
                "popularity":42.771
            },
            {
                "original_name":"Legacies",
                "id":79460,"name":"Legacies",
                "vote_count":17,
                "vote_average":5.8,
                "first_air_date":"2018-10-25",
                "poster_path":"/pwvKOtTpbMacI463EDfyKtfn4Kd.jpg",
                "genre_ids":[18,10765],
                "original_language":"en",
                "backdrop_path":"/tIYb76SgqjUJ6XLFwBrk4gvGNtn.jpg",
                "overview":"In a place where young witches, vampires, and werewolves are nurtured to be their best selves in spite of their worst impulses, Klaus Mikaelson’s daughter, 17-year-old Hope Mikaelson, Alaric Saltzman’s twins, Lizzie and Josie Saltzman, among others, come of age into heroes and villains at The Salvatore School for the Young and Gifted.",
                "origin_country":["US"],
                "popularity":37.498
            }
        ]
    }
    imgList = data.results.map(function(result){return result.backdrop_path});
    setBackdropImg(imgList);
    generateTemplate(data.results);*/

    tmdb.call('/trending',{'media_type':'tv','time_window':'day'},
    function(data){
        imgList = data.results.map(function(result){return result.backdrop_path});
        setBackdropImg(imgList);
        generateTemplate(data.results);
    },
    function(e){
        ShowNotification({type:'info',message:'Something went wrong. Please try again later.'});
    });
}

(function() {
	window.tmdb = {
		"api_key": "47729872a52678aftb63789",
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
    document.getElementById('list__fab').addEventListener('click',function(){
        var listDOM = document.getElementById('series-list');
        if(listDOM.style.display === "none" || listDOM.style.display === ""){
            listDOM.style.display = "inline-block";
        }else{
            listDOM.style.display = "none";
        }
    });
    setInterval(setDateTime,60000);
})();

function generateTemplate(resultList){
    var tplString = "";
    resultList.forEach(function(data,index){
        tplString += `<div class="series-list__card">
                        <span class="trend-rank">${index+1}</span>
                        <img src="http://image.tmdb.org/t/p/w200/${data.poster_path}"/>
                        <h3 class="series-name">${data.name}</h3>
                        <p title="${data.overview}" class="series-overview">${data.overview}</p>
                        <p class="series-lang">Original Language: <span>${data.original_language}</span></p>
                    </div>`;
    });
    var listDOM = document.getElementById('series-list');
    listDOM.innerHTML = tplString;
}

function ShowNotification(opts){
    var notificationTplStr = `<div class="notification ${opts.type}">
                             <p>${opts.message}</p>
                           </div>`;
    var mainContainer = document.getElementsByClassName('full-cover__conatiner')[0];
    var notificationDOM = generateDOMElement(notificationTplStr);
    var refDOM = document.getElementsByClassName('date-card')[0];
    mainContainer.insertBefore(notificationDOM,refDOM);
}

function generateDOMElement(tplStr){
    var tempDom = document.createElement('div');
    tempDom.innerHTML = tplStr.trim();
    return tempDom.firstElementChild;
}
