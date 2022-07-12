import './pagination-block.less'

const arr = document.querySelectorAll('.pagination-block__page-item_clickeble')
var activeElem = document.querySelector('.pagination-block__page-item_selected')

arr.forEach((selectedElem) => {
	selectedElem.addEventListener('click', () => {
		activeElem.classList.remove('pagination-block__page-item_selected')
		selectedElem.classList.add('pagination-block__page-item_selected')
		activeElem = selectedElem
	})
})