// Step.js
import { useContext } from 'react';
import { FormContext } from '../Auth/RegisterHome';
import RegisterBarathonien from '../Auth/RegisterBarthonien';
import RegisterUser from '../Auth/RegisterUser';
import RegisterPro from '../Auth/RegisterPro';
import RegisterAgeVerify from '../Auth/RegisterAgeVerify';

function Step() {
    var stepContentBarathonien = document.getElementById('yes');

    const { activeStepIndex } = useContext(FormContext);
    let stepContent;
    switch (activeStepIndex) {
        case 0:
            stepContent = <RegisterAgeVerify />;
            break;
        case 1:
            stepContent = <RegisterUser />;
            break;
        case 2:
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
