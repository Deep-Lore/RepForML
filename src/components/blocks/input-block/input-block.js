import './input-block.less'

//requires and imports
import IMask from 'imask'
import {initCalendar, getValue} from '../calendar/calendar.js';

const inputBlocks = document.querySelectorAll('.input-block')

const months=['Январь','Февраль','Март','Апрель','Май','Июнь',
            'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']

// for dropdown //
const maxInputLength =  15

inputBlocks.forEach(inputBlock => {
    if (inputBlock.contains(inputBlock.querySelector('.input-block__dropdown-counter'))) {
        //block vars
        let inputBlockItems = inputBlock.querySelector('.input-block__input-items')
        let inputBlockItem = inputBlock.querySelector('.input-block__input-item')
        let inputBlockDropdown = inputBlock.querySelector('.input-block__dropdown-counter')
        let paragraphs = inputBlockDropdown.querySelectorAll('.input-block__dropdown-counter-paragraph')
        //placeholder
        let placeHolderDefaultText = inputBlockItem.placeholder
        //arrow
        let arrow = inputBlockItems.querySelector('.input-block__arrow')
        //button vars
        let btnMinus
        let btnPlus
        let counter
        //open dropdown
        inputBlockItems.addEventListener('click', toggleDropdown)

        // close dropdown
        document.addEventListener('click', (e) => {
            if (!(e.composedPath().includes(inputBlockItems)||e.composedPath().includes(inputBlockDropdown))) {
                removeDropdown()
            }
        })

        // buttons //
        paragraphs.forEach(paragraph => {
            //buttons
            btnMinus = paragraph.querySelector('.input-block__dropdown-counter-button_type_minus')
            btnPlus = paragraph.querySelector('.input-block__dropdown-counter-button_type_plus')
            //counter
            counter = 0

            //place 0 to paragraph
            btnMinus.classList.add('input-block__dropdown-counter-button_disabled')

            //btn minus
            btnMinus.addEventListener('click', (e) => {
                counter = e.target.parentNode.querySelector('.input-block__dropdown-counter-button-text')
                if (counter.innerHTML>0&&counter.innerHTML<=4) {
                    counter.innerHTML--
                    //change placeholder
                    createPlaceholder()
                    //button minus enable
                    buttonEnable(e, 'plus')
                }if (counter.innerHTML==0){
                    buttonDisable(e, 'minus')
                }
                if (numberNonZeroParagraphs()==0) {
                    removeButtonClear()
                }
            })
            //btn plus
            btnPlus.addEventListener('click', (e) => {
                counter = e.target.parentNode.querySelector('.input-block__dropdown-counter-button-text')
                if (counter.innerHTML>=0&&counter.innerHTML<4) {
                    counter.innerHTML++
                    //change placeholder
                    createPlaceholder()
                    //button minus enable
                    buttonEnable(e, 'minus')
                }if (counter.innerHTML==4){
                    buttonDisable(e, 'plus')
                }
                if (numberNonZeroParagraphs()!=0) {
                    addButtonClear()
                }
            })
        })

        //Clear and apply buttons
        let buttonClear = inputBlockDropdown.querySelector('.input-block__button-clear')
        let buttonApply = inputBlockDropdown.querySelector('.input-block__button-apply')
        //button clear
        buttonClear.addEventListener('click', () => {
            paragraphs.forEach(paragraphName => {
                paragraphName.querySelector('.input-block__dropdown-counter-button-text').innerHTML=0
                //take button
                btnMinus = paragraphName.querySelector('.input-block__dropdown-counter-button_type_minus')
                btnPlus = paragraphName.querySelector('.input-block__dropdown-counter-button_type_plus')
                //get default condition
                btnMinus.classList.add('input-block__dropdown-counter-button_disabled')
                btnPlus.classList.remove('input-block__dropdown-counter-button_disabled')
            })
            createPlaceholder()
            inputBlockItem.placeholder = placeHolderDefaultText //get default placeholder
            removeButtonClear()
        })

        // functions //
        function toggleDropdown() {
            inputBlockItems.classList.toggle('input-block__input-items_dropdown-active')
            arrow.classList.toggle('input-block__arrow_type_dropdown-active')
            inputBlockDropdown.classList.toggle('input-block__dropdown-counter_dropdown-active')
        }
        function removeDropdown() {
            inputBlockItems.classList.remove('input-block__input-items_dropdown-active')
            arrow.classList.remove('input-block__arrow_type_dropdown-active')
            inputBlockDropdown.classList.remove('input-block__dropdown-counter_dropdown-active')
        }
        //placeholder
        function createPlaceholder() {
            clearPlaceHolder()
            if (inputBlockItem.dataset.placeholderMode=='default') { 
                let sum = 0 //create counter
                paragraphs.forEach((paragraphName, i, parArr) => {
                    if (inputBlockItem.placeholder.length<maxInputLength) {
                        if (paragraphs[i].querySelector('.input-block__dropdown-counter-button-text').innerHTML!=0) {
                            if (inputBlockItem.placeholder != 0) {
                                inputBlockItem.placeholder += ', '
                            }
                            inputBlockItem.placeholder += `${paragraphs[i].querySelector('.input-block__dropdown-counter-button-text').innerHTML} ${paragraphs[i].querySelector('.input-block__dropdown-counter-paragraph-text').innerHTML}`
                        }
                    }
                    sum += Number(paragraphs[i].querySelector('.input-block__dropdown-counter-button-text').innerHTML)
                })
                if (sum==0) inputBlockItem.placeholder = placeHolderDefaultText
                else inputBlockItem.placeholder += '...'
            } 
            if (inputBlockItem.dataset.placeholderMode=='counter') {
                //install placeholder
                let sum = numberNonZeroParagraphs()
                inputBlockItem.placeholder = sum
                if (sum==0) inputBlockItem.placeholder = placeHolderDefaultText
                else if (sum==1) inputBlockItem.placeholder += ' гость'
                else if (sum>1&&sum<5) inputBlockItem.placeholder += ' гостя'
                else if (sum>=5) inputBlockItem.placeholder += ' гостей'
            }
        }
        function clearPlaceHolder() {
            inputBlockItem.placeholder = ''
        }
        //button disabled
        function buttonEnable(e, sign) { //sign = plus or minus
            let button = e.target.parentNode.querySelector(`.input-block__dropdown-counter-button_type_${sign}`)
            button.classList.remove('input-block__dropdown-counter-button_disabled')
        }
        function buttonDisable(e, sign) { //sign = plus or minus
            let button = e.target.parentNode.querySelector(`.input-block__dropdown-counter-button_type_${sign}`)
            button.classList.add('input-block__dropdown-counter-button_disabled')
        }
        //number of non-zero paragraphs
        function numberNonZeroParagraphs() {
            let counter = 0
            paragraphs.forEach(paragraph => {
                counter += Number(paragraph.querySelector('.input-block__dropdown-counter-button-text').innerHTML)
            })
            return counter
        }
        //button clear
        function addButtonClear() {
            let buttonClear = inputBlockDropdown.querySelector('.input-block__button-clear')
            buttonClear.classList.remove('input-block__button-clear_hided')
        }
        function removeButtonClear() {
            let buttonClear = inputBlockDropdown.querySelector('.input-block__button-clear')
            buttonClear.classList.add('input-block__button-clear_hided')
        }
    }
})

// for dropdown calendar
inputBlocks.forEach(inputBlock => {
    if (inputBlock.contains(inputBlock.querySelector('.input-block__dropdown-calendar'))) {
        
        let inputBlockItems = inputBlock.querySelectorAll('.input-block__input-items')
        // for double input in input-dropdown
        if (inputBlockItems.length == 2){   
            let inputBlockItem = inputBlock.querySelectorAll('.input-block__input-item')
            let inputBlockDropdown = inputBlock.querySelector('.input-block__dropdown-calendar')
            let inputCalendar = inputBlockDropdown.querySelector('.calendar')
            initCalendar(inputCalendar)
            //arrow & placeholder
            let arrow = []
            let placeHolderDefaultText = 'ДД.ММ.ГГГГ'
            for(let i = 0; i < inputBlockItems.length; i++){
                arrow[i] = inputBlockItems[i].querySelector('.input-block__arrow')
            }

            // toggle dropdown
            for(let i = 0; i < inputBlockItems.length; i++){
                inputBlockItems[i].addEventListener('click', toggleDropdown)
            }

            // close dropdown
            document.addEventListener('click', (e) => {
                if (!(e.composedPath().includes(inputBlockItems[0]) || e.composedPath().includes(inputBlockItems[1]) || e.composedPath().includes(inputBlockDropdown) )) {
                    removeDropdown()
                }
            })

            // set placeholder date
            inputBlockDropdown.addEventListener('click', () => {
                let calendarData = getValue()
                console.log(getValue())
                inputBlockItem[0].placeholder = createDateForCalendarDropdown(calendarData.firstSelectElem,calendarData.firstSelectElemMonth,calendarData.firstSelectElemYear)
                inputBlockItem[1].placeholder = createDateForCalendarDropdown(calendarData.lastSelectElem,calendarData.lastSelectElemMonth,calendarData.lastSelectElemYear)
                if(calendarData.firstSelectElem > calendarData.lastSelectElem && calendarData.firstSelectElemMonth >= calendarData.lastSelectElemMonth && 
                   calendarData.firstSelectElemYear >= calendarData.lastSelectElemYear && calendarData.lastSelectElem != ''){

                    let tmp = inputBlockItem[0].placeholder
                    inputBlockItem[0].placeholder = inputBlockItem[1].placeholder
                    inputBlockItem[1].placeholder = tmp
                }
            })

            // functions //
            function toggleDropdown() {
                inputBlockDropdown.classList.toggle('input-block__dropdown-calendar_dropdown-active')
                arrow.forEach(arrowElement => {
                    arrowElement.classList.toggle('input-block__arrow_type_dropdown-active')
                })
            }
            function removeDropdown() {
                inputBlockDropdown.classList.remove('input-block__dropdown-calendar_dropdown-active')
                arrow.forEach(arrowElement => {
                    arrowElement.classList.remove('input-block__arrow_type_dropdown-active')
                })
            }
            function createDateForCalendarDropdown(day,month,year){
                day = day < 10 ? '0' + day : day
                month = day < 10 ? '0' + month : month
                if (day==0) return 'ДД.ММ.ГГГГ'
                return `${day}.${month}.${year}`
            }
        }

        // for single input in input-dropdown
        // if (inputBlockItems.length == 1){
        //     let inputBlockItem = inputBlock.querySelector('.input-block__input-item')
        //     let inputBlockDropdown = inputBlock.querySelector('.input-block__dropdown-calendar')
        //     let inputCalendar = inputBlockDropdown.querySelector('.calendar')
        //     initCalendar(inputCalendar)
        //     //arrow & placeholder
        //     let placeHolderDefaultText = 'ДД.ММ.ГГГГ'
        //     let arrow = inputBlockItems[0].querySelector('.input-block__arrow')

        //     // toggle dropdown
        //     inputBlockItems[0].addEventListener('click', toggleDropdown)

        //     // close dropdown
        //     document.addEventListener('click', (e) => {
        //         if (!(e.composedPath().includes(inputBlockItems[0]))) {
        //             removeDropdown()
        //         }
        //     })

        //     // functions //
        //     function toggleDropdown() {
        //         inputBlockDropdown.classList.toggle('input-block__dropdown-calendar_dropdown-active')
        //         arrow.classList.toggle('input-block__arrow_type_dropdown-active')
        //     }
        //     function removeDropdown() {
        //         inputBlockDropdown.classList.remove('input-block__dropdown-calendar_dropdown-active')
        //         arrow.classList.remove('input-block__arrow_type_dropdown-active')
        //     }
        //     function createDateForCalendarDropdown(day,month,year){
        //         day = day < 10 ? '0' + day : day
        //         month = day < 10 ? '0' + month : month
        //         if (day==0) return 'ДД.ММ.ГГГГ'
        //         return `${day}.${month}.${year}`
        //     }
        // }
    }
})

// for mask //

inputBlocks.forEach(inputBlock => {
    let inputBlockItem = inputBlock.querySelector('[data-mask-mode="date"]')
    if (inputBlockItem) {
        var dateMask = IMask(inputBlockItem, {
            mask: Date,
            pattern: 'd.`m.`Y',
        })
    }
})