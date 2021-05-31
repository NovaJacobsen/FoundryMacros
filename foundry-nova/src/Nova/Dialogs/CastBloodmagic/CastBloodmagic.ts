import { Nova } from "../../..";
import template from "./CastBloodmagic.html";

type Model = {
  costs: number[];
  bp: boolean;
  chat: boolean;
  level: number;
  update: boolean;
};

const create = () => {
  const buttons = {
    confirm: {
      icon: "skull",
      label: "Cast!",
      callback: castBloodmagic,
    },
  };

  const cost = [4, 8, 12, 16, 20, 25, 30, 35, 40];
  const context = {
    costs: new Nova.Elements.Constant(cost),
    level: new Nova.Elements.Dropdown("level", {
      label: "Spell Level:",
      options: cost.map((_, i) => {
        return { label: `${i + 1}`, value: i + 1 };
      }),
    }),
    bp: new Nova.Elements.Checkbox("BloodPoints", {
      label: "Spend blood point to reduce cost?",
    }),
    chat: new Nova.Elements.Checkbox("SendToChat", {
      label: "Send to chat?",
      default: true,
    }),
    update: new Nova.Elements.Checkbox("Update", {
      label: "Send updates to character sheet?",
      default: true,
    }),
  };

  return new Nova.Dialog({
    title: "Blood Magic Cost",
    elements: context,
    buttons,
    template,
  });
};

const cost = (params: Model) => {
  const bpCost = params.bp ? 1 : 0;
  const hpCost = params.costs[params.level - 1] - bpCost * 3;
  const cCost = Math.floor(hpCost / 2);

  return {
    bpCost,
    hpCost,
    cCost,
  };
};

const castBloodmagic = (params: Model) => {
  const me = game.user!.character;
  const costs = cost(params);
  const r = new Roll("1d20 < @dc", { dc: params.level });
  if (r.evaluate()) {
    ChatMessage.create({
      user: game.user!._id,
      roll: r,
      type: CONST.CHAT_MESSAGE_TYPES.WHISPER,
    });
  }

  if (params.chat) {
    ChatMessage.create({
      user: game.user!._id,
      content: `${me.name} cast a blood magic spell at level ${0} by spending ${
        costs.hpCost
      } health and ${costs.bpCost} blood points`,
      type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
    });
  }
};

const CastBloodMagic = create();
export { CastBloodMagic };
