import { Context } from 'telegraf'

export async function checkAdmin(ctx: Context) {
  let isAdmin = false
  if (ctx.chat.type == 'group' || ctx.chat.type == 'supergroup') {
    let chat_admins = await ctx.getChatAdministrators()
    let chat_admins_id: number[] = chat_admins.map(({ user }) => user.id)
    if (chat_admins_id.length == 0) {
      ctx.reply("Can't detect admins, probably bot should be promoted to admins", { reply_to_message_id: ctx.message.message_id })
      isAdmin = false
    } else {
     // console.log(chat_admins)
      if (chat_admins_id.indexOf(ctx.from.id) != -1) {
        isAdmin = true
      } else {
        ctx.reply("Are you an admin? Maybe uncheck anonymous flag?", { reply_to_message_id: ctx.message.message_id })
      }
    }
  }
  if (ctx.chat.type == 'private') {
    isAdmin = true
  }
  return isAdmin
}