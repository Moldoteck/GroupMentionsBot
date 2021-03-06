import { prop, getModelForClass } from '@typegoose/typegoose'

export class Chat {
  @prop({ required: true, index: true, unique: true })
  id: number

  @prop({ required: true, default: 'en' })
  language: string

  @prop({ required: true, default: {} })
  groups: Object
}

// Get Chat model
const ChatModel = getModelForClass(Chat, {
  schemaOptions: { timestamps: true },
})

// Get or create chats
export async function findChat(id: number) {
  let chat = await ChatModel.findOne({ id })
  if (!chat) {
    // Try/catch is used to avoid race conditions
    try {
      chat = await new ChatModel({ id }).save()
    } catch (err) {
      chat = await ChatModel.findOne({ id })
    }
  }
  return chat
}

export async function deleteChat(id: number) {
  //delete chat
  await ChatModel.deleteOne({ id })
}

export async function countChats() {
  return await ChatModel.countDocuments({})
}

export async function findAllChats() {
  //find all
  return await ChatModel.find({})
}