import template from "./cast-blood-magic.html";
import { Checkbox, Constant, Dropdown, Output } from "../../elements";
import { NovaDialog } from "..";
import { Character } from "../../models/5e";
import { Elements, Model } from "./types";
import { AttrDropdown } from "../../elements/Dropdown";

export const castBloodMagic = (char?: Actor): NovaDialog<Model> => {
  char ||= game.user?.character;
  let me = char ? new Character(char) : undefined;

  const cost = [4, 8, 12, 16, 20, 25, 30, 35, 40];

  const elements: Elements = {
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
      default: !!me,
      disabled: !me,
    }),
  };

  if (me) {
    elements.bpCurr = new Output("BloodCurrent", {
      label: "/",
      update: me.customResources.bloodPoints.get,
      default: 0,
    });
    elements.cCurr = new Output("CorruptionCurrent", {
      label: "/",
      update: me.customResources.corruption.get,
      default: 0,
    });
    elements.hpCurr = new Output("HealthCurrent", {
      label: "/",
      update: me.attributes.hp.get,
      default: 0,
    });
    elements.bpAttr = new AttrDropdown("BloodAttr", {
      label: "Resource for Bloodpoints:",
      char: me,
      r: me.customResources.bloodPoints,
    });
    elements.cAttr = new AttrDropdown("CorruptionAttr", {
      label: "Resource for Corruption:",
      char: me,
      r: me.customResources.corruption,
    });
  }

  const callback = (params: Model) => {
    if (params.update && me) {
      let bp = me.customResources.bloodPoints;
      bp.set(bp.get() - params.bpCost);

      let c = me.customResources.corruption;
      c.set(c.get() + params.cCost);

      let hp = me.attributes.hp;
      hp.set(hp.get() - params.hpCost);

      me.save(true);
      me.save();
    }

    if (params.chat) {
      ChatMessage.create({
        user: game.user!._id,
        content: `${me ? me.name : "I"} cast a blood magic spell at level ${
          params.level
        } by spending ${params.hpCost} health and ${
          params.bpCost
        } blood points`,
        type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
      });
    }
  };

  return new NovaDialog({
    title: me ? `${me.name} casting BloodMagic` : "Cast BloodMagic",
    elements,
    buttons: {
      confirm: {
        icon: "skull",
        label: "Cast" + (me ? " as " + me?.name : "!"),
        callback: callback,
      },
    },
    template,
  });
};
