
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
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface IProps {
    trackUpload: {
        fileName: string;
        percent: number;
        uploadedTrackName: string;
    };
}

interface INewTrack {
    title: string;
    description: string;
    trackUrl: string;
    imgUrl: string;
    category: string;
}

interface IFileUpload {
    info: any;
    setInfo: any;
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
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


const handleSubmitForm = () => {
    console.log(">>> check info: ", info);
}

function InputFileUpload(props: IFileUpload) {
    //PROPS:
    const { setInfo, info } = props;
    //LIBRARY: 
    const { data: session } = useSession();
    const handleUpload = async (image: any) => {
        const formData = new FormData();
        formData.append('fileUpload', image);
        try {
            const res = await axios.post("http://localhost:8000/api/v1/files/upload", formData,
                {
                    headers: {
                        Authorization: `Bearer ${session?.access_token}`,
                        target_type: "images",
                    },
                }
            )

            if (res) {
                setInfo({
                    ...info,
                    imgUrl: res?.data?.data?.fileName,
                })
            }
        } catch (error) {
            //@ts-ignore
            alert(error?.response?.data?.message);
        }
    }
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onChange={(e) => {
                const event = e.target as HTMLInputElement;
                if (event.files) {
                    handleUpload(event.files[0]);
                }
            }}
        >
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}


const Step2 = (props: IProps) => {
    // STATE: 
    const [info, setInfo] = useState<INewTrack>({
        title: "",
        description: "",
        trackUrl: "",
        imgUrl: "",
        category: "",
    });
    //PROPS: 
    const { trackUpload } = props;

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

    useEffect(() => {
        if (trackUpload && trackUpload.uploadedTrackName) {
            setInfo({
                ...info,
                trackUrl: trackUpload.uploadedTrackName,
            })
        }
    }, [trackUpload])


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container >
                <Grid item xs={12}>
                    {trackUpload.fileName}
                    <LinearProgressWithLabel value={trackUpload.percent} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5} xl={5} >
                    <div className='left'>
                        <div className="left__content">
                            {info?.imgUrl &&
                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${info.imgUrl}`} />}
                        </div>
                        <InputFileUpload
                            info={info}
                            setInfo={setInfo}
                        />
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
                        <TextField
                            label="Title"
                            variant="standard"
                            value={info?.title}
                            onChange={(e) => setInfo({
                                ...info,
                                title: e.target.value,
                            })}
                        />
                        <TextField
                            label="Description"
                            variant="standard"
                            value={info?.description}
                            onChange={(e) => setInfo({
                                ...info,
                                description: e.target.value,
                            })}
                        />
                        <TextField
                            required
                            select
                            label="Category"
                            // SelectProps={{
                            //     native: true,
                            // }}
                            helperText="Please select category"
                            variant="standard"
                            value={info?.category}
                            onChange={(e) => setInfo({
                                ...info,
                                category: e.target.value,
                            })}
                        >
                            {categories.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>

                    </Box>
                    <Button variant="outlined" sx={{ marginLeft: "20px" }}
                        onClick={() => handleSubmitForm()}
                    >Save</Button>
                </Grid>
            </Grid>
        </Box >
    );
}

export default Step2;