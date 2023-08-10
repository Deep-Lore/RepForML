import './form_elements.pug'
import './form_elements.less'

import '../../components/blocks/ui-logo/ui-logo.js' 
import '../../components/blocks/footer/footer.js'
import '../../components/blocks/input-block/input-block.js'
import '../../components/blocks/calendar/calendar.js'
import '../../components/blocks/checkbox-block/checkbox-block.js'
import '../../components/blocks/radio-block/radio-block.js'
import '../../components/blocks/toggle-block/toggle-block.js'
import '../../components/blocks/like-block/like-block.js'
import '../../components/blocks/rate-block/rate-block.js'
import '../../components/blocks/button-block/button-block.js'
import '../../components/blocks/pagination-block/pagination-block.js'

import slider from '../../components/blocks/range-slider-block/range-slider-block.js'

slider({
	minRangeValue: 600, 
	maxRangeValue: 15300, 
	thumbLeftValue: 5000, 
	thumbRightValue: 10000,
	discharge: 100,
	unit: '₽'
})