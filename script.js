"use strict";

let month_year = document.getElementById('month-year');
let arrow_left = document.getElementById('arrow-left');
let arrow_right = document.getElementById('arrow-right');
let this_month = document.getElementById('this-month');

let modal_form = document.getElementById('modal-f');

let reloadInfo = document.getElementById('reloadInfo');

let modal_event ;
let modal_date ;
let modal_people ;
let modal_preview ;

let CalendarDate = moment();
let RealDate = moment();
let LocaleDate;
let result = 1;
let weekDay;
let weekMonth;
let monthDays = [];
let ThisDays = [];
let viewNum = 0;
let index;
let userDate = [];
let userEvent = [];
let userDays = [];
let userPeoples = [];
let userPreview = [];

let viewDays = [];

LocaleDate = RealDate;
monthTranslate();
month_year.innerHTML = "";
month_year.insertAdjacentHTML('beforeend',`${weekMonth} ${RealDate.format('YYYY')}`);
setThisMonth();

arrow_left.addEventListener('click', monthMinus);
arrow_right.addEventListener('click', monthPlus);
this_month.addEventListener('click',thisMonth);
reloadInfo.addEventListener('click',function(){
   location.reload(); 
});

document.getElementsByClassName('calendar-block--content-date')[0].addEventListener('click',
    function(event){
    index = [].slice.call(this.children).indexOf(event.target);
    
    for(let n = 0;n<366;n++){
        if(n<365){
            if(ThisDays[index] == userDate[n]){
                if(userEvent[n] == 0 || userEvent[n] == undefined){
                    document.getElementById('modal-event--outer').innerHTML = `<br/><input type="text" placeholder="Событие" id="modal-event">`;
                }
                else{
                    document.getElementById('modal-event--outer').innerHTML = `<br/><div class="infoBlock"> <h3>${userEvent[n]}<h3> </div>`;
                }
                if(userDays[n] == 0 || userDays[n] == undefined){
                    document.getElementById('modal-date--outer').innerHTML = `<br/><input type="text" placeholder="День,месяц,год" id="modal-date">`;
                }
                else{
                    document.getElementById('modal-date--outer').innerHTML = `<br/><div class="infoBlock"> <h3>${userDays[n]}<h3> </div>`;
                }
                if(userPeoples[n] == 0 || userPeoples[n] == undefined){
                    document.getElementById('modal-people--outer').innerHTML = `<br/><input type="text" placeholder="Имена участников" id="modal-people">`;  
                }
                else{
                    document.getElementById('modal-people--outer').innerHTML = `<br/><div class="infoBlock">     <h3>${userPeoples[n]}<h3> </div>`;
                }
                if(userPreview[n] == 0 || userPreview[n] == undefined){
                    document.getElementById('modal-preview--outer').innerHTML = `<br/><textarea id="modal-preview" cols="30" rows="10" placeholder="Описание"></textarea>`;
                }
                else{
                    document.getElementById('modal-preview--outer').innerHTML = `<br/><div class="infoBlock">    <h3>${userPreview[n]}<h3> </div>`;
                }
                document.getElementById('modal-add').disabled = true;
                break;
            }
        }
        else{
            modal_form.innerHTML = `<span id="modal-close">x</span>
                <div id="modal-event--outer"><input type="text" placeholder="Событие" id="modal-event"></div>
                <div id="modal-date--outer"><input type="text" placeholder="День,месяц,год" id="modal-date"></div>
                <div id="modal-people--outer"><input type="text" placeholder="Имена участников" id="modal-people"></div>
                <div id="modal-preview--outer"><textarea id="modal-preview" cols="30" rows="10" placeholder="Описание"></textarea></div>
                <div class="modal-form--button">
                    <button id="modal-add">Готово</button>
                    <button id="modal-delete">Удалить</button>
                </div>`;
        }
    }
    
    modal_event = document.getElementById('modal-event');
    modal_date = document.getElementById('modal-date');
    modal_people = document.getElementById('modal-people');
    modal_preview = document.getElementById('modal-preview');
    
    let modal_close = document.getElementById('modal-close');
    let modal_add = document.getElementById('modal-add');
    let modal_delete = document.getElementById('modal-delete');
    
    modal_close.addEventListener('click',modalClose);
    modal_add.addEventListener('click',viewGet);
    modal_delete.addEventListener('click',modalDelete);
    
    function modalDelete(){
        let i;
        for(i in userDate){
            if(userDate[i]==ThisDays[index]){
                document.getElementsByClassName('cube-info')[index].innerHTML = " ";
            }
        }
        
    }
    
    function modalClose(){
        modal_form.innerHTML = `<span id="modal-close">x</span>
                <div id="modal-event--outer"><input type="text" placeholder="Событие" id="modal-event"></div>
                <div id="modal-date--outer"><input type="text" placeholder="День,месяц,год" id="modal-date"></div>
                <div id="modal-people--outer"><input type="text" placeholder="Имена участников" id="modal-people"></div>
                <div id="modal-preview--outer"><textarea name="modal-preview" id="modal-preview" cols="30" rows="10" placeholder="Описание"></textarea></div>
                <div class="modal-form--button">
                    <button id="modal-add">Готово</button>
                    <button id="modal-delete">Удалить</button>
                </div>`;
        document.getElementsByClassName('modal-form')[0].style.display="none";
    }

    let clientWidth,clientHeight=0;
    
        clientHeight = event.screenY - (event.offsetY +100) ;
        clientWidth = event.screenX - event.offsetX + 135;
    
        document.getElementsByClassName('modal-form')[0].style.display="block";
        document.getElementsByClassName('modal-form')[0].style.position="absolute";
        document.getElementsByClassName('modal-form')[0].style.top=clientHeight+"px";
        document.getElementsByClassName('modal-form')[0].style.left=clientWidth+"px";
        document.getElementsByClassName('modal-form')[0].style.zIndex = 10;
});

function dayTranslate(){
    switch(LocaleDate.format('dddd')){
        case 'Monday':
            weekDay = "Понедельник";
            break;
        case 'Tuesday':
            weekDay = "Вторник";
            break;
        case 'Wednesday':
            weekDay = "Среда";
            break;
        case 'Thursday':
            weekDay = "Четверг";
            break;
        case 'Friday':
            weekDay = "Пятница";
            break;
        case 'Saturday':
            weekDay = "Суббота";
            break;
        case 'Sunday':
            weekDay = "Воскресенье";
            break;
    }
}

function monthTranslate(){
    switch(LocaleDate.format('MMMM')){
        case 'January':
            weekMonth = "Январь";
            break;
        case 'February':
            weekMonth = "Февраль";
            break;
        case 'March':
            weekMonth = "Март";
            break;
        case 'April':
            weekMonth = "Апрель";
            break;
        case 'May':
            weekMonth = "Май";
            break;
        case 'June':
            weekMonth = "Июнь";
            break;
        case 'July':
            weekMonth = "Июль";
            break;
        case 'August':
            weekMonth = "Август";
            break;
        case 'September':
            weekMonth = "Сентябрь";
            break;
        case 'October':
            weekMonth = "Октябрь";
            break;
        case 'November':
            weekMonth = "Ноябрь";
            break;
        case 'December':
            weekMonth = "Декабрь";
            break;
    }
}

function monthMinus(){
    CalendarDate.add(-1,'month');
    monthTranslate();
    month_year.innerHTML = "";
    month_year.insertAdjacentHTML('beforeend',`${weekMonth} ${CalendarDate.format('YYYY')}`);
    result = 0;
    setMonth();
    getMonth();
}

function monthPlus(){
    CalendarDate.add(1,'month');
    monthTranslate();
    month_year.innerHTML = "";
    month_year.insertAdjacentHTML('beforeend',`${weekMonth} ${CalendarDate.format('YYYY')}`);
    result = 0;
    setMonth();
    getMonth();
}

function thisMonth(){
    CalendarDate = moment();
    LocaleDate = RealDate;
    monthTranslate();
    month_year.innerHTML = "";
    month_year.insertAdjacentHTML('beforeend',`${weekMonth} ${RealDate.format('YYYY')}`);
    result=1;
    setThisMonth();

}

function setThisMonth(){
    
    LocaleDate = CalendarDate;
    
    while(LocaleDate.format('D')>1){
            LocaleDate.add(-1,'days');
    }
    switch(LocaleDate.format('dddd')){
        case 'Tuesday':
            LocaleDate.add(-1,'days');
            break;
        case 'Wednesday':
            LocaleDate.add(-2,'days');
            break;
        case 'Thursday':
            LocaleDate.add(-3,'days');
            break;
        case 'Friday':
            LocaleDate.add(-4,'days');
            break;
        case 'Saturday':
            LocaleDate.add(-5,'days');
            break;
    }
    
    document.getElementsByClassName('calendar-block--content-date')[0].innerHTML="";
    if(LocaleDate.format('D')==1 && LocaleDate.format('dddd')=='Sunday'){
        LocaleDate.add(-6, 'days');
    }
    getProcess(); 
}

function setMonth(){
    if(result == 1){
        LocaleDate = RealDate;
    }
    else{
        LocaleDate = CalendarDate;
    }
    while(LocaleDate.format('D')>1){
        LocaleDate.add(-1,'days');
    }
    switch(LocaleDate.format('dddd')){
        case 'Tuesday':
            LocaleDate.add(-1,'days');
            break;
        case 'Wednesday':
            LocaleDate.add(-2,'days');
            break;
        case 'Thursday':
            LocaleDate.add(-3,'days');
            break;
        case 'Friday':
            LocaleDate.add(-4,'days');
            break;
        case 'Saturday':
            LocaleDate.add(-5,'days');
            break;
    }
}

function getMonth(){
    document.getElementsByClassName('calendar-block--content-date')[0].innerHTML="";
    if(LocaleDate.format('D')==1 && LocaleDate.format('dddd')=='Sunday'){
        LocaleDate.add(-6, 'days');
    }
    getProcess();    
}


function getProcess(){
    for(let i=1;i<=42;i++){
        monthDays.push(LocaleDate.format('D/MMMM/YYYY'));
        ThisDays[i-1] = LocaleDate.format('D/MMMM/YYYY');
        if(i<=7){
            dayTranslate();
            document.getElementsByClassName('calendar-block--content-date')[0].insertAdjacentHTML('beforeend',`<div class="day-cube"> ${weekDay}, ${LocaleDate.format('D')} <br/><br/><div class="cube-info"></div></div>`);
            LocaleDate.add(1,'days');
        }
        else{
            document.getElementsByClassName('calendar-block--content-date')[0].insertAdjacentHTML('beforeend',`<div class="day-cube"> ${LocaleDate.format('D')}<br/><br/><div class="cube-info"></div></div>`);
            LocaleDate.add(1,'days');
        }
        
        if(i == 35 && LocaleDate.format('DD')<28){
            break;
        }
    }
    
    if(LocaleDate.format('D')<28){
        LocaleDate.add(-1,'months');
    }
}

function viewGet(){
    document.getElementById('modal-add').disabled = true;
    userDate.push(ThisDays[index]);
    let userNum = userDate.length;
        userEvent.push(modal_event.value);
        userDays.push(modal_date.value);
        userPeoples.push(modal_people.value);
        userPreview.push(modal_preview.value);
    
    
    
    document.getElementsByClassName('cube-info')[index].insertAdjacentHTML('beforeend', `${userEvent[userNum-1]}<br> ${userDays[userNum-1]}<br> ${userPeoples[userNum-1]}<br> ${userPreview[userNum-1]}<br>`);
}