// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  base: '/taskale/',
  optimizeDeps: {
  	include: [ 
  		'dayjs/esm/index.js',
  		'dayjs/esm/plugin/weekday' 
  	]
  },
  plugins: [vue()]
}
