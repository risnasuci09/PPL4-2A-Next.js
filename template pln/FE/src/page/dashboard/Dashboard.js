import Logo from "../../images/plnLogo.png"
export default function Dashboard() {
    return (
        <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0" style={{fontWeight: 'normal'}}>Dashboard</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Dashboard v1</li>
                </ol>
            </div>
            
        </div>
    );
}