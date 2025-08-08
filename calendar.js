let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let startDate = new Date(year, month, 1);
let startDay = startDate.getDay();
let lastDay;
let dayNum = 1 - startDay;
let calendar = document.getElementById("calendar");
let title = document.getElementById("title");
let body = document.getElementById("body");
title.innerText = (month + 1) + "月　カレンダー";
body.setAttribute("background", "./backs/back-" + year + "-" + month + ".png"

if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11){
    lastDay = 31;
} else if(month == 3 || month == 5 || month == 8 || month == 10){
    lastDay = 30;
} else if(month == 1){
    if(year % 4 == 0){
        lastDay = 29;
    } else {
        lastDay = 28;
    }
}

let weekNum = Math.ceil((startDay + lastDay) / 7);
let dayText = new Array(weekNum * 7);
let imageData = new Array(weekNum * 7);
let dayImage = new Array(weekNum * 7);
let weekImage = new Array(weekNum);

for(let i = 0; i < weekNum; i++){
    weekImage[i] = document.createElement("tr");
    weekImage[i].setAttribute("class", "weekImage");
    let weekText = document.createElement("tr");
    weekText.setAttribute("class", "weekText");
    for(let j = 0; j < 7; j++){
        dayImage[i * 7 + j] = document.createElement("td");
        dayImage[i * 7 + j].setAttribute("align", "left");
        dayImage[i * 7 + j].setAttribute("valign", "top");
        dayImage[i * 7 + j].setAttribute("class", "dayImage");
        if(dayNum > 0 && dayNum <= lastDay){
            let date = document.createElement("p");
            date.setAttribute("class", "date");
            date.innerText = dayNum;
            dayImage[i * 7 + j].appendChild(date);
        }
        weekImage[i].appendChild(dayImage[i * 7 + j]);
        dayNum = dayNum + 1;
        dayText[i * 7 + j] = document.createElement("td");
        dayText[i * 7 + j].setAttribute("class", "dayText");
        weekText.appendChild(dayText[i * 7 + j]);
    }
    calendar.appendChild(weekImage[i]);
    calendar.appendChild(weekText);
}

fetch("./datas/" + year + "-" + (month + 1) + ".txt").then((res) => {
    return res.text()
}).then((resText) => {
    let dataList = resText.split("\n");
    for(let i = 0; i < weekNum * 7; i++){
        if(dataList[i * 2].trim() != ""){
            imageData[i] = document.createElement("img");
            imageData[i].setAttribute("alt", "");
            imageData[i].setAttribute("class", "imageData");
            imageData[i].setAttribute("src", "./images/" + dataList[i * 2]);
            dayImage[i].appendChild(imageData[i]);
        }
        dayText[i].innerText = dataList[i * 2 + 1];
    }
});


