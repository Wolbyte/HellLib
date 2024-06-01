import React, { memo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const FormPropsTextFields = memo(() => {
    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width: '150vh',
                backgroundColor: '#fff',
                padding: 2,
                direction: 'rtl',
            }}
            noValidate
            autoComplete="off"
        >
            <Box
                sx={{
                    display: 'flex',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    width: '110%',
                    maxWidth: '2500px',
                    height: '600px',
                }}
            >
                {/* Right white section */}
                <Box
                    sx={{
                        width: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '24px',
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            marginBottom: '16px',
                            color: '#2196f3',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            textAlign: 'left',
                        }}
                    >
                        افزودن دانش‌آموز
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '16px',
                            marginBottom: '16px',
                        }}
                    >
                        <TextField
                            required
                            id="outlined-disabled"
                            label="نام خانوادگی"
                            defaultValue="نام خانوادگی"
                            sx={{ width: '100%' }}
                            inputProps={{ style: { textAlign: 'right' } }}
                            InputLabelProps={{ style: { textAlign: 'right', width: '100%' } }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="نام"
                            defaultValue="نام"
                            sx={{ width: '100%' }}
                            inputProps={{ style: { textAlign: 'right' } }}
                            InputLabelProps={{ style: { textAlign: 'right', width: '100%' } }}
                        />
                        <TextField
                            required
                            id="outlined-number-class"
                            label="شماره کلاسی"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                                style: { textAlign: 'right', width: '100%' },
                            }}
                            sx={{ width: '100%' }}
                            inputProps={{ style: { textAlign: 'right' } }}
                        />
                        <TextField
                            required
                            id="outlined-number-national"
                            label="کدملی"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                                style: { textAlign: 'right', width: '100%' },
                            }}
                            sx={{ width: '100%' }}
                            inputProps={{ style: { textAlign: 'right' } }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '16px',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            تایید
                        </Button>
                    </Box>
                </Box>

                {/* Left blue section */}
                <Box
                    sx={{
                        width: '20%',
                        backgroundColor: '#2196f3',
                        borderTopLeftRadius: '8px',
                        borderBottomLeftRadius: '8px',
                    }}
                />
            </Box>
        </Box>
    );
});

export default FormPropsTextFields;