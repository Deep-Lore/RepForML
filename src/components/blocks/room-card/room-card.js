//import components of this block
import './room-card.less'

//import other blocks
import '../rate-block/rate-block.js'

//js for this block
const imagesSrc = ["https://www.ejin.ru/wp-content/uploads/2019/05/krasivaja-gora.jpg","https://klike.net/uploads/posts/2019-06/1559370644_3.jpg","https://klike.net/uploads/posts/2019-06/1559370578_1.jpg","https://klike.net/uploads/posts/2019-06/medium/1559370665_2.jpg"]
const roomCards = document.querySelectorAll('.room-card')

var arrowNext = 0
var arrowPrew = 0

var imagePointer = 0
var image = 0
var dots = 0

for (let i = 0; i < roomCards.length; i++) {
	//arrows
	arrowNext = roomCards[i].querySelector('.room-card__arrow-next')
	arrowPrew = roomCards[i].querySelector('.room-card__arrow-prew')
	//image default
	image = roomCards[i].querySelector('.room-card__image')
	image.src = imagesSrc[0]
	//dots default
	dots = roomCards[i].querySelectorAll('.room-card__dot')
	dots[0].classList.add('room-card__dot_active')
	//arrow next
	arrowNext.addEventListener('click', () => {
		//get variables this image
		image = roomCards[i].querySelector('.room-card__image')
		dots = roomCards[i].querySelectorAll('.room-card__dot')
		imagePointer = imagesSrc.indexOf(image.src)
		//set values for this image
		if(imagePointer<imagesSrc.length-1){
			dots[imagePointer].classList.remove('room-card__dot_active')
			imagePointer++
			image.src = imagesSrc[imagePointer]
			dots[imagePointer].classList.add('room-card__dot_active')
		}
	})
	//arrow prew
	arrowPrew.addEventListener('click', () => {
		//get variables this image
		image = roomCards[i].querySelector('.room-card__image')
		dots = roomCards[i].querySelectorAll('.room-card__dot')
		imagePointer = imagesSrc.indexOf(image.src)
		//set values for this image
		if(imagePointer>0){
			dots[imagePointer].classList.remove('room-card__dot_active')
			imagePointer--
			image.src = imagesSrc[imagePointer]
			dots[imagePointer].classList.add('room-card__dot_active')
		}
	})
	//dots
	for(let j = 0; j < dots.length; j++) {
		dots[j].addEventListener('click', () => {
			//get variables this image
			image = roomCards[i].querySelector('.room-card__image')
			dots = roomCards[i].querySelectorAll('.room-card__dot')
			imagePointer = imagesSrc.indexOf(image.src)
			//set values for this image
			dots[imagePointer].classList.remove('room-card__dot_active')
			imagePointer=j
			image.src = imagesSrc[imagePointer]
			dots[imagePointer].classList.add('room-card__dot_active')
		})
	}
}