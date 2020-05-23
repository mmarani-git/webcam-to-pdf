class ImageService {
    getSize(imageBase64) {
        let i = new Image(); 

        i.onload = function(){
            alert( i.width+", "+i.height );
        };

        i.src = imageBase64; 
    }
}

export default new ImageService()