import ModuleComponent from "../ModuleComponent";

export default class ListRunModule extends ModuleComponent {
    render() {
        return (
            <div className="small">
                <div className="text-secondary mb-2">Recent runs</div>
                <div className="d-grid gap-2">
                    <div className="border rounded-2 p-2 bg-body">
                        <div className="d-flex justify-content-between">
                            <span>Run 1284</span>
                            <span className="badge text-bg-success">Complete</span>
                        </div>
                        <div className="text-secondary">Stability test - 12 min</div>
                    </div>
                    <div className="border rounded-2 p-2 bg-body">
                        <div className="d-flex justify-content-between">
                            <span>Run 1285</span>
                            <span className="badge text-bg-info">Queued</span>
                        </div>
                        <div className="text-secondary">Calibration sweep - 8 min</div>
                    </div>
                </div>
            </div>
        );
    }
}
