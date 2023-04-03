import PropTypes from 'prop-types';
import { Grid, TextField, Button, Box } from '@mui/material';
import { useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';

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
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        if (isLogoField) {
            const fileList = event.target.files;
            setFileName(fileList[0].name);
            onChange(event, fileList);
        } else {
            onChange(event);
        }
    };

    return (
        <Grid item xs={grid}>
            {isLogoField ? (
                <Box display="flex" alignItems="center">
                    <Button variant="contained" component="label">
                        <UploadIcon style={{ marginRight: '8px' }} />
                        Téléchargez un logo
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            name={name}
                            onChange={handleFileChange}
                        />
                    </Button>
                    <Box ml={2}>
                        <span>{fileName}</span>
                        {error && (
                            <div style={{ color: 'red', marginLeft: '8px' }}>
                                {helperText}
                            </div>
                        )}
                    </Box>
                </Box>
            ) : (
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={label || name}
                    onBlur={onBlur}
                    onChange={handleFileChange}
                    value={value}
                    name={name}
                    error={error}
                    helperText={helperText}
                />
            )}
        </Grid>
    );
};

FormFieldModel.propTypes = {
    grid: PropTypes.number.isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    helperText: PropTypes.string,
};