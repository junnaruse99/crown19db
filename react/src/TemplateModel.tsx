import './TemplateModel.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import TemplateInstance from './TemplateInstance';

function TemplateModel(){
    return (
        <div className="model-div">
            <header className="header-text">
                ModelNameHere
            </header>
            <p className="data-text">
                InstanceNameHere - 
            </p>
            <Router>
                    <nav>
                        <Link to="/TemplateInstance">TemplateInstance</Link>
                    </nav>
                    <Switch>
                <Route exact path="/TemplateInstance" component={TemplateInstance} />
            </Switch>
                </Router>
        </div>
    );
}

export default TemplateModel;