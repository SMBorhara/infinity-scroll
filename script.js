// unsplash api

const count = 10;
const apiKey = 'oiqtdFZaoa0Z61f08lTr13Ga_j7I0poeGLMjLHdnNfI';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get photos

const getPhotos = async () => {
	try {
		const response = await fetch(apiURL);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

getPhotos();
