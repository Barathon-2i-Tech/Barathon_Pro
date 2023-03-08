import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';

export const FormFieldModel = ({
    grid,
    label,
    onBlur,
    onChange,
    value,
    name,
    error,
    helperText,
}) => {
    return (
        <Grid item xs={grid}>
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label={label || name}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                name={name}
                //convert to boolean using !! operator
                error={error}
                helperText={helperText}
            />
        </Grid>
    );
};

FormFieldModel.propTypes = {
    grid: PropTypes.number.isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    helperText: PropTypes.string,
};
