// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJSxROW0MdT-6Hq0-4ugzXqpn9nkCZktw",
    authDomain: "ecommerce-2a73f.firebaseapp.com",
    projectId: "ecommerce-2a73f",
    storageBucket: "ecommerce-2a73f.firebasestorage.app",
    messagingSenderId: "569948023557",
    appId: "1:569948023557:web:a4818d86da29e58955a56c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


export default firebaseApp;
 // Use this sample image or upload your own via the Media Explorer
      


        // const handleImageUploads = async () => {
        //     toast("Creating product, please wait... ");
        //     try {
        //         for (let item of data.images) {
        //             if (item.image) {
        //                 const fileName = new Date().getDate() + "-" + item.name;
        //                 const storage = getStorage(firebaseApp);
        //                 const storageRef = ref(storage, `products/${fileName}`)
        //                 const uploadTask = uploadBytesResumable(storageRef, item.image)
        //                 await new Promise<void>((resolve, reject) => {
        //                     uploadTask.on('state_changed',
        //                         (snapshot) => {
        //                             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //                             console.log('Upload is ' + progress + '% done');
        //                             switch (snapshot.state) {
        //                                 case 'paused':
        //                                     console.log('Upload is paused');
        //                                     break;
        //                                 case 'running':
        //                                     console.log('Upload is running');
        //                                     break;
        //                             }
        //                         },
        //                         (error) => {
        //                             console.log("error uploading image", error);
        //                             reject(error);
        //                         },
        //                         () => {
        //                             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //                                 uploadedImages.push({
        //                                     ...item,
        //                                     image: downloadURL,
        //                                 })
        //                                 console.log('File available at', downloadURL);
        //                                 resolve()
        //                             }).catch((error) => {
        //                                 console.log("Error getting the download URL", error);
        //                                 reject(error);
        //                             })
        //                         }
        //                     )
        //                 })
        //             }
        //         }
        //     } catch (error) {
        //         setIsLoading(false);
        //         console.log("Error handling image uploads", error);
        //         return toast.error("Error handling image uploads ")
        //     }
        // };

        // await handleImageUploads();
        // const productData = { ...data, images: uploadedImages }
        // console.log("productData", productData);