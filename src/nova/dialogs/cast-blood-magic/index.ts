import template from "./cast-blood-magic.html";
import { Checkbox, Constant, Dropdown, Output } from "../../elements";
import { NovaDialog } from "..";

const cost = [4, 8, 12, 16, 20, 25, 30, 35, 40];
const elements = {
  costs: new Constant("Costs", cost),
  level: new Dropdown("Level", {
    label: "Spell Level:",
    options: cost.map((_, i) => {
      return { label: `${i + 1}`, value: i + 1 };
    }),
  }),
  bp: new Checkbox("BloodPoints", {
    label: "Spend blood point to reduce cost?",
  }),
  bpCost: new Output("BloodCost", {
    label: "Blood point:",
    update: (model: Model) => (model.bp ? 1 : 0),
    default: 0,
  }),
  hpCost: new Output("HealthCost", {
    label: "HP:",
    update: (model: Model) => model.costs[model.level - 1] - model.bpCost * 3,
    default: 0,
  }),
  cCost: new Output("CorruptionCost", {
    label: "Corruption:",
    update: (model: Model) => Math.floor(model.hpCost / 2),
    default: 0,
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
  bpCost: number;
  hpCost: number;
  cCost: number;
  chat: boolean;
  level: number;
  update: boolean;
};

const callback= (me?: Actor) => (params: Model) => {

  if (params.update && me) {
    me.update({
      data: {
        attributes: {
          hp: { value: me.data.data.attributes.hp.value - params.hpCost },
        },
      },
    });
  }

  if (params.chat) {
    ChatMessage.create({
      user: game.user!._id,
      content: `${me?.name} cast a blood magic spell at level ${params.level} by spending ${params.hpCost} health and ${params.bpCost} blood points`,
      type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
    });
  }
};

export const castBloodMagic = (caller?: Actor) =>
  new NovaDialog({
    title: "Blood Magic Cost",
    elements,
    buttons: {
      confirm: {
        icon: "skull",
        label: "Cast!",
        callback: callback(caller || game.user?.character),
      },
    },
    template,
  });
