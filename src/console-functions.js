// Create Checklist for All Performers (https://recurbate.com/performers/)
$$('.performer-li-wrap').length
var models = '\n';
var list = $$('.performer-li-wrap');
list.forEach(item => {
	var model = item.querySelector('.video-info > a > b').textContent;
	var link = item.querySelector('.video-info > a').href;
	models += `["", "${model}", "${link}", ""],\n`;
});
copy(models);
models.length;