import fs from 'fs';

function removeImage(image) {
    fs.unlinkSync("images/" + image, (error) => {
        if (error) console.log('unable to delete image');
        else console.log('image deleted')
    });
}

export default removeImage;