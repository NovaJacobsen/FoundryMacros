import template from './cast-blood-magic.html'
import { Checkbox, Constant, Dropdown } from "../../_elements";
import { NovaDialog } from "..";

const cost = [4, 8, 12, 16, 20, 25, 30, 35, 40];
const context = {
  costs: new Constant(cost),
  level: new Dropdown("level", {
    label: "Spell Level:",
    options: cost.map((_, i) => {
      return { label: `${i + 1}`, value: i + 1 };
    }),
  }),
  bp: new Checkbox("BloodPoints", {
    label: "Spend blood point to reduce cost?",
  }),
  chat: new Checkbox("SendToChat", {
    label: "Send to chat?",
    default: true,
  }),
  update: new Checkbox("Update", {
    label: "Send updates to character sheet?",
    default: true,
  }),
};

type Model = {
  costs: number[];
  bp: boolean;
  chat: boolean;
  level: number;
  update: boolean;
};

const castBloodmagic = (params: Model) => {
  const me = game.user!.character;
  const bpCost = params.bp ? 1 : 0;
  const hpCost = params.costs[params.level - 1] - bpCost * 3;
  const cCost = Math.floor(hpCost / 2);
  const r = new Roll("1d20 < @dc", { dc: params.level });
  if (r.evaluate()) {
    ChatMessage.create({
      user: game.user!._id,
      roll: r,
      type: CONST.CHAT_MESSAGE_TYPES.ROLL,
    });
  }

  if (params.chat) {
    ChatMessage.create({
      user: game.user!._id,
      content: `${me.name} cast a blood magic spell at level ${params.level} by spending ${hpCost} health and ${bpCost} blood points`,
      type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
    });
  }
};

const buttons = {
  confirm: {
    icon: "skull",
    label: "Cast!",
    callback: castBloodmagic,
  },
};

export const CastBloodMagic = new NovaDialog({
  title: "Blood Magic Cost",
  elements: context,
  buttons,
  template,
});
