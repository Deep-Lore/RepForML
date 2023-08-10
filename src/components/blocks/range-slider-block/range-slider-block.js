	//imports//

import './range-slider-block.less'

	//exports//
export default rangeSlider

function rangeSlider(params = {}) {

	const {
		minRangeValue = 5000, 
		maxRangeValue = 20000, 
		thumbLeftValue = 10000, 
		thumbRightValue = 15000, 
		discharge = 10,
		unit = '₽'
	} = params

	//variables//
	var block = document.querySelector('.range-slider-block')
	var thumbLine = document.querySelector('.range-slider-block__thumb-line')
	var thumbEl = document.querySelector('.range-slider-block__thumb')
	var thumbLeftEl = document.querySelector('.range-slider-block__thumb-left')
	var thumbRightEl = document.querySelector('.range-slider-block__thumb-right')
	var valueText = document.querySelector('.range-slider-block__value-text')
	var valueTextMin = thumbLeftValue
	var valueTextMax = thumbRightValue

	//default value
	const rangeValues = maxRangeValue - minRangeValue

	//thumb position style in %
	thumbLeftEl.style.left = `${(thumbLeftValue - minRangeValue)/rangeValues*(block.offsetWidth-thumbEl.offsetWidth)}px`
	thumbRightEl.style.right = `${(maxRangeValue-thumbRightValue)/rangeValues*(block.offsetWidth-thumbEl.offsetWidth)}px`

	//line position style
	thumbLine.style.left = thumbLeftEl.style.left
	thumbLine.style.right = thumbRightEl.style.right

	valueText.innerHTML = `${valueTextMin}${unit} - ${valueTextMax}${unit}`

		//functions//

	//left thumb
	function thumbLeftPos(e) {
		return mousePos(e) - block.getBoundingClientRect().left - thumbEl.offsetHeight/2
	}

	//right thumb
	function thumbRightPos(e) {
		return block.getBoundingClientRect().right - mousePos(e) - thumbEl.offsetHeight/2
	}

	function mousePos(e){
		return navigator.userAgentData.mobile ? e.touches[0].pageX : e.pageX
	}

	function mobileCheck(e) {
		return navigator.userAgentData.mobile
	}

	function dellScroll(){
		document.querySelector('body').style.overflowY = 'hidden'
	}

	function addScroll(){
		document.querySelector('body').style.overflowY = 'scroll'
	}

	function extIntFromSrt(x) {
		if (x.indexOf('%')!=-1) {
			return parseInt(x.match(/\d+/)[0]*block.offsetWidth/100)
		}else {
			return parseInt(x.match(/\d+/)[0])
		}
	}

	function getScrollbarWidth() {
		var documentWidth = parseInt(document.documentElement.clientWidth);
		var windowsWidth = parseInt(window.innerWidth);
		var scrollbarWidth = windowsWidth - documentWidth;
		return Math.abs(parseInt(document.documentElement.clientWidth) - parseInt(window.innerWidth));
	}

		//events//
	//desktop
	block.addEventListener("mousedown", (e) => e.preventDefault ())
	//left thumb
	thumbLeftEl.addEventListener('mousedown', (e) => {
		var thumbRightElPosRight = extIntFromSrt(thumbRightEl.style.right)
		var blockWidth = block.offsetWidth - thumbEl.offsetWidth

		dellScroll()
		document.onmousemove = (e) => {
			//set positions
			if (thumbLeftPos(e) >= 0&&blockWidth > thumbRightElPosRight + thumbLeftPos(e) + thumbEl.offsetWidth) {
				//thumb
				thumbLeftEl.style.left = thumbLeftPos(e) + 'px'
				//line
				thumbLine.style.left = thumbLeftPos(e) + 'px'
				//value
				valueTextMin = Math.round( (minRangeValue+thumbLeftPos(e)/blockWidth*rangeValues) / discharge) * discharge + unit
				valueText.innerHTML = `${valueTextMin} - ${valueTextMax}`
			}
		}
		document.onmouseup = () => {
			document.onmousemove = null
			document.onmouseup = null
			addScroll()
		}
	})

	//right thumb
	thumbRightEl.addEventListener('mousedown', (e) => {
		var thumbLeftElPosLeft = extIntFromSrt(thumbLeftEl.style.left)
		var blockWidth = block.offsetWidth - thumbEl.offsetWidth

		dellScroll()
		document.onmousemove = (e) => {
			if (thumbRightPos(e) >= 0&&blockWidth > thumbLeftElPosLeft + thumbRightPos(e) + thumbEl.offsetWidth) {
				//thumb
				thumbRightEl.style.right = thumbRightPos(e) + 'px'
				//line
				thumbLine.style.right = thumbRightPos(e) + 'px'
				//value
				valueTextMax = Math.round((minRangeValue+(blockWidth-thumbRightPos(e))/blockWidth*rangeValues) / discharge) * discharge +unit
				valueText.innerHTML = `${valueTextMin} - ${valueTextMax}`
			}
		}
		document.onmouseup = () => {
			document.onmousemove = null
			document.onmouseup = null
			addScroll()
		}
	})
}