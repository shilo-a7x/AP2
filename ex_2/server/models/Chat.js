const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = Schema(
    {
        content: {
            type: String,
            nullable: true
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

// chatSchema.pre('save', async function(next) {
//     try {
//         let counter = await Counter.findById('chatCounter');
//         if (!counter) {
//             counter = new Counter({_id: 'chatCounter'});
//         }
//         counter.count++;
//         await counter.save();
//         this.id = counter.count;
//         this._id = counter.count;
//         next();
//     } catch(err) {
//         next(err);
//     }
// });

module.exports = { Chat: mongoose.model("Chat", chatSchema) };