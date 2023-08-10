import './like-block.less'

const likeBlockList = document.querySelectorAll('.like-block')

likeBlockList.forEach(likeBlock => {
	likeBlock.addEventListener('click', (e) => {
		const likeBlockText = likeBlock.querySelector('.like-block__text')
		if (likeBlockText) {
			
		}
	})
})