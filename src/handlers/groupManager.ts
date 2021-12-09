import { Context } from 'telegraf'
import { checkAdmin } from './adminChecker'

export async function addGroups(ctx: Context) {
  let admin = await checkAdmin(ctx)
  if (admin) {
    if ('text' in ctx.message) {
      const groups = ctx.message.text.split(' ')
      if (groups.length > 1) {
        let chat = ctx.dbchat
        for (let i = 1; i < groups.length; i++) {
          if (groups[i].length > 3) {
            if (!(groups[i] in chat.groups)) {
              chat.groups[groups[i]] = {}

              ctx.reply(`Group ${groups[i]} added`, { reply_to_message_id: ctx.message.message_id })
            } else {
              ctx.reply(`Group ${groups[i]} already exists`, { reply_to_message_id: ctx.message.message_id })
            }
          } else {
            ctx.reply(`Group "${groups[i]}" is too short`, { reply_to_message_id: ctx.message.message_id })
          }
        }
        chat.markModified('groups')
        chat = await (chat as any).save()
      }
    }
  }
}

export async function rmGroups(ctx: Context) {
  let admin = await checkAdmin(ctx)
  if (admin) {
    if ('text' in ctx.message) {
      const groups = ctx.message.text.split(' ')
      if (groups.length > 1) {
        let chat = ctx.dbchat
        for (let i = 1; i < groups.length; i++) {
          if (groups[i] in chat.groups) {
            delete chat.groups[groups[i]]
            ctx.reply(`Group ${groups[i]} deleted`, { reply_to_message_id: ctx.message.message_id })
          }
        }
        chat.markModified('groups')
        chat = await (chat as any).save()
      }
    }
  }
}

export async function listGroups(ctx: Context) {
  let admin = await checkAdmin(ctx)
  if (admin) {
    let groups = Object.keys(ctx.dbchat.groups)
    if (groups.length > 0) {
      ctx.reply(`Groups are:\n ${groups.join(' ')}`, { reply_to_message_id: ctx.message.message_id })
    } else {
      ctx.reply(`There are no groups created yet`, { reply_to_message_id: ctx.message.message_id })
    }
  }
}

export async function addUsers(ctx: Context) {
  let admin = await checkAdmin(ctx)
  if (admin) {
    if ('text' in ctx.message) {
      const users = ctx.message.text.split(' ')
      if (users.length > 2) {
        let chat = ctx.dbchat
        let group = users[1]
        if (group in chat.groups) {
          for (let i = 2; i < users.length; i++) {

            if (users[i].startsWith('@')) {
              (chat.groups[group])[users[i]] = {}
              ctx.reply(`User ${users[i]} added to ${group}`, { reply_to_message_id: ctx.message.message_id })
            } else {
              ctx.reply(`User mention should start with @`, { reply_to_message_id: ctx.message.message_id })
            }
          }

          chat.markModified('groups')
          chat = await (chat as any).save()
        } else {
          ctx.reply(`Group ${group} does not exist`, { reply_to_message_id: ctx.message.message_id })
        }
      }
    }
  }
}

export async function rmUsers(ctx: Context) {
  let admin = await checkAdmin(ctx)
  if (admin) {
    if ('text' in ctx.message) {
      const users = ctx.message.text.split(' ')
      if (users.length > 2) {
        let chat = ctx.dbchat
        let group = users[1]
        if (group in chat.groups) {
          for (let i = 2; i < users.length; i++) {
            delete (chat.groups[group])[users[i]]
            ctx.reply(`User ${users[i]} removed from ${group}`, { reply_to_message_id: ctx.message.message_id })
          }

          chat.markModified('groups')
          chat = await (chat as any).save()
        } else {
          ctx.reply(`Group ${group} doesn't exist`, { reply_to_message_id: ctx.message.message_id })
        }
      }
    }
  }
}

export async function listUsers(ctx: Context) {
  let admin = await checkAdmin(ctx)
  if (admin) {
    if ('text' in ctx.message) {
      const chunks = ctx.message.text.split(' ')
      if (chunks.length == 2) {
        let chat = ctx.dbchat
        let group = chunks[1]
        if (group in chat.groups) {
          ctx.reply(`Users of ${group} are:\n${Object.keys(chat.groups[group]).join(', ')}`, { reply_to_message_id: ctx.message.message_id })
        } else {
          ctx.reply(`Group ${group} doesn't exist`, { reply_to_message_id: ctx.message.message_id })
        }
      } else {
        ctx.reply(`Message should be: /listusr group_name`, { reply_to_message_id: ctx.message.message_id })
      }
    }
  }
}

export async function tagGroups(ctx: Context) {
  let admin = await checkAdmin(ctx)
  if (admin) {
    if ('text' in ctx.message) {
      const groups = ctx.message.text.split(' ')
      if (groups.length > 1) {
        let chat = ctx.dbchat
        let allMentions = ""
        for (let i = 1; i < groups.length; i++) {

          if (groups[i] in chat.groups) {
            let users = Object.keys(chat.groups[groups[i]]).join(', ')
            if (users.length > 0) {
              allMentions += users + ' '
            }
          }else{
            ctx.reply(`Group ${groups[i]} doesn't exist`, { reply_to_message_id: ctx.message.message_id })
          }
        }
        if (allMentions.length > 0) {
          ctx.reply(`${allMentions}`, { reply_to_message_id: ctx.message.message_id })
        }
      }
    }
  }
}
