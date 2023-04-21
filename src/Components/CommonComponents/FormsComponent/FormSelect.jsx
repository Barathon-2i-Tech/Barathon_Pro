import PropTypes from 'prop-types';
import { InputLabel, MenuItem, Select, Box } from '@mui/material';

export const FormSelect = ({
    allCategories,
    formikCategories,
    handleCategoryChange,
    handleSubmit,
    submitClass,
}) => {
    return (
        <>
            <div className="rounded-xl bg-teal-700">
                <Box m="20px" pt="20px" pb="20px">
                    <div className="categorie-title text-2xl text-white font-bold pt-6">
                        VOS CATEGORIES :
                    </div>
                    <div className="">
                        <form className=" sm:pb-4" onSubmit={handleSubmit}>
                            <div className="flex-wrap">
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
                            </div>
                            <div className="flex md:justify-end">
                                <button type="submit" className={submitClass}>
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

FormSelect.propTypes = {
    allCategories: PropTypes.array.isRequired,
    formikCategories: PropTypes.object.isRequired,
    handleCategoryChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitClass: PropTypes.string,
};
