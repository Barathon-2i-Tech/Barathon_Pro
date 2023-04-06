import PropTypes from 'prop-types';
import { InputLabel, MenuItem, Select, Box } from '@mui/material';
import Parser from 'html-react-parser';

export const FormSelectEstablishment = ({
    allCategories,
    formikCategories,
    handleCategoryChange,
    categoriesSelected,
    handleFormReset,
    handleSubmit,
}) => {
    return (
        <>
            <div className="rounded-xl bg-teal-700">
                <Box m="20px" pt="20px" pb="20px">
                    <div className="categorie-title text-2xl text-white font-bold pt-6">
                        CATEGORIES DE VOTRE ETABLISSMENT :
                    </div>
                    <div className="">
                        <form className="py-4 sm:pb-4" onSubmit={handleSubmit}>
                            <div className="flex py-6 flex-wrap">
                                <div className="categories_selected-container flex flex-col py-4 mr-10">
                                    <InputLabel
                                        id="options-label"
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            paddingBottom: '10px',
                                        }}
                                    >
                                        Categories (4 categories maximum)
                                    </InputLabel>
                                    <Select
                                        labelId="options-label"
                                        id="options"
                                        style={{
                                            minWidth: 120,
                                            color: 'white',
                                            border: '1px solid white',
                                            fontWeight: 'bold',
                                        }}
                                        multiple
                                        defaultValue={formikCategories.initialValues.options}
                                        value={formikCategories.values.options}
                                        onChange={handleCategoryChange}
                                        inputProps={{
                                            name: 'options',
                                        }}
                                    >
                                        {allCategories.map((allEstablishment) => {
                                            const categoryDetails = JSON.parse(
                                                allEstablishment.category_details,
                                            );
                                            return (
                                                <MenuItem
                                                    key={allEstablishment.category_id}
                                                    value={allEstablishment.category_id}
                                                >
                                                    {categoryDetails.label}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </div>
                                <div className="categories_selected-container flex flex-col justify-between py-4 px-6 bg-gray-200 rounded-xl ml-4">
                                    <div className="font-bold pr-4 text-base text-black">
                                        NOUVELLES CATEGORIES ENREGISTRÉES :{' '}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {categoriesSelected.map((allCategoriesSelected) => {
                                            const categoryDetails = JSON.parse(
                                                allCategoriesSelected.category_details,
                                            );
                                            return (
                                                <div
                                                    key={allCategoriesSelected.category_id}
                                                    value={allCategoriesSelected.category_id}
                                                    className="categories_selected-list flex items-center pr-4 mt-4 lg:mt-0"
                                                >
                                                    <div className="categories_selected-list_icon-container p-4 flex bg-white rounded-lg">
                                                        <div className="categories_selected-list_icon pr-2">
                                                            {Parser(categoryDetails.icon)}
                                                        </div>
                                                        <div className="categories_selected-list_label">
                                                            {categoryDetails.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="flex md:justify-end">
                                <button
                                    type="button"
                                    className="sm:ml-7 mt-7 ml-2 sm:mt-4 mb-7 sm:mb-0 text-white bg-red-700 hover:border-solid hover:border-white-900 hover:border-2 rounded-lg font-bold"
                                    onClick={() => handleFormReset()}
                                >
                                    Effacer ma selection
                                </button>
                                <button
                                    type="submit"
                                    className="sm:ml-7 mt-7 ml-2 sm:mt-4 mb-7 sm:mb-0 bg-white text-black font-bold"
                                >
                                    Enregistrer mon/mes Categories
                                </button>
                            </div>
                        </form>
                    </div>
                </Box>
            </div>
        </>
    );
};

FormSelectEstablishment.propTypes = {
    allCategories: PropTypes.array.isRequired,
    formikCategories: PropTypes.object.isRequired,
    handleCategoryChange: PropTypes.func.isRequired,
    categoriesSelected: PropTypes.array.isRequired,
    handleFormReset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};
