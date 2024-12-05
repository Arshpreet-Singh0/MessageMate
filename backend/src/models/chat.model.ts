import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    sender: {
      type: String,
      required: true
    },
    receiver: {
      type: String,
      required : true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const friendRequestSchema = new Schema(
  {
    sender: {
      type : String,
      required : true
    },
    receiver: {
      type: String,
      required : true
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Chat = model("Chat", chatSchema);
export const FriendRequest = model("Friendrequest", friendRequestSchema);

export default Chat;
