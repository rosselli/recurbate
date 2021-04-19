
const listCard = (data) => {
	const d = document;
	// const base = d.querySelector('#row');
	data.map(item => {
		const div1 = d.createElement('div');
			div1.classList.add('card');
			div1.classList.add('col-lg-3');
		const aVideo = d.createElement('a')
			aVideo.href = item.videoLink;

		const div2 = d.createElement('div');
			div2.classList.add('video-splash');
			div2.style.backgroundImage = `url('${item.videoImage}')`;
		aVideo.appendChild(div2);
		div1.appendChild(aVideo);

		const div3 = d.createElement('div');
			div3.classList.add('card-body');
		const h4 = d.createElement('h4');
			h4.classList.add('card-title');
		const aPerformer = d.createElement('a')
			aPerformer.href = item.performerLink;
			aPerformer.textContent = item.performer;
		h4.appendChild(aPerformer);
		div3.appendChild(h4);
		div1.appendChild(div3);
		d.querySelector('#row').appendChild(div1);
	});

}

// <div className="card col-lg-3">
// 	<a href="https://recurbate.com/play.php?video=4575392">
// 		<div className="video-splash"
// 			 style="background-image: url('https://v01.frontgross.com/xkinkytinypussy4ux/2021-04-17,04-54.jpg?md5=pZXFP-paj6rxJVO_5BnR4Q&expires=1619352000&origin=104&mid=5b35ce86-3cb3-4f80-97c2-059f5cd667a4&akey=&p=2000')"></div>
// 	</a>
// 	<div className="card-body">
// 		<h4 className="card-title">
// 		<a href="https://recurbate.com/performer/elizka_0603/">elizka_0603</a></h4>
// 	</div>
// </div>



fetch('src/data/recent.json')
	.then(response => response.json())
	.then(data => listCard(data));

