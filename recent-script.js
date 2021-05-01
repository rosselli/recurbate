const d = document;
const rejected = []
const handleClick = (performer) => {
	rejected.push(performer);
	console.log('rejected', rejected.length, performer);
	const thumb = d.querySelector('#thumb-' + performer);
	thumb.style.display = 'none';
}	

const listCard = (data) => {
	data.map(item => {
		const div1 = d.createElement('div');
			div1.classList.add('video-thumb');
			div1.classList.add('col-lg-4');
			div1.id = 'thumb-' + item.performer;
		const aVideo = d.createElement('a')
			aVideo.href = item.videoLink;

		const div2 = d.createElement('div');
			div2.classList.add('video-splash');
			div2.style.backgroundImage = `url('${item.videoImage}')`;
		aVideo.appendChild(div2);
		div1.appendChild(aVideo);

		const div3 = d.createElement('div');
			div3.classList.add('video-info');
		const h4 = d.createElement('h4');
			h4.classList.add('card-title');
		const aPerformer = d.createElement('a')
			aPerformer.href = item.performerLink;
			aPerformer.textContent = item.performer;
		const div4 = d.createElement('div');
		const removeButton = d.createElement('button');
		removeButton.id = item.performer;
		removeButton.textContent = 'REMOVE'
		removeButton.classList.add('btn');
		removeButton.classList.add('btn-warning');
		removeButton.classList.add('btn-xs');
		removeButton.onclick = () => handleClick(item.performer);
		h4.appendChild(aPerformer);
		div4.appendChild(removeButton);
		h4.appendChild(div4);
		div3.appendChild(h4);
		div1.appendChild(div3);
		d.querySelector('#row').appendChild(div1);
	});
}

fetch('src/data/recent.json')
	.then(response => response.json())
	.then(data => listCard(data));

