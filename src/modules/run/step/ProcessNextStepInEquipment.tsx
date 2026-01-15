import { getEquipment, listRuns } from "@jield/solodb-typescript-core";
import ModuleComponent from "../../ModuleComponent";

export default class ProcessNextStepInEquipment extends ModuleComponent {
  render() {
    const asdf = async () => {
      let equipment = await getEquipment({ id: 3 });
      listRuns({
        environment: "default",
        firstUnfinishedStepEquipment: equipment,
      }).then((runs) => {
        console.log(runs);
      });
    };
    asdf();

    return (
      <div className="small">
        <div className="text-secondary mb-2">Step to process:</div>
      </div>
    );
  }
}
