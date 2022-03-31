import { countChats, findAllChats } from '@/models'
import { Context } from 'telegraf'
import { BotCommand } from 'telegraf/typings/core/types/typegram'

let commands: BotCommand[] = [
  { command: 'taggr', description: 'tag group of people' },
  { command: 'addgr', description: 'create new group' },
  { command: 'rmgr', description: 'remove a group' },
  { command: 'listgr', description: 'list all groups' },
  { command: 'addusr', description: 'add users to a group' },
  { command: 'rmusr', description: 'remove users from a group' },
  { command: 'listusr', description: 'show all users of a group' },
  { command: 'help', description: 'show help' },
]

export async function setCommands(ctx: Context) {
  if ('' + ctx.from.id == process.env.OWNER_ID) {
    ctx.telegram.setMyCommands(commands)
  }
}

export async function countChat(ctx: Context) {
  if (''+ctx?.from?.id == process.env.OWNER_ID) {
    let chats = await findAllChats()
    let users_tot = 0
    let chat_nr = 0
    let users_pr = 0
    for (let element of chats) {
      try {
        let chatObj = await ctx.telegram.getChat(element.id)
        if (chatObj.type == 'private') {
          users_pr += 1
        } else {
          chat_nr += 1
          users_tot += await ctx.telegram.getChatMembersCount(element.id)
        }
      } catch (err) {
        console.log(err)
      }
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    ctx
      .reply(
        'Chat users ' +
          users_tot +
          '\nPrivate Users ' +
          users_pr +
          '\nChats ' +
          chat_nr
      )
      .catch((err) => console.log(err))
  }
}
