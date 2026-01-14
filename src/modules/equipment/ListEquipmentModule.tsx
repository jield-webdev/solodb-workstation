import ModuleComponent from "../ModuleComponent";

export default class ListEquipmentModule extends ModuleComponent {
    render() {
        return (
            <div className="small">
                <div className="text-secondary mb-2">Active equipment</div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        <span>Vacuum pump</span>
                        <span className="badge text-bg-success">Ready</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        <span>Flow meter</span>
                        <span className="badge text-bg-warning">Calibrate</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        <span>Chiller unit</span>
                        <span className="badge text-bg-success">Ready</span>
                    </li>
                </ul>
            </div>
        );
    }
}
