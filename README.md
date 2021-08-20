# Telegram bot to mention groups of users in a group chat

TODO

# Installation and local launch

1. Clone this repo: `git clone https://github.com/Moldoteck/GroupMentionsBot`
2. Launch the [mongo database](https://www.mongodb.com/) locally
3. Create `.env` with the environment variables listed below
4. Run `yarn install` in the root folder
5. Run `yarn develop`

And you should be good to go! Feel free to fork and submit pull requests. Thanks!

# Environment variables

- `TOKEN` — Telegram bot token
- `MONGO`— URL of the mongo database
- `OWNER_ID`— the id of the bot owner

Also, please, consider looking at `.env.sample`.

# License

MIT — use for any purpose. Would be great if you could leave a note about the original developers. Thanks!

Inspired from: https://github.com/backmeupplz/telegraf-template