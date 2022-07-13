import './range-slider-block.less'

var block = document.querySelector('.range-slider-block')
var blockLine = document.querySelector('.range-slider-block__line')
var thumbEl = document.querySelector('.range-slider-block__thumb')
var thumbLeftEl = document.querySelector('.range-slider-block__thumb-left')
var thumbRightEl = document.querySelector('.range-slider-block__thumb-right')


// console.log(thumbLeftEl.position,thumbRightEl.position)

thumbLeftEl.addEventListener('mousedown', (e) => {
	document.onmousemove = (e) => {
		thumbLeftEl.style.left = e.pageX - block.getBoundingClientRect().left - thumbEl.offsetHeight/2 + 'px'
		blockLine.style.left = e.pageX - block.getBoundingClientRect().left + 'px'
		if(e.pageX - block.getBoundingClientRect().left - thumbEl.offsetHeight/2 < 0){
			thumbLeftEl.style.left = '0px'
			blockLine.style.left = thumbEl.offsetHeight/2 + 'px'
		}
	}
	document.onmouseup = (e) => {
		document.onmousemove = null
		thumbLeftEl.onmouseup = null
	}
})

thumbRightEl.addEventListener('mousedown', (e) => {
	document.onmousemove = (e) => {
		thumbRightEl.style.right = block.getBoundingClientRect().right - e.pageX - thumbEl.offsetHeight/2 + 'px'
		blockLine.style.right = block.getBoundingClientRect().right - e.pageX + 'px'
		if(block.getBoundingClientRect().right - e.pageX - thumbEl.offsetHeight/2 < 0){
			thumbRightEl.style.right = '0px'
			blockLine.style.right = thumbEl.offsetHeight/2 + 'px'
		}
	}
	document.onmouseup = (e) => {
		document.onmousemove = null
		thumbRightEl.onmouseup = null
	}
})