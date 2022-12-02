import { useNavigate } from 'react-router-dom';
import { createContext, useState } from 'react';
import Stepper from '../CommonComponents/Stepper';
import Step from '../CommonComponents/Step';
import ApplicationLogo from '../CommonComponents/ApplicationLigo';
import { Link } from 'react-router-dom';

export const FormContext = createContext();

export default function Register() {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [formData, setFormData] = useState({});

    const [selected, setSelected] = useState('yes');

    const handleChange = (event) => {
        console.log(event.target.value);
        setSelected(event.target.value);
    };

    // Use this hook to programmatically navigate to another page
    const navigate = useNavigate();

    // This function is used to navigate to the home page
    // It will be called when the button is clicked
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="mx-auto max-w-screen-2xl ">
            <div className="w-fit inline-block text-white lg:text-xl">
                <button
                    onClick={goBack}
                    className="w-fit m-2 sm:mt-6 sm:ml-6 bg-orange-300 hover:border-solid hover:border-white-900 hover:border-2 pt-2 pb-2 pr-4 pl-4 rounded-lg"
                >
                    Acceuil
                </button>
            </div>
            <div className="z-10 flex justify-center items-center">
                <Link href="/">
                    <ApplicationLogo className="w-16 h-16 sm:w-28 sm:h-28 fill-current z-10" />
                </Link>
            </div>

            <div className="flex justify-center">
                <div className="wrapper max-w-2xl inline-flex  bg-white items-center justify-evenly  border-xs sm:p-8 p-2 w-full">
                    <div className="relative">
                        <input
                            type="radio"
                            id="yes"
                            className="barathonienRadio absolute"
                            name="choose"
                            value="yes"
                            checked={selected === 'yes'}
                            onChange={handleChange}
                        />
                        <label
                            className="font-semibold cursor-pointer border-2 option option-1 h-full w-full flex items-center justify-evenly  
                hover:border-solid hover:border-white-900 hover:border-2 pt-2 pb-2 pr-4 pl-4 rounded-lg"
                        >
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
                            checked={selected === 'no'}
                        />
                        <label
                            className="
                        font-semibold cursor-pointer border-2 option option-2 h-full w-full flex items-center justify-evenly hover:border-solid hover:border-white-900 hover:border-2 pt-2 pb-2 pr-4 pl-4 rounded-lg"
                        >
                            <div className="dot"></div>
                            <span>Professionnel</span>
                        </label>
                    </div>
                </div>
            </div>

            <FormContext.Provider
                value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
            >
                <div className="sm:w-screen flex flex-col items-center justify-start">
                    <Stepper />
                    <Step />
                </div>
            </FormContext.Provider>
        </div>
    );
}
