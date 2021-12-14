const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            startDate: {
                type: String
            },
            endDate: {
                type: String,
                req: false //true 
            }
        }
    ],
    priority: {
        type: String,
        default: ''
    },
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'projects'
            },
            text: {
                type: String,
                required: true
            }
        }
    ],
    alteration: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'projects'
            },
            editType: {
                type: String,
                required: true
            },
            documentRef: {
                type: Schema.Types.ObjectId
            }
            // comment: {
            //     type: String
            // }
        }
    ]
});


module.exports = Project = mongoose.model('project', ProjectSchema);