import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: 'dizlhwbtt',
    api_key: '118958451553614',
    api_secret: 'ouG5PbIEoXbK0NUt4ilSL3zWz10'
});

export default cloudinary.uploader;