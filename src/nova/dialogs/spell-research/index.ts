import { NovaDialog } from "..";
import {
  Checkbox,
  Dropdown,
  ImagePicker,
  Output,
  TextInput,
} from "../../elements";
import { Character } from "../../models/5e";
import template from "./spell-research.html";
import { Elements, Model } from "./types";

export const spellResearch = (char?: Actor): NovaDialog<any> => {
  char ||= game.user?.character;
  let me = char ? new Character(char) : undefined;

  const elements: Elements = {
    level: new Dropdown("Level", {
      label: "Spell Level:",
      options: new Array(10).fill(null).map((_, i) => {
        if (i === 0) return { label: "cantrip", value: 0 };
        return { label: `${i}`, value: i };
      }),
    }),
    custom: new Checkbox("CustomSpell", {
      label: "Is this a custom spell? (increases cost!)",
    }),
    weekly: new Output("WeeklyCost", {
      label: "Per week: ",
      update: (model: Model) => (model.custom ? 500 : 200),
      default: 0,
    }),
    time: new Output("Time", {
      label: "Time: ",
      update: (model: Model) => (model.level || 1) * 2,
      default: 0,
    }),
    total: new Output("Total", {
      label: "Total: ",
      update: (model: Model) => model.weekly * (model.level * 2 || 1),
      default: 0,
    }),
    check: new Output("Check", {
      label: "Skill check (Arcana): ",
      update: (model: Model) =>
        model.custom ? (model.level || 1) * 5 + 20 : 25,
      default: 0,
    }),
    image: new ImagePicker("Image", { default: "icons/svg/light.svg" }),
    name: new TextInput("Name", { placeholder: "Spell Name" }),
  };

  const callback = (model: Model) => {
    ChatMessage.create({
      user: game.userId!,
      content: `<h3>${me ? me.name : ""} created a new spell research!</h3>
      <div>It will require <b>${model.time}</b> weeks to finish, and <b>${
        model.total
      }</b> to fully finance (at a rate of <b>${model.weekly}</b> per week)
      </div>
      <div>
      The first skill check will be arcana DC <b>${
        model.check
      }</b> after the required time.
      </div>
      <div>
      Reduce this by 2 and attempt again after a week until the check is passed
      </div>
      <div>
      Once the check is passed add <b>${model.name || 'the researched spell'}</b> to your spell list
      </div>`,
      type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
    });
  };

  return new NovaDialog({
    title: "Creating spell",
    elements: elements,
    buttons: {
      confirm: {
        icon: "Magic",
        label: "Start Project",
        callback: callback,
      },
    },
    template,
    options: { height: 420 },
  });
};
