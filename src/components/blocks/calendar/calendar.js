//import components of this block
import './calendar.less'

var firstSelectElemYear = 0
var lastSelectElemYear = 0
var firstSelectElemMonth = 0
var lastSelectElemMonth = 0
var firstSelectElem = 0
var lastSelectElem = 0

const calendar = {
    initCalendar: function(calendarItem) {
        const months=['Январь','Февраль','Март','Апрель','Май','Июнь',
                    'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']

        const calendar = calendarItem
        const currentDate = calendar.querySelector('.calendar__header-text')
        const currentDateDropdown = calendar.querySelector('.calendar__header-dropdown')
        const dateDropdownList = calendar.querySelectorAll('.calendar__header-dropdown-item')
        const arrowPrev = calendar.querySelector('.calendar__control-button-prev')
        const arrowNext = calendar.querySelector('.calendar__control-button-next')
        const daysList = calendar.querySelector('.calendar__days')

        // today's date
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()

        //displayed date
        let calendarYear = year
        let calendarMonth = month

        // seleted elems
        renderCalendar()

        //arrows
        arrowPrev.addEventListener('click', () => {
            if(calendarMonth>0){
                calendarMonth--
            }else{
                calendarMonth=11
                calendarYear--
            }
            renderCalendar()
        })
        arrowNext.addEventListener('click', () => {
            if(calendarMonth<11){
                calendarMonth++
            }else{
                calendarMonth=0
                calendarYear++
            }
            renderCalendar()
        })

        //dropdown
        currentDate.addEventListener('click', () => {
            currentDateDropdown.classList.toggle('calendar__header-dropdown_visible')
        })
        document.addEventListener('mousedown', (e) => {
            if(!e.composedPath().includes(currentDateDropdown)&&!e.composedPath().includes(currentDate)){
                currentDateDropdown.classList.remove('calendar__header-dropdown_visible')
            }
        })

        for(let i = 0; i < dateDropdownList.length; i++){
            dateDropdownList[i].addEventListener('click', () => {
                for(let j = 0; j < dateDropdownList.length; j++){
                    dateDropdownList[j].classList.remove('calendar__header-dropdown-item_selected')
                }
                dateDropdownList[i].classList.add('calendar__header-dropdown-item_selected')
                calendarYear = Number(dateDropdownList[i].textContent)
                renderCalendar()
            })
        }

        // functions
        function renderCalendar(){
            let lastDateOfMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate()
            let lastDateOfPrevMonth = new Date(calendarYear, calendarMonth, 0).getDate()
            let lastDayOfMonth = new Date(calendarYear, calendarMonth + 1, 0).getDay()
            let firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay()
            firstDayOfMonth == 0 ? firstDayOfMonth = 7 : false
            lastDayOfMonth == 0 ? lastDayOfMonth = 7 : false
            
            //create header dropdown
            
            for(let i = 0; i < dateDropdownList.length; i++){
                dateDropdownList[i].innerHTML = ''
            }
            for(let i = 0; i < dateDropdownList.length; i++){
                dateDropdownList[i].innerHTML += `${year+i}`
            }
            
            //create header
            currentDate.innerHTML = `${months[calendarMonth]} ${calendarYear}`

            //create sections
            daysList.innerHTML = createStruct()
            
            //selecting day//
            let daysOfPrevMonth = document.querySelectorAll('.calendar__day_prev')
            let daysOfActiveMonth = document.querySelectorAll('.calendar__day_active')
            let daysOfNextMonth = document.querySelectorAll('.calendar__day_next')
            
            createSelecting()

            //functions//
            function createStruct(){
                let liTag = ''
                for(let i = firstDayOfMonth-1; i > 0; i--){  //inactive days prev
                    liTag += `<li class='calendar__day calendar__day_prev'><div class='calendar__day-item calendar__day-item_inactive'>${lastDateOfPrevMonth-i+1}</div></li>`
                }
                for(let i = 1; i <= lastDateOfMonth; i++){ //active days
                    if(i == day && month == calendarMonth && year == calendarYear){
                        liTag += `<li class='calendar__day calendar__day_active'><div class='calendar__day-item calendar__day-item_present-day'>${i}</div></li>`
                    }else{
                        liTag += `<li class='calendar__day calendar__day_active'><div class='calendar__day-item'>${i}</div></li>`
                    }
                }
                for(let i = 0; i < 7 - lastDayOfMonth; i++){ //inactive days next
                    liTag += `<li class='calendar__day calendar__day_next'><div class='calendar__day-item calendar__day-item_inactive'>${i+1}</div></li>`
                }
                return liTag
            }
            
            function createSelecting() {
                if(firstSelectElem != 0 && lastSelectElem == 0 && firstSelectElemMonth == calendarMonth && firstSelectElemYear == calendarYear){
                    daysOfActiveMonth[firstSelectElem-1].querySelector('.calendar__day-item').classList.add('calendar__day-item_selected')
                    
                }else if(firstSelectElem !=0 && lastSelectElem !=0){
                    if(firstSelectElemMonth == calendarMonth && firstSelectElemYear == calendarYear){
                        daysOfActiveMonth[firstSelectElem-1].querySelector('.calendar__day-item').classList.add('calendar__day-item_selected')
                    }if(lastSelectElemMonth == calendarMonth && lastSelectElemYear == calendarYear){
                        daysOfActiveMonth[lastSelectElem-1].querySelector('.calendar__day-item').classList.add('calendar__day-item_selected')
                    }
                    createSelectingRange()
                }
                
                //select inactive days
                for(let i = 0; i < daysOfPrevMonth.length; i++){
                    let day = daysOfPrevMonth[i].querySelector('.calendar__day-item')
                    if(day.textContent == firstSelectElem && calendarMonth == firstSelectElemMonth+1 ||
                    day.textContent == lastSelectElem && calendarMonth == lastSelectElemMonth+1 ||
                    calendarMonth == 0 && calendarYear == firstSelectElemYear+1 && firstSelectElem == day.textContent ||
                    calendarMonth == 0 && calendarYear == lastSelectElemYear+1 && lastSelectElem == day.textContent){
                        day.classList.add('calendar__day-item_selected')
                    }
                }
                for(let i = 0; i < daysOfNextMonth.length; i++){
                    let day = daysOfNextMonth[i].querySelector('.calendar__day-item')
                    if(day.textContent == lastSelectElem && calendarMonth == lastSelectElemMonth-1 || 
                    day.textContent == firstSelectElem && calendarMonth == firstSelectElemMonth-1 ||
                    calendarMonth == 11 && calendarYear == firstSelectElemYear-1 && firstSelectElem == day.textContent ||
                    calendarMonth == 11 && calendarYear == lastSelectElemYear-1 && lastSelectElem == day.textContent){
                        day.classList.add('calendar__day-item_selected')
                    }
                }
                
                //dinamic create selecting
                daysOfActiveMonth.forEach(day => {
                    day.addEventListener('click', () => {
                        let dayElem = day.querySelector('.calendar__day-item')
                        if(firstSelectElem==0&&lastSelectElem==0){
                            firstSelectElem = Number(dayElem.textContent)
                            firstSelectElemMonth = calendarMonth
                            firstSelectElemYear = calendarYear
                            dayElem.classList.add('calendar__day-item_selected')
                        }else if(firstSelectElem!=0&&lastSelectElem==0){
                            lastSelectElem = Number(dayElem.textContent)
                            lastSelectElemMonth = calendarMonth
                            lastSelectElemYear = calendarYear
                            dayElem.classList.add('calendar__day-item_selected')
                            //create selected range
                            createSelectingRange()
                        }else if(firstSelectElem!=0&&lastSelectElem!=0){
                            //remove all
                            daysOfActiveMonth.forEach(dayElem => {
                                dayElem.classList.remove('calendar__day_selected-range_end')
                                dayElem.classList.remove('calendar__day_selected-range_start')
                                dayElem.classList.remove('calendar__day_selected-range_middle')
                                dayElem.querySelector('.calendar__day-item').classList.remove('calendar__day-item_selected')
                            })
                            daysOfNextMonth.forEach(dayElem => {
                                dayElem.classList.remove('calendar__day_selected-range_end')
                                dayElem.classList.remove('calendar__day_selected-range_start')
                                dayElem.classList.remove('calendar__day_selected-range_middle')
                                dayElem.querySelector('.calendar__day-item').classList.remove('calendar__day-item_selected')
                            })
                            daysOfPrevMonth.forEach(dayElem => {
                                dayElem.classList.remove('calendar__day_selected-range_end')
                                dayElem.classList.remove('calendar__day_selected-range_start')
                                dayElem.classList.remove('calendar__day_selected-range_middle')
                                dayElem.querySelector('.calendar__day-item').classList.remove('calendar__day-item_selected')
                            })
                            firstSelectElem = Number(dayElem.textContent)
                            firstSelectElemMonth = calendarMonth
                            firstSelectElemYear = calendarYear
                            lastSelectElem = ''
                            lastSelectElemMonth = ''
                            lastSelectElemYear = ''
                            dayElem.classList.add('calendar__day-item_selected')
                        }
                    })
                })
                
                //functions
                function createSelectingRange(){
                    if(firstSelectElemMonth == calendarMonth && lastSelectElemMonth == calendarMonth && firstSelectElemYear == calendarYear && lastSelectElemYear == calendarYear){
                        if(firstSelectElem<lastSelectElem){
                            daysOfActiveMonth[firstSelectElem-1].classList.add('calendar__day_selected-range_start')
                            daysOfActiveMonth[lastSelectElem-1].classList.add('calendar__day_selected-range_end')
                            for(let i = firstSelectElem; i < lastSelectElem-1; i++){
                                daysOfActiveMonth[i].classList.add('calendar__day_selected-range_middle')
                            }  
                        }else if(firstSelectElem>lastSelectElem){
                            daysOfActiveMonth[firstSelectElem-1].classList.add('calendar__day_selected-range_end')
                            daysOfActiveMonth[lastSelectElem-1].classList.add('calendar__day_selected-range_start')
                            for(let i = lastSelectElem; i < firstSelectElem-1; i++){
                                daysOfActiveMonth[i].classList.add('calendar__day_selected-range_middle')
                            }
                        }
                        
                    }else if(firstSelectElemYear == calendarYear && lastSelectElemYear == calendarYear){
                        if(firstSelectElemMonth == calendarMonth){
                            if(firstSelectElemMonth < lastSelectElemMonth && firstSelectElemYear <= lastSelectElemYear){
                                daysOfActiveMonth[firstSelectElem-1].classList.add('calendar__day_selected-range_start')
                                for(let i = firstSelectElem; i < lastDateOfMonth; i++){
                                    daysOfActiveMonth[i].classList.add('calendar__day_selected-range_middle')
                                }
                            }else if(firstSelectElemMonth > lastSelectElemMonth && firstSelectElemYear >= lastSelectElemYear){
                                daysOfActiveMonth[firstSelectElem-1].classList.add('calendar__day_selected-range_end')
                                for(let i = 0; i < firstSelectElem-1; i++){
                                    daysOfActiveMonth[i].classList.add('calendar__day_selected-range_middle')
                                }
                            }
                        }else if(lastSelectElemMonth == calendarMonth){
                            if(firstSelectElemMonth < lastSelectElemMonth && firstSelectElemYear <= lastSelectElemYear){
                                daysOfActiveMonth[lastSelectElem-1].classList.add('calendar__day_selected-range_end')
                                for(let i = 0; i < lastSelectElem-1; i++){
                                    daysOfActiveMonth[i].classList.add('calendar__day_selected-range_middle')
                                }
                            }else if(firstSelectElemMonth > lastSelectElemMonth && firstSelectElemYear >= lastSelectElemYear){
                                daysOfActiveMonth[lastSelectElem-1].classList.add('calendar__day_selected-range_start')
                                for(let i = lastSelectElem; i < lastDateOfMonth; i++){
                                    daysOfActiveMonth[i].classList.add('calendar__day_selected-range_middle')
                                }
                            }
                        } 
                    }
                    
                    else if(firstSelectElemYear<lastSelectElemYear){
                        if(calendarYear == firstSelectElemYear && calendarMonth == firstSelectElemMonth) {
                        daysOfActiveMonth[firstSelectElem-1].classList.add('calendar__day_selected-range_start')
                            for(let i = firstSelectElem; i < lastDateOfMonth; i++){
                                daysOfActiveMonth[i].classList.add('calendar__day_selected-range_middle')
                            }
                        }
                        if(calendarYear == lastSelectElemYear && calendarMonth == lastSelectElemMonth) {
                            daysOfActiveMonth[lastSelectElem-1].classList.add('calendar__day_selected-range_end')
                            for(let i = 0; i < lastSelectElem-1; i++){
                                daysOfActiveMonth[i].classList.add('calendar__day_selected-range_middle')
                            }
                        }
                        if((calendarMonth > firstSelectElemMonth && calendarYear == firstSelectElemYear) || 
                           (calendarMonth < lastSelectElemMonth && calendarYear == lastSelectElemYear)){
                            daysOfActiveMonth.forEach(dayElem => {
                                dayElem.classList.add('calendar__day_selected-range_middle')
                            })
                        }
                    }
                    
                    else if(firstSelectElemYear>lastSelectElemYear){
                        if(calendarYear == firstSelectElemYear && calendarMonth == firstSelectElemMonth) {
                        daysOfActiveMonth[firstSelectElem-1].classList.add('calendar__day_selected-range_end')
                            for(let i = 0; i < firstSelectElem-1; i++){
                                daysOfActiveMonth[i].classList.add('calendar__day_selected-range_middle')
                            }
                        }
                        if(calendarYear == lastSelectElemYear && calendarMonth == lastSelectElemMonth) {
                            daysOfActiveMonth[lastSelectElem-1].classList.add('calendar__day_selected-range_start')
                            for(let i = lastSelectElem; i < lastDateOfMonth; i++){
                                daysOfActiveMonth[i].classList.add('calendar__day_selected-range_middle')
                            }
                        }
                        if((calendarMonth < firstSelectElemMonth && calendarYear == firstSelectElemYear) || 
                        (calendarMonth > lastSelectElemMonth && calendarYear == lastSelectElemYear)){
                            daysOfActiveMonth.forEach(dayElem => {
                                dayElem.classList.add('calendar__day_selected-range_middle')
                            })
                        }
                    }
                    
                    //range for year
                    if(((calendarMonth < firstSelectElemMonth && calendarYear == firstSelectElemYear) && 
                    (calendarMonth > lastSelectElemMonth && calendarYear == lastSelectElemYear)) || 
                    ((calendarMonth > firstSelectElemMonth && calendarYear == firstSelectElemYear) && 
                    (calendarMonth < lastSelectElemMonth && calendarYear == lastSelectElemYear))){
                        daysOfActiveMonth.forEach(dayElem => {
                            dayElem.classList.add('calendar__day_selected-range_middle')
                        })
                        daysOfNextMonth.forEach(dayElem => {
                            dayElem.classList.add('calendar__day_selected-range_middle')
                        })
                        daysOfPrevMonth.forEach(dayElem => {
                            dayElem.classList.add('calendar__day_selected-range_middle')
                        })
                    }
                    
                    //range for all year
                    if((firstSelectElemMonth < calendarMonth && lastSelectElemMonth > calendarMonth && calendarYear == firstSelectElemYear && calendarYear == lastSelectElemYear) ||
                    (firstSelectElemMonth > calendarMonth && lastSelectElemMonth < calendarMonth && calendarYear == firstSelectElemYear && calendarYear == lastSelectElemYear) ||
                    (firstSelectElemYear > calendarYear && lastSelectElemYear < calendarYear) || 
                    (firstSelectElemYear < calendarYear && lastSelectElemYear > calendarYear) ||
                    (firstSelectElemYear < lastSelectElemYear && calendarYear == lastSelectElemYear && calendarMonth < lastSelectElemMonth) ||
                    (firstSelectElemYear < lastSelectElemYear && calendarYear == firstSelectElemYear && calendarMonth > firstSelectElemMonth) ||
                    (firstSelectElemYear > lastSelectElemYear && calendarYear == lastSelectElemYear && calendarMonth > lastSelectElemMonth) ||
                    (firstSelectElemYear > lastSelectElemYear && calendarYear == firstSelectElemYear && calendarMonth < firstSelectElemMonth)){
                        daysOfActiveMonth.forEach(dayElem => {
                            dayElem.classList.add('calendar__day_selected-range_middle')
                        })
                        daysOfNextMonth.forEach(dayElem => {
                            dayElem.classList.add('calendar__day_selected-range_middle')
                        })
                        daysOfPrevMonth.forEach(dayElem => {
                            dayElem.classList.add('calendar__day_selected-range_middle')
                        })
                    }
                    
                    //inactive elements
                    if(calendarYear == firstSelectElemYear && calendarYear == lastSelectElemYear){
                        if(calendarMonth >= firstSelectElemMonth && calendarMonth <= lastSelectElemMonth){      
                            daysOfNextMonth.forEach((day, i) => {
                                let dayNumber = day.querySelector('.calendar__day-item').textContent
                                if(calendarMonth < lastSelectElemMonth){
                                    if(dayNumber == lastSelectElem){
                                        day.classList.add('calendar__day_selected-range_end')
                                    }
                                    if(dayNumber < lastSelectElem){
                                        day.classList.add('calendar__day_selected-range_middle')
                                    }
                                }
                            })
                            daysOfPrevMonth.forEach((day, i) => {
                                let dayNumber = day.querySelector('.calendar__day-item').textContent
                                if(calendarMonth > firstSelectElemMonth){
                                    if(dayNumber == firstSelectElem){
                                        day.classList.add('calendar__day_selected-range_start')
                                    }
                                    if(dayNumber > firstSelectElem){
                                        day.classList.add('calendar__day_selected-range_middle')
                                    }
                                }
                            })
                        }if(calendarMonth <= firstSelectElemMonth && calendarMonth >= lastSelectElemMonth){      
                            daysOfNextMonth.forEach((day, i) => {
                                let dayNumber = day.querySelector('.calendar__day-item').textContent
                                if(calendarMonth < firstSelectElemMonth){
                                    if(dayNumber == firstSelectElem){
                                        day.classList.add('calendar__day_selected-range_end')
                                    }
                                    if(dayNumber < firstSelectElem){
                                        day.classList.add('calendar__day_selected-range_middle')
                                    }
                                }
                            })
                            daysOfPrevMonth.forEach((day, i) => {
                                let dayNumber = day.querySelector('.calendar__day-item').textContent
                                if(calendarMonth > lastSelectElemMonth){
                                    if(dayNumber == lastSelectElem){
                                        day.classList.add('calendar__day_selected-range_start')
                                    }
                                    if(dayNumber > lastSelectElem){
                                        day.classList.add('calendar__day_selected-range_middle')
                                    }
                                }
                            })
                        }  
                    }
                    
                    else if(firstSelectElemYear < lastSelectElemYear && calendarYear == firstSelectElemYear && calendarMonth == firstSelectElemMonth){
                        if(calendarMonth == 11 && calendarYear == lastSelectElemYear-1){
                            daysOfNextMonth.forEach(day => {
                                let dayNumber = day.querySelector('.calendar__day-item').textContent
                                if(dayNumber < lastSelectElem+1){
                                    day.classList.add('calendar__day_selected-range_middle')
                                }
                            })
                        }
                    }
                    else if(firstSelectElemYear < lastSelectElemYear && calendarYear == lastSelectElemYear && calendarMonth == lastSelectElemMonth){
                        daysOfPrevMonth.forEach(day => {
                            let dayNumber = day.querySelector('.calendar__day-item').textContent
                            if(dayNumber > firstSelectElem-1){
                                day.classList.add('calendar__day_selected-range_middle')
                            }
                        })
                    }else if(firstSelectElemYear > lastSelectElemYear && calendarYear == firstSelectElemYear && calendarMonth == firstSelectElemMonth){
                        daysOfPrevMonth.forEach(day => {
                            let dayNumber = day.querySelector('.calendar__day-item').textContent
                            if(dayNumber > firstSelectElem-1){
                                day.classList.add('calendar__day_selected-range_middle')
                            }
                        })
                    }
                    else if(firstSelectElemYear > lastSelectElemYear && calendarYear == lastSelectElemYear && calendarMonth == lastSelectElemMonth){
                        daysOfNextMonth.forEach(day => {
                            let dayNumber = day.querySelector('.calendar__day-item').textContent
                            if(dayNumber < lastSelectElem+1){
                                day.classList.add('calendar__day_selected-range_middle')
                            }
                        })
                    }
                }
            }
        }
    },
    getValue: function(){
        return {firstSelectElemYear : firstSelectElemYear,
            lastSelectElemYear : lastSelectElemYear,
            firstSelectElemMonth : firstSelectElemMonth,
            lastSelectElemMonth : lastSelectElemMonth,
            firstSelectElem : firstSelectElem,
            lastSelectElem : lastSelectElem,
        }
    }
}

var initCalendar = calendar.initCalendar
var getValue = calendar.getValue

export {initCalendar, getValue}