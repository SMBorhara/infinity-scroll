const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash api
const count = 30;
const apiKey = 'oiqtdFZaoa0Z61f08lTr13Ga_j7I0poeGLMjLHdnNfI';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// image load check
const imageLoaded = () => {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
};

// helper function - set attributes
const setAttributes = (element, attributes) => {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
};

// photo display

const displayPhotos = () => {
	photosArray.forEach((photo) => {
		imagesLoaded = 0;
		totalImages = photosArray.length;

		const item = document.createElement('a');

		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});
		const img = document.createElement('img');

		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		img.addEventListener('load', imageLoaded);

		item.appendChild(img);
		imageContainer.appendChild(item);
	});
};

// get photos

const getPhotos = async () => {
	try {
		const response = await fetch(apiURL);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {}
};

// continue scroll, continued photo load

window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

getPhotos();
