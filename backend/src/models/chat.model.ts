import {Schema, model} from 'mongoose';

const chatSchema = new Schema({
    sender : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    receiver : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    message : {
        type : String,
    }
},{timestamps : true});

const Chat = model("Chat", chatSchema);
export default Chat;