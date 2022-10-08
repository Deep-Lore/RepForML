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

    //body
    inputBlockItems.addEventListener('click', () => {
        inputBlockDropdown.classList.toggle('input-block__dropdown_visible')
    })
    document.addEventListener('mousedown', (e) => {
        if (!e.composedPath().includes(inputBlockItems)) {
            inputBlockDropdown.classList.remove('input-block__dropdown_visible')
        }
    })
    //buttons
    paragraphs.forEach(paragraph => {
        btnMinus = paragraph.querySelector('.input-block__dropdown-button_type_minus')
        btnPlus = paragraph.querySelector('.input-block__dropdown-button_type_plus')
        console.log(btnMinus)
        
        btnMinus.addEventListener('click', () => {

        })
        btnPlus.addEventListener('click', () => {
            
        })
    })
})