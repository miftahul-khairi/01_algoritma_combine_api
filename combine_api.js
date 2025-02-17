const axios = require('axios');
const urlData = 'https://api.npoint.io/c1b829a72a3734666863';
const urlWilayah = 'https://ibnux.github.io/data-indonesia/kabupaten/11.json';
let result = [];

Promise.all([axios.get(urlData), axios.get(urlWilayah)])
    .then(([dataResponse, wilayahResponse]) => {
        const data = dataResponse.data;
        const wilayah = wilayahResponse.data;

        result = data.map((item) => {
            const kabKota = wilayah.find((itemWilayah) => itemWilayah.id === item.kab_kota);
            if (kabKota) {
                item.nama_kab_kota = kabKota.nama;
            }
            return item;
        });

        console.log(result);
    })
    .catch((error) => {
        console.error('Error fetching data:', error.message);
    });
