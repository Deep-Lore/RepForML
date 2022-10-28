import './checkbox-block.less'

const checkboxListExpandable = document.querySelectorAll('.checkbox-list_expandable')

checkboxListExpandable.forEach( () => {
	const checkboxListHeader = document.querySelector('.checkbox-list__header')
	const checkboxListExpandableArrow = checkboxListHeader.querySelector('.checkbox-list__expandable-arrow')
	const checkboxListItems = document.querySelector('.checkbox-list__items')

	checkboxListHeader.addEventListener('click', () => {
		checkboxListItems.classList.toggle('checkbox-list__items_hided')
		checkboxListExpandableArrow.classList.toggle('checkbox-list__expandable-arrow_closed')
	})
})