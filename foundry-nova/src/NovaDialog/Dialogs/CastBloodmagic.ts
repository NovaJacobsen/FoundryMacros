import { NovaDialog } from "..";
import { Checkbox } from "../Elements";
import template from "./CastBloodmagic.html"

const keys = {
  bp: 'BloodPoints',
  chat: 'SendToChat',
  level: 'Level',
  update: 'Update'
}


const create= () =>{
  const buttons = new Map<string, NovaDialog.Button>()
  buttons.set('confirm', {
    icon: 'skull',
    label: "Cast!",
    callback: castBloodmagic
  })

  const elements: NovaDialog.Element<any>[] = [
    new Checkbox(keys.bp, 'Spend blood point to reduce cost?'),
    new Checkbox(keys.chat, 'Send to chat?', true),
    new Checkbox(keys.update, 'Send updates to character sheet?', true),
  ]

  return new NovaDialog({
    title: "Blood Magic Cost",
    elements,
    buttons,
    template
  });
}

const cost = (params: NovaDialog.Params) => {
  const costs = [4, 8, 12, 16, 20, 25, 30, 35, 40]
  const bpCost = (params.get(keys.bp)!.bool() ? 1 : 0)
  const hpCost = costs[params.get(keys.level)!.number()-1] - bpCost
  const cCost = Math.floor(hpCost / 2)

  return {
    bpCost,
    hpCost,
    cCost,
  }
}

const castBloodmagic = (params: NovaDialog.Params) => {
  const me = game.user!.character
  const costs = cost(params)

  if (params.get(keys.chat)?.bool()) {
    ChatMessage.create({
      user: game.user!._id,
      content: `${me.name} cast a blood magic spell at level ${params.get(keys.level)?.number()} by spending ${costs.hpCost} health and ${costs.bpCost} blood points`,
      type: CONST.CHAT_MESSAGE_TYPES.EMOTE
    })
  }

}

const CastBloodMagic = create();
export { CastBloodMagic }