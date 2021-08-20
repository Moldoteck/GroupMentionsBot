import { localeActions } from './handlers/language'
// Setup @/ aliases for modules
import 'module-alias/register'
// Config dotenv
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
// Dependencies
import { bot } from '@/helpers/bot'
import { ignoreOldMessageUpdates } from '@/middlewares/ignoreOldMessageUpdates'
import { sendHelp } from '@/handlers/sendHelp'
import { i18n, attachI18N } from '@/helpers/i18n'
import { setLanguage, sendLanguage } from '@/handlers/language'
import { attachUser } from '@/middlewares/attachUser'
import { attachChat } from '@/middlewares/attachChat'
import { addGroups, addUsers, listGroups, listUsers, rmGroups, rmUsers, tagGroups } from './handlers/groupManager'

// Middlewares
bot.use(ignoreOldMessageUpdates)
bot.use(attachUser)
bot.use(attachChat)
bot.use(i18n.middleware(), attachI18N)
// Commands
bot.command(['help', 'start'], sendHelp)
bot.command('language', sendLanguage)


bot.command('addgr', addGroups)
bot.command('rmgr', rmGroups)
bot.command('listgr', listGroups)
bot.command('taggr', tagGroups)

bot.command('addusr', addUsers)
bot.command('rmusr', rmUsers)
bot.command('listusr', listUsers)
// Actions
bot.action(localeActions, setLanguage)
// Errors
bot.catch(console.error)
// Start bot
bot.launch().then(() => {
  console.info(`Bot ${bot.botInfo.username} is up and running`)
})
