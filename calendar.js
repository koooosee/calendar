let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let startDate = new Date(year, month, 1);
let startDay = startDate.getDay();
let lastDay;
let dayNum = 1 - startDay;
let calendar = document.getElementById("calendar");

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

for(let i = 0; i < weekNum; i++){
    let weekImage = document.createElement("tr");
    weekImage.setAttribute("class", "weekImage");
    let weekText = document.createElement("tr");
    weekText.setAttribute("class", "weekText");
    for(let j = 0; j < 7; j++){
        let dayImage = document.createElement("td");
        dayImage.setAttribute("align", "left");
        dayImage.setAttribute("valign", "top");
        dayImage.setAttribute("class", "dayImage");
        if(dayNum > 0 && dayNum <= lastDay){
            dayImage.innerText = dayNum;
        }
        imageData[i * 7 + j] = document.createElement("img");
        imageData[i * 7 + j].setAttribute("alt", "");
        imageData[i * 7 + j].setAttribute("class", "imageData");
        dayImage.appendChild(imageData[i * 7 + j]);
        weekImage.appendChild(dayImage);
        dayNum = dayNum + 1;
        dayText[i * 7 + j] = document.createElement("td");
        dayText[i * 7 + j].setAttribute("class", "dayText");
        weekText.appendChild(dayText[i * 7 + j]);
    }
    calendar.appendChild(weekImage);
    calendar.appendChild(weekText);
}

fetch("./datas/" + year + "-" + (month + 1) + ".txt").then((res) => {
    return res.text()
}).then((resText) => {
    let dataList = resText?.split("\n");
    for(let i = 0; i < weekNum * 7; i++){
        imageData[i]?.setAttribute("src", "./images/" + dataList[i * 2]);
        dayText[i]?.innerText = dataList[i * 2 + 1]?;
    }
});
