// vite.config.js
export default {
  // config options
  optimizeDeps: {
  	include: [ 
  		'dayjs/esm/index.js',
  		'dayjs/esm/plugin/weekday' 
  	]
  }
}
