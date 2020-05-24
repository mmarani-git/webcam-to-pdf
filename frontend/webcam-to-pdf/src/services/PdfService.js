import {ServiceConstants} from '../misc/ServiceConstants.js'
import axios from 'axios'

class PdfService {
    savePdf(images,fileName) {
        return axios.post(ServiceConstants.BASE_URL+"pdf",{images:images, fileName:fileName} );
    }
}

export default new PdfService()