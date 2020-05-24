import {ServiceConstants} from '../misc/ServiceConstants.js'
import axios from 'axios'

class PdfService {
    savePdf(screenshoots,fileName) {
        return axios.post(ServiceConstants.BASE_URL+"pdf/create",{screenshoots:screenshoots, fileName:fileName} );
    }
}

export default new PdfService()