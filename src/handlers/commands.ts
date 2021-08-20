import { countChats } from '@/models'
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
  { command: 'help', description: 'show help' }
]

export async function setCommands(ctx: Context) {
  if ('' + ctx.from.id == process.env.OWNER_ID) {
    ctx.telegram.setMyCommands(commands)
  }
}

export async function countChat(ctx: Context) {
  if ('' + ctx.from.id == process.env.OWNER_ID) {
    let chats = await countChats()
    //TODO: check remained channels
    ctx.reply('Total chat ' + chats)
  }
  else {
    console.log(ctx.from.id, process.env.OWNER_ID)
  }
}