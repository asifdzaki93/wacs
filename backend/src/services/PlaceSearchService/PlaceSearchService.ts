import axios from 'axios';

const apiKey = 'AIzaSyAN01dly9kKxxb3IPZWJhcLbaD__dpZ-ts'; // Ganti dengan kunci API Anda

const fetchPlaces = async (keyword, nextPageToken = '') => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(keyword)}&key=${apiKey}${nextPageToken ? `&pagetoken=${nextPageToken}` : ''}`;

  const response = await axios.get(url);

  if (response.data.status !== 'OK') {
    throw new Error(response.data.status);
  }

  return response.data;
};

const getPlaceDetails = async (placeId) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_phone_number,formatted_address&key=${apiKey}`;
  const response = await axios.get(url);

  if (response.data.status !== 'OK') {
    throw new Error(response.data.status);
  }

  return response.data.result;
};

const PlaceSearchService = async (keyword) => {
  let results = [];
  let nextPageToken = '';

  do {
    const data = await fetchPlaces(keyword, nextPageToken);
    nextPageToken = data.next_page_token || '';

    for (const result of data.results) {
      const details = await getPlaceDetails(result.place_id);
      const phoneNumber = details.formatted_phone_number ? details.formatted_phone_number.replace(/\D/g, '') : 'Nomor telepon tidak tersedia';

      results.push({
        name: details.name,
        phone_number: phoneNumber.startsWith('0') ? '62' + phoneNumber.slice(1) : phoneNumber,
        formatted_address: details.formatted_address
      });
    }

    if (nextPageToken) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Tunggu sebelum permintaan berikutnya
    }
  } while (nextPageToken);

  return results;
};

export default PlaceSearchService;
