// Step.js
import { useContext } from 'react';
import { FormContext } from '../Auth/Register';
import RegisterBarathonien from '../Auth/RegisterBarathonien';
import RegisterUser from '../Auth/RegisterUser';
import RegisterPro from '../Auth/RegisterPro';

function Step() {
    var stepContentBarathonien = document.getElementById('yes');

    const { activeStepIndex } = useContext(FormContext);
    let stepContent;
    switch (activeStepIndex) {
        case 0:
            stepContent = <RegisterUser />;
            break;
        case 1:
            if (stepContentBarathonien.checked) {
                stepContent = <RegisterBarathonien />;
            } else {
                stepContent = <RegisterPro />;
            }
            break;
        default:
            break;
    }

    return stepContent;
}

export default Step;
