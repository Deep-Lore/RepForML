import './input-block.less'

var inputBlocks = document.querySelectorAll('.input-block')

inputBlocks.forEach(inputBlock => {
    //block vars
    var inputBlockItems = inputBlock.querySelector('.input-block__input-items')
    var inputBlockItem = inputBlock.querySelector('.input-block__input-item')
    var inputBlockDropdown = inputBlock.querySelector('.input-block__dropdown')
    var paragraphs = inputBlockDropdown.querySelectorAll('.input-block__dropdown-paragraph')
    //arrow
    var arrow = inputBlockItems.querySelector('.input-block__arrow')
    //button vars
    var btnMinus
    var btnPlus
    var counter
    var button

    //open dropdown
    inputBlockItems.addEventListener('click', toggleDropdown)

    //close dropdown
    document.addEventListener('mousedown', (e) => {
        if (!(e.composedPath().includes(inputBlockItems)||e.composedPath().includes(inputBlockDropdown))) {
            removeDropdown()
        }
    })

    //buttons
    paragraphs.forEach(paragraph => {
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

    //functions//
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
        inputBlockItem.placeholder = ''
        paragraphs.forEach((paragraphName, i) => {
            if(i<2){
                inputBlockItem.placeholder += `${paragraphs[i].querySelector('.input-block__dropdown-button-text').innerHTML} ${paragraphs[i].querySelector('.input-block__dropdown-paragraph-text').innerHTML}`
                if(i<1) inputBlockItem.placeholder += ', '
            }
        })
        inputBlockItem.placeholder += '...'
    }
    //button disabled
    function buttonEnable(e, sign) { //sign = plus or minus
        button = e.target.parentNode.querySelector(`.input-block__dropdown-button_type_${sign}`)
        button.classList.remove('input-block__dropdown-button_disabled')
    }
    function buttonDisable(e, sign) { //sign = plus or minus
        button = e.target.parentNode.querySelector(`.input-block__dropdown-button_type_${sign}`)
        button.classList.add('input-block__dropdown-button_disabled')
    }
})