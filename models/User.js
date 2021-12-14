const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    projects: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'projects'
        }
    }
    ]
})


// const ProjectSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     tasks: [
//         {
//             name: {
//                 type: String,
//                 required: true
//             },
//             description: {
//                 type: String
//             },
//             startDate: {
//                 type: Date
//             },
//             endDate: {
//                 type: Date,
//                 req: true
//             }
//         }
//     ]
// });


module.exports = User = mongoose.model('user', UserSchema);