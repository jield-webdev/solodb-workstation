import { IrisOperatorDashboard } from "@jield/solodb-react-components";
import type { ModuleComponent } from "../ModuleComponent";

const Iris: ModuleComponent = () => {
  return (
    <div className="p-3">
      <div className="d-flex flex-wrap justify-content-between align-items-start mb-4">
        <div className="medium text-secondary">Iris</div>
      </div>

      <IrisOperatorDashboard />
    </div>
  );
};

export default Iris;
