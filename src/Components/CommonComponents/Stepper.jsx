import { useContext, useEffect } from 'react';
import { FormContext } from '../Auth/Register';

function Stepper() {
    const { activeStepIndex } = useContext(FormContext);
    useEffect(() => {
        const stepperItems = document.querySelectorAll('.stepper-item');
        stepperItems.forEach((step, i) => {
            if (i <= activeStepIndex) {
                step.classList.add('bg-cyan-800', 'text-white');
            } else {
                step.classList.remove('bg-cyan-800', 'text-white');
            }
        });
    }, [activeStepIndex]);

    return (
        <div className="w-2/3 flex flex-row items-center justify-center sm:px-32 py-4 sm:max-w-xl">
            <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full">
                1
            </div>
            <div className="flex-auto border-t-2"></div>
            <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full">
                2
            </div>
        </div>
    );
}

export default Stepper;
