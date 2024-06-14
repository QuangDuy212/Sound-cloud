
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './step2.scss';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const categories = [
    {
        value: 'CHILL',
        label: 'CHILL',
    },
    {
        value: 'WORKOUT',
        label: 'WORKOUT',
    },
    {
        value: 'PARTY',
        label: 'PARTY',
    },
];

const Step2 = () => {
    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container >
                <Grid item xs={12}>
                    Upload track:
                    <LinearProgressWithLabel value={progress} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5} xl={5} >
                    <div className='left'>
                        <div className="left__content">
                            <img src="https://i1.sndcdn.com/artworks-4uzPxyIN5YK7qzum-k7v73Q-t500x500.jpg" />
                        </div>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: "20px", width: '92%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="standard-basic" label="Title" variant="standard" />
                        <TextField id="standard-basic" label="Description" variant="standard" />
                        <TextField
                            id="standard-select-currency-native"
                            select
                            label="Category"
                            defaultValue="EUR"
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select category"
                            variant="standard"
                        >
                            {categories.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>

                    </Box>
                    <Button variant="outlined" sx={{ marginLeft: "20px" }}>Save</Button>
                </Grid>
            </Grid>
        </Box >
    );
}

export default Step2;