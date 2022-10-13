import './input-block.less'

var inputBlocks = document.querySelectorAll('.input-block')

inputBlocks.forEach(inputBlock => {
    //block vars
    var inputBlockItems = inputBlock.querySelector('.input-block__input-items')
    var inputBlockDropdown = inputBlock.querySelector('.input-block__dropdown')
    var paragraphs = inputBlockDropdown.querySelectorAll('.input-block__dropdown-paragraph')
    //arrow
    var arrow = inputBlockItems.querySelector('.input-block__arrow')
    //button vars
    var btnMinus
    var btnPlus
    var counter
    

    //body//
    //open dropdown
    inputBlockItems.addEventListener('click', toggleDropdown)

    //close dropdown

    document.addEventListener('mousedown', (e) => {
        if (!e.composedPath().includes(inputBlockItems)) {
            removeDropdown()
        }
    })

    //buttons
    paragraphs.forEach(paragraph => {
        btnMinus = paragraph.querySelector('.input-block__dropdown-button_type_minus')
        btnPlus = paragraph.querySelector('.input-block__dropdown-button_type_plus')
        //counter
        counter = 0
        
        btnMinus.addEventListener('click', (e) => {
            e.target.parentNode.querySelector('.input-block__dropdown-button-text').innerHTML--
        })
        btnPlus.addEventListener('click', (e) => {
            e.target.parentNode.querySelector('.input-block__dropdown-button-text').innerHTML++
        })
    })

    //functions//
    function toggleDropdown() {
        inputBlockDropdown.classList.toggle('input-block__dropdown_visible')
        arrow.classList.toggle('input-block__arrow_type_dropdown-active')
    }
    function removeDropdown() {
        inputBlockDropdown.classList.remove('input-block__dropdown_visible')
        arrow.classList.remove('input-block__arrow_type_dropdown-active')
    }
})