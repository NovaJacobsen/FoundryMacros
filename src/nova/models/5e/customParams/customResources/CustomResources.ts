import { BloodPoints, CharacterResources, Corruption } from ".";
import { Optional, Resources, CharacterData, Update } from "../../types";

export class CustomResources {
  bloodPoints: BloodPoints;
  corruption: Corruption;
  constructor(res: Resources, data: Partial<CustomResources>) {
    this.bloodPoints = data?.bloodPoints || new BloodPoints(res);
    this.corruption = data?.corruption || new Corruption(res);
  }

  static init(
    actorData: CharacterData
  ): [res: CharacterResources, updates: Update] {
    const resources: Resources = actorData.resources;
    let updateIndex: Optional<CustomResources> = {};
    let updateRes: Optional<Resources> = {};
    const data: CustomResources = new CustomResources(
      resources,
      actorData.nova?.resources
    );
    let out: any = {};
    for (let i in new CustomResources(resources, {})) {
      let key = i as keyof CustomResources;
      out[key] = {
        get: () => resources[data[key].current].value || 0,
        getKey: () => data[key].current,
        select: (k: keyof Resources) => {
          data[key].current = k;
          updateIndex = {};
          updateIndex[key] = { current: k };
          updateRes = {};
        },
        set: (n: number) => {
          resources[data[key].current].value = n;
          let r = (updateRes[data[key].current] ||= {});
          r.value = n;
        },
      };
    }
    return [out, { nova: { resources: updateIndex }, resources: updateRes }];
  }
}
