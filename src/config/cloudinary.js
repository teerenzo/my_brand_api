const cloudinary=require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dizlhwbtt',
    api_key: '118958451553614',
    api_secret: 'ouG5PbIEoXbK0NUt4ilSL3zWz10'
});


module.exports = cloudinary.uploader;