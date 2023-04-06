import { useNavigate } from 'react-router-dom';
import { createContext, useState } from 'react';
import Stepper from '../../Components/CommonComponents/Stepper';
import Step from '../../Components/CommonComponents/Step';
import ApplicationLogo from '../../Components/CommonComponents/SvgComponent/ApplicationLogo';

export const FormContext = createContext();

export default function Register() {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [formData, setFormData] = useState({});

    const [selected, setSelected] = useState('yes');

    const handleChange = (event) => {
        setSelected(event.target.value);
    };
    const switcherClick = () => {
        var buttonStyleCustom = document.getElementById('container-form');
        if (selected === 'no') {
            buttonStyleCustom.classList.add('style-orange');
            buttonStyleCustom.classList.remove('style-cyan');
        } else {
            buttonStyleCustom.classList.add('style-cyan');
            buttonStyleCustom.classList.remove('style-orange');
        }
    };

    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const onHomeClick = () => {
        navigate('/');
    };

    return (
        <div className="mx-auto max-w-screen-2xl ">
            <div className="w-fit inline-block text-white lg:text-xl">
                <button
                    onClick={onHomeClick}
                    className="w-fit m-2 sm:mt-6 sm:ml-6 bg-orange-300 hover:border-solid hover:border-white-900 hover:border-2 pt-2 pb-2 pr-4 pl-4 rounded-lg"
                >
                    Accueil
                </button>
            </div>
            <div className="z-10 flex justify-center items-center">
                <ApplicationLogo className="w-16 h-16 sm:w-28 sm:h-28 fill-current z-10" />
            </div>

            <div className="flex justify-center">
                <div className="wrapper max-w-2xl inline-flex dark:bg-transparent bg-white items-center justify-center  border-xs sm:p-8 p-5 w-full">
                    <div className="relative">
                        <input
                            type="radio"
                            id="yes"
                            className="barathonienRadio absolute"
                            name="choose"
                            value="yes"
                            checked={selected === 'yes'}
                            onChange={handleChange}
                            onClick={switcherClick}
                        />
                        <label className="border-left font-semibold cursor-pointer border-2 option option-1 h-full w-full flex items-center justify-evenly hover:border-solid hover:border-cyan-900 hover:border-2 pt-2 pb-2 pr-4 pl-4">
                            <div className="dot"></div>
                            <span>Barathonien</span>
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type="radio"
                            id="no"
                            className="proRadio absolute"
                            name="choose"
                            value="no"
                            onChange={handleChange}
                            onClick={switcherClick}
                            checked={selected === 'no'}
                        />
                        <label className="border-right font-semibold cursor-pointer border-2 option option-2 h-full w-full flex items-center justify-evenly hover:border-solid hover:border-white-900 hover:border-2 pt-2 pb-2 pr-4 pl-4">
                            <div className="dot"></div>
                            <span>Professionnel</span>
                        </label>
                    </div>
                </div>
            </div>

            <FormContext.Provider
                value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
            >
                <div id="container-form" className="flex flex-col items-center justify-start">
                    <Stepper />
                    <Step />
                </div>
            </FormContext.Provider>
        </div>
    );
}
