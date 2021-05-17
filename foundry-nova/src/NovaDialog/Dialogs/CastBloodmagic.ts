import { NovaDialog } from "..";
import { Checkbox } from "../Elements";
import template from "./CastBloodmagic.html"

type Model = {
  bp: boolean,
  chat: boolean,
  //   level: number,
  update: boolean,
}

const create = () => {
  const buttons = {
    confirm: {
      icon: 'skull',
      label: "Cast!",
      callback: castBloodmagic
    }
  }

  const context = {
    bp: new Checkbox('BloodPoints', {
      label: 'Spend blood point to reduce cost?',
    }),
    chat: new Checkbox('SendToChat', {
      label: 'Send to chat?',
      default: true,
    }),
    update: new Checkbox('Update', {
      label: 'Send updates to character sheet?',
      default: true,
    }),
  }

  return new NovaDialog({
    title: "Blood Magic Cost",
    elements: context,
    buttons,
    template,
  });
}


const cost = (params: Model) => {
  const costs = [4, 8, 12, 16, 20, 25, 30, 35, 40]
  const bpCost = (params.bp ? 1 : 0)
  const hpCost = 0 //costs[params.get(keys.level)!.number()-1] - bpCost*3
  const cCost = Math.floor(hpCost / 2)

  return {
    bpCost,
    hpCost,
    cCost,
  }
}

const castBloodmagic = (params: Model) => {
  const me = game.user!.character
  const costs = cost(params)

  if (params.chat) {
    ChatMessage.create({
      user: game.user!._id,
      content: `${me.name} cast a blood magic spell at level ${0} by spending ${costs.hpCost} health and ${costs.bpCost} blood points`,
      type: CONST.CHAT_MESSAGE_TYPES.EMOTE
    })
  }

}

const CastBloodMagic = create();
export { CastBloodMagic }