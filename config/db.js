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
const db = `mongodb://TaskView:Task123@cluster0-shard-00-00.nbdrb.mongodb.net:27017,cluster0-shard-00-01.nbdrb.mongodb.net:27017,cluster0-shard-00-02.nbdrb.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-10btdf-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`;
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