const days = document.getElementById("days")
const hours = document.getElementById("hours")
const mins = document.getElementById("mins")
const secs = document.getElementById("secs")
const cal = document.getElementById("calendar")
const time=document.getElementById("time")
const body = document.getElementById("main")
let header=document.getElementById("header")
let date=new Date()
let todayms = date.getTime()
let targetDate = new Date()
let localData;
let localHeader;
body.addEventListener("click",function(){
    //console.log("body clicked")
    window.localStorage.setItem("localHeader",header.innerText);
    if(header.innerText==""){
        header.innerText="[Click here to edit the title]"
    }
})
header.addEventListener("click",function(){
    //console.log("header clicked")
    if(header.innerText=="[Click here to edit the title]"){
        header.innerText=""
    }
})
//Set Minimum Value of Datepicker
let dd=String(date.getDate())
let mm=String(date.getMonth()+1)
let yyyy=String(date.getFullYear())
if(dd.length==1){
    dd="0"+String(dd)
}
if(mm.length==1){
    dd="0"+String(dd)
}
let todayISO=yyyy+"-"+mm+"-"+dd
cal.min=todayISO

//Listen for changes in inputs
function setTarget(targetDate,targetTime){
    clearInterval(loop)
    //console.log(targetDate,targetTime)
    let year = parseInt(targetDate.slice(0,4))
    let month = parseInt(targetDate.slice(5,7))-1
    let day = parseInt(targetDate.slice(8))
    let hour = parseInt(targetTime.slice(0,2))
    let minute = parseInt(targetTime.slice(3,5))
    let newTarget = new Date(year,month,day,hour,minute)
    window.localStorage.setItem("localData",JSON.stringify(newTarget));
    //console.log(date,newTarget)
    main(newTarget)
}
cal.addEventListener('change',function(){
    if(time.value!=""){
        setTarget(cal.value,time.value)
    }
})
time.addEventListener('change',function(){
    if(cal.value){
        setTarget(cal.value,time.value)
    }
})

//Start main countdown
let seconds=0;
let loop;
function main(targetDate){
    let now = new Date()
    let nowMilisec= now.getTime()
    let thenMillisec=targetDate.getTime()
    seconds=Math.floor((thenMillisec-nowMilisec)/1000)
    loop = setInterval(mainLoop, 1000);
    
}

function mainLoop(){
    countdown=seconds
    let min=60
    let hour = min*60
    let day = hour*24
    let numDays = Math.floor(countdown/day)
    countdown=countdown-numDays*day
    let numHours = Math.floor(countdown/hour)
    countdown=countdown-numHours*hour
    let numMin = Math.floor(countdown/min)
    countdown=countdown-numMin*min
    days.innerText=numDays
    hours.innerText=numHours
    mins.innerText=numMin
    secs.innerText=countdown
    seconds=seconds-1
}

document.addEventListener("DOMContentLoaded",function(){
    localData=JSON.parse(window.localStorage.getItem("localData"))
    console.log(localData)
    if(localData){
        let tempDate = localData.slice(0,10)
        let tempTime = localData.slice(11,16)
        setTarget(tempDate,tempTime)
    }
    localHeader=window.localStorage.getItem("localHeader")
    header.innerText=localHeader
    
})

(window.myTop || window).noPromptOnUnload = true
////main countdown
// setInterval(function(){
//     date=new Date()
//     hours.innerText=date.getHours()<10?"0"+String(date.getHours()):String(date.getHours())
//     mins.innerText=date.getMinutes()<10?"0"+String(date.getMinutes()):String(date.getMinutes())
//     secs.innerText=date.getSeconds()<10?"0"+String(date.getSeconds()):String(date.getSeconds())
// }, 1000);