import './pagination-block.less'

let pageItems = document.querySelectorAll('.pagination-block__page-item-wrapper')
let arrow = document.querySelector('.pagination-block__arrow')
const firstPageValue = +pageItems[0].innerText
const lastPageValue = +pageItems[pageItems.length-1].innerText
const lastPageIndex = +pageItems.length-1

pageItems.forEach(pageItem => {
	pageItem.addEventListener('click', () => {
		renderPageItems(+pageItem.innerText)
	})
})
arrow.addEventListener('click', () => {
	renderPageItems(lastPageValue)
})

function renderPageItems(selectedElemValue){
	pageItems.forEach((pageItem, i) => {
		if (selectedElemValue == firstPageValue) {
			if (i == 0) {
				pageItem.innerHTML = createPageDomItem(selectedElemValue, true, true)
			}
			else if (i == lastPageIndex - 1) {
				pageItem.innerHTML = createPageDomItem('...')
			}
			else if (i == lastPageIndex) {
				pageItem.innerHTML = createPageDomItem(lastPageValue, true)
			}
			else if (i > 0 && i < lastPageIndex) {
				pageItem.innerHTML = createPageDomItem(selectedElemValue + i, true)
			}
		}
		if (selectedElemValue == firstPageValue + 1) {
			if (i == 0) {
				pageItem.innerHTML = createPageDomItem(selectedElemValue - 1, true)
			}
			else if (i == 1) {
				pageItem.innerHTML = createPageDomItem(selectedElemValue, true, true)
			}
			else if (i == lastPageIndex - 1) {
				pageItem.innerHTML = createPageDomItem('...')
			}
			else if (i == lastPageIndex) {
				pageItem.innerHTML = createPageDomItem(lastPageValue, true)
			}
			else if (i > 1 && i < lastPageIndex) {
				pageItem.innerHTML = createPageDomItem(1 + i, true)
			}
		}
		if (selectedElemValue > firstPageValue + 1 && selectedElemValue < lastPageValue - 1) {
			if (i < 2) {
				pageItem.innerHTML = createPageDomItem(i + selectedElemValue - 2, true)
			}
			else if (i == 2) {
				pageItem.innerHTML = createPageDomItem(selectedElemValue, true, true)
			}
			else if (i > 2) {
				pageItem.innerHTML = createPageDomItem(i + selectedElemValue - 2, true)
			}
		}
		if (selectedElemValue == lastPageValue - 1) {
			if (i == 0) {
				pageItem.innerHTML = createPageDomItem(firstPageValue, true)
			}
			else if (i == lastPageIndex - 1) {
				pageItem.innerHTML = createPageDomItem(selectedElemValue, true, true)
			}
			else if (i == 1) {
				pageItem.innerHTML = createPageDomItem('...')
			}
			else if (i == 2) {
				pageItem.innerHTML = createPageDomItem(lastPageValue - 2, true)
			}
			else if (i == lastPageIndex) {
				pageItem.innerHTML = createPageDomItem(lastPageValue, true)
			}
		}
		if (selectedElemValue == lastPageValue) {
			if (i == lastPageIndex) {
				pageItem.innerHTML = createPageDomItem(selectedElemValue, true, true)
			}
			else if (i == 1) {
				pageItem.innerHTML = createPageDomItem('...')
			}
			else if (i == 0) {
				pageItem.innerHTML = createPageDomItem(firstPageValue, true)
			}
			else if (i > 1 && i < lastPageIndex) {
				pageItem.innerHTML = createPageDomItem(selectedElemValue + i - 4, true)
			}
		}
	})
}

function createPageDomItem(value, clickeble = 0, selected = 0) {
	let classes = 'pagination-block__page-item'
	if (clickeble) classes += ' pagination-block__page-item_clickeble'
	if (selected) classes += ' pagination-block__page-item_selected'
	return `<p class='${classes}'><span class="pagination-block__page-num">${value}</span></p>`
}