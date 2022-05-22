import axios from 'axios'
export default {
    getDataPegawai: () =>
        axios({
            'method': 'GET',
            'url': 'https://linksmart-pln.herokuapp.com/api/pegawais?populate=jabatan'
        })
}