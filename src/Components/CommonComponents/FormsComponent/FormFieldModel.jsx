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
    const isLogoField = name === 'logo';
    const handleFileChange = (event) => {
        if (isLogoField) {
            const fileList = event.target.files;
            onChange(event, fileList);
        } else {
            onChange(event);
        }
    };

    return (
        <Grid item xs={grid}>
            <TextField
                fullWidth
                variant="filled"
                type={isLogoField ? 'file' : 'text'}
                label={label || name}
                onBlur={onBlur}
                onChange={handleFileChange}
                value={isLogoField ? undefined : value}
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
