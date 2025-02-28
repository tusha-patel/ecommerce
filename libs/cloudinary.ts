import { v2 as cloudinary } from 'cloudinary';


// Configuration
cloudinary.config({
    cloud_name: 'dovhnnfq0',
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});



export default cloudinary;
