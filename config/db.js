// const mongoose = require('mongoose');

// const config = require('config');

// const db = config.get('mongoURI');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(db, {
//             useNewUrlParser: true
//         });

//         console.log('mongodb connected!');
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// }


// module.exports = connectDB;

const mongoose = require('mongoose');

const config = require('config');
const password = "test1234"
const db = `mongodb+srv://ecomProject:PwcfE_dMTuH.7fq@cluster0.ofdid.mongodb.net/ecom?authSource=admin&replicaSet=atlas-rtdk6d-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`;
console.log("deb",db)
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        });

        console.log('mongodb connected!');
    } catch (err) {
        console.log("this error",err)
        console.error(err.message);
        process.exit(1);
    }
}


module.exports = connectDB;