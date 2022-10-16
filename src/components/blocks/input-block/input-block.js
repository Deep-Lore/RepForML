import './input-block.less'

var inputBlocks = document.querySelectorAll('.input-block')

inputBlocks.forEach(inputBlock => {
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
    document.addEventListener('mousedown', (e) => {
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
        })
    })

    //Clear and apply buttons
    if (inputBlock.classList.contains('input-block_size_big')) {
        let buttonClear = inputBlockDropdown.querySelector('.input-block__button-clear')
        let buttonApply = inputBlockDropdown.querySelector('.input-block__button-apply')

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
            //get default placeholder
            inputBlockItem.placeholder = placeHolderDefaultText
        })
    }

    // functions //
    function toggleDropdown() {
        inputBlockItems.classList.toggle('input-block__input-items_dropdown-active')
        arrow.classList.toggle('input-block__arrow_type_dropdown-active')
        inputBlockDropdown.classList.toggle('input-block__dropdown_dropdown-active')
    }
    function removeDropdown() {
        inputBlockItems.classList.remove('input-block__input-items_dropdown-active')
        arrow.classList.remove('input-block__arrow_type_dropdown-active')
        inputBlockDropdown.classList.remove('input-block__dropdown_dropdown-active')
    }
    //placeholder
    function createPlaceholder() {
        clearPlaceHolder()
        paragraphs.forEach((paragraphName, i, parArr) => {
            if(i<2){
                inputBlockItem.placeholder += `${paragraphs[i].querySelector('.input-block__dropdown-button-text').innerHTML} ${paragraphs[i].querySelector('.input-block__dropdown-paragraph-text').innerHTML}`
                if(i<1) inputBlockItem.placeholder += ', '
            }
        })
        inputBlockItem.placeholder += '...'
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
})