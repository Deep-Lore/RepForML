import './input-block.less'

var inputBlocks = document.querySelectorAll('.input-block')

console.log(inputBlocks)

inputBlocks.forEach(inputBlock => {
    //block vars
    var inputBlockItems = inputBlock.querySelector('.input-block__input-items')
    var inputBlockDropdown = inputBlock.querySelector('.input-block__dropdown')
    var paragraphs = inputBlockDropdown.querySelectorAll('.input-block__dropdown-paragraph')
    //button vars
    var btnMinus
    var btnPlus
    var counter

    //body//
    //open dropdown
    inputBlockItems.addEventListener('focusin', addDropdown)

    //close dropdown
    inputBlockItems.addEventListener('mouseover', () => {
        console.log(1)
        inputBlockItems.removeEventListener('focusout', removeDropdown)
    })
    inputBlockItems.addEventListener('mouseout', () => {
        console.log(2)
        inputBlockItems.addEventListener('focusout', removeDropdown)

    })

    //buttons
    paragraphs.forEach(paragraph => {
        counter = 0
        btnMinus = paragraph.querySelector('.input-block__dropdown-button_type_minus')
        btnPlus = paragraph.querySelector('.input-block__dropdown-button_type_plus')
        
        btnMinus.addEventListener('click', (e) => {
            e.target.parentNode.querySelector('.input-block__dropdown-button-text').innerHTML--
        })
        btnPlus.addEventListener('click', (e) => {
            e.target.parentNode.querySelector('.input-block__dropdown-button-text').innerHTML++
        })
    })

    //functions//
    function addDropdown() {
        inputBlockDropdown.classList.add('input-block__dropdown_visible')
        console.log(3)
    }
    function removeDropdown() {
        inputBlockDropdown.classList.remove('input-block__dropdown_visible')
        console.log(4)
    }
})