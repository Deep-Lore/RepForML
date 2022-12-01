//requires and imports
import IMask from 'imask'
import './input-block.less'

const inputBlocks = document.querySelectorAll('.input-block')

// for dropdown //
const maxInputLength =  15

inputBlocks.forEach(inputBlock => {
    if (inputBlock.contains(inputBlock.querySelector('.input-block__dropdown'))) {
        //block vars
        let inputBlockItems = inputBlock.querySelector('.input-block__input-items')
        let inputBlockItem = inputBlock.querySelector('.input-block__input-item')
        let inputBlockDropdown = inputBlock.querySelector('.input-block__dropdown')
        let paragraphs = inputBlockDropdown.querySelectorAll('.input-block__dropdown-paragraph')
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
            btnMinus = paragraph.querySelector('.input-block__dropdown-button_type_minus')
            btnPlus = paragraph.querySelector('.input-block__dropdown-button_type_plus')
            //counter
            counter = 0

            //place 0 to paragraph
            btnMinus.classList.add('input-block__dropdown-button_disabled')

            //btn minus
            btnMinus.addEventListener('click', (e) => {
                counter = e.target.parentNode.querySelector('.input-block__dropdown-button-text')
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
                counter = e.target.parentNode.querySelector('.input-block__dropdown-button-text')
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
                paragraphName.querySelector('.input-block__dropdown-button-text').innerHTML=0
                //take button
                btnMinus = paragraphName.querySelector('.input-block__dropdown-button_type_minus')
                btnPlus = paragraphName.querySelector('.input-block__dropdown-button_type_plus')
                //get default condition
                btnMinus.classList.add('input-block__dropdown-button_disabled')
                btnPlus.classList.remove('input-block__dropdown-button_disabled')
            })
            createPlaceholder()
            inputBlockItem.placeholder = placeHolderDefaultText //get default placeholder
            removeButtonClear()
        })

        // functions //
        function toggleDropdown() {
            inputBlockItems.classList.toggle('input-block__input-items_dropdown-active')
            arrow.classList.toggle('input-block__arrow_type_dropdown-active')
            inputBlockDropdown.classList.toggle('input-block__dropdown_dropdown-active')
            inputBlockItem.classList.toggle('input-block__input-item_placeholder-color_dark-75')
        }
        function removeDropdown() {
            inputBlockItems.classList.remove('input-block__input-items_dropdown-active')
            arrow.classList.remove('input-block__arrow_type_dropdown-active')
            inputBlockDropdown.classList.remove('input-block__dropdown_dropdown-active')
            inputBlockItem.classList.remove('input-block__input-item_placeholder-color_dark-75')
        }
        //placeholder
        function createPlaceholder() {
            clearPlaceHolder()
            if (inputBlockItem.dataset.placeholderMode=='default') { 
                let sum = 0 //create counter
                paragraphs.forEach((paragraphName, i, parArr) => {
                    if (inputBlockItem.placeholder.length<maxInputLength) {
                        if (paragraphs[i].querySelector('.input-block__dropdown-button-text').innerHTML!=0) {
                            if (inputBlockItem.placeholder != 0) {
                                inputBlockItem.placeholder += ', '
                            }
                            inputBlockItem.placeholder += `${paragraphs[i].querySelector('.input-block__dropdown-button-text').innerHTML} ${paragraphs[i].querySelector('.input-block__dropdown-paragraph-text').innerHTML}`
                        }
                    }
                    sum += Number(paragraphs[i].querySelector('.input-block__dropdown-button-text').innerHTML)
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
            let button = e.target.parentNode.querySelector(`.input-block__dropdown-button_type_${sign}`)
            button.classList.remove('input-block__dropdown-button_disabled')
        }
        function buttonDisable(e, sign) { //sign = plus or minus
            let button = e.target.parentNode.querySelector(`.input-block__dropdown-button_type_${sign}`)
            button.classList.add('input-block__dropdown-button_disabled')
        }
        //number of non-zero paragraphs
        function numberNonZeroParagraphs() {
            let counter = 0
            paragraphs.forEach(paragraph => {
                counter += Number(paragraph.querySelector('.input-block__dropdown-button-text').innerHTML)
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

// for mask //

inputBlocks.forEach(inputBlock => {
    let inputBlockItem = inputBlock.querySelector('[data-mask-mode="date"]')
    if (inputBlockItem) {
        console.log(inputBlockItem)
        var dateMask = IMask(inputBlockItem, {
            mask: Date,  // enable date mask
            pattern: 'd-`m-`Y',  // Pattern mask with defined blocks, default is 'd{.}`m{.}`Y'
            max: new Date(),  // defaults to `9999-01-01`
        })
    }
})