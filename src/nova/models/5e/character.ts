import { CharacterAttributes } from "./customParams/attributes";
import { Attributes } from "./customParams/attributes/Attributes";
import { CharacterResources } from "./customParams/customResources";
import { CustomResources } from "./customParams/customResources/CustomResources";
import { CharacterActor, Update } from "./types";

export class Character {
  private actor: CharacterActor;
  private updates: Update;
  public customResources: CharacterResources;
  public attributes: CharacterAttributes;

  constructor(actor: Actor) {
    this.actor = actor;
    this.updates = {} as Update;
    this.customResources = CustomResources.init(
      this.actor.data.data,
      this.updates
    );
    this.attributes = Attributes.init(this.actor.data.data, this.updates);
  }

  get resorces() {
    return this.actor.data.data.resources;
  }

  public _reset(): void {
    delete this.actor.data.data.nova;
    //@ts-ignore
    this.updates = { nova: false };
    this.save();
  }

  get name() {
    return this.actor.data.name;
  }

  public save(dryRun?: boolean) {
    if (dryRun) return console.info({ data: this.updates });
    this.actor.update({ data: this.updates });
    this.updates = {};
  }
}
