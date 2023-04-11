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
    const isLogoField = name === 'logo' || name === 'poster';
    const isDateTimePickerField = name === 'start_event' || name === 'end_event';
    const [fileName, setFileName] = useState('');

    const handleChange = (event) => {
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
                            onChange={handleChange}
                        />
                    </Button>
                    <Box ml={2}>
                        <span>{fileName}</span>
                        {error && (
                            <div style={{ color: 'red', marginLeft: '8px' }}>{helperText}</div>
                        )}
                    </Box>
                </Box>
            ) : (
                <>
                    {isDateTimePickerField ? (
                        <TextField
                            fullWidth
                            variant="filled"
                            label={label || name}
                            type={name === 'start_event' ? 'datetime-local' : 'datetime-local'}
                            onBlur={onBlur}
                            onChange={handleChange}
                            value={value}
                            name={name}
                            error={error}
                            helperText={helperText}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    ) : (
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label={label || name}
                            onBlur={onBlur}
                            onChange={handleChange}
                            value={value}
                            name={name}
                            error={error}
                            helperText={helperText}
                            multiline={name === 'description'}
                            rows={name === 'description' ? 4 : undefined}
                        />
                    )}
                </>
            )}
        </Grid>
    );
};

FormFieldModel.propTypes = {
    grid: PropTypes.number.isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    helperText: PropTypes.string,
};
