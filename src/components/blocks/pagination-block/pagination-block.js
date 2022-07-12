import './pagination-block.less'

const arr = document.querySelectorAll('.pagination-block__page-num')
var activeElem = arr[0]

arr.forEach((selectedElem) => {
	selectedElem.addEventListener('click', () => {
		activeElem.classList.remove('pagination-block__page-num_selected')
		selectedElem.classList.add('pagination-block__page-num_selected')
		activeElem = selectedElem
	})
})