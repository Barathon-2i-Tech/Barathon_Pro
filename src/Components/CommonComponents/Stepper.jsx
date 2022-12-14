import { useContext, useEffect } from 'react';
import { FormContext } from '../Auth/RegisterHome';

function Stepper() {
    const { activeStepIndex } = useContext(FormContext);
    useEffect(() => {
        const stepperItems = document.querySelectorAll('.stepper-item');
        stepperItems.forEach((step, i) => {
            if (i <= activeStepIndex) {
                step.classList.add('bg-orange-400', 'text-white', 'button-style');
            } else {
                step.classList.remove('bg-cyan-800', 'text-white');
            }
        });
    }, [activeStepIndex]);

    return (
        <div className="w-full flex flex-row items-center justify-center sm:px-32 py-4 px-3.5 w-60-pct">

        <div className='flex flex-wrap justify-center'>
            <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full sm:mb-2.5">
                1
            </div>
            <div className="w-full text-center"> Verification de lage</div>
        </div>
            
        <div className="w-40 border-t-2 pb-bar-steps"></div>

        <div className='flex flex-wrap justify-center'>
            <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full sm:mb-2.5">
                2
            </div>
            <div className='w-full text-center'>Infos de connexion</div>
        </div>


        <div className="w-40 border-t-2 pb-bar-steps "></div>

            <div className='flex flex-wrap justify-center'>
                <div className="stepper-item w-8 h-8 text-center font-medium border-2 rounded-full sm:mb-2.5">
                    3
                </div>
            <div className='w-full text-center'>Details du compte</div>
        </div>
        </div>
    );
}

export default Stepper;
