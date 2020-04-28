import type { MessageData } from "./types/MessageData"

export const MAX_FIELDS_PER_ROW = 3
export const FIELD_GRID_SIZE = 12

export const INITIAL_MESSAGE_DATA: MessageData = {
  "content": "**[TOURNAMENT_NAME]**",
  "embeds": [
    {
      "title": "ID 1",
      "description": "[PLAYER_NAME] & [PLAYER_NAME]",
      "color": 14308369,
      "fields": [
        {
          "name": "Area",
          "value": "??",
          "inline": true
        },
        {
          "name": "Time",
          "value": "??/??",
          "inline": true
        },
        {
          "name": "RUNS USED:",
          "value": "?/?",
          "inline": true
        },
        {
          "name": "DISCORD:",
          "value": "<@0000000000000> - <@000000000000>"
        }
      ],
      "footer": {
        "text": "Posted by [YOUR_NAME]",
        "icon_url": "[YOUR_DISCORD_ICON_URL]"
      },
      "timestamp": "2020-04-28T10:00:00.000Z"
    }
  ],
  "username": "Tournaments Manager"
}
