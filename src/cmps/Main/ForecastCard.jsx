import { useEffect, useRef } from 'react';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


import { utilService } from '../../services/util.service';
import { lottieService } from '../../services/lottie.service';
import { RiDeleteBin5Line } from 'react-icons/ri'
import { card, favoriteCard } from '../../config/style';


export const ForecastCard = (props) => {
    const { forecast, degreesType, cb, details, onRemove, } = props
    const min = forecast.Temperature.Minimum.Value
    const max = forecast.Temperature.Maximum.Value
    const temp = utilService.avgTemp(min, max, degreesType)
    const container = useRef(null)

    useEffect(() => {
        const instance = lottieService.loadLottie(container, loadAnimationData())
        return () => instance.destroy()
    }, [forecast])

    const loadAnimationData = () => {
        const res = utilService.getRelevantJsonByTemp(temp, degreesType);
        return res
    }

    const onCard = () => {
        if (cb) return cb(details)
    }

    return (
        <Card sx={details ? favoriteCard : card} onClick={onCard}>
            <CardActionArea >
                {details && <span className="delete-forecast-btn" onClick={(ev) => {
                    ev.stopPropagation()
                    onRemove(details)
                }}>
                    <RiDeleteBin5Line />
                </span>}
                <div className="lottie-container" ref={container}></div>
                <CardContent>
                    <Typography gutterBottom component="div">
                        <div className="card-content">
                            {details && <h4>{details.name}</h4>}
                            <div>
                                {utilService.getExactDate(forecast.Date)}
                                <p>
                                    {utilService.avgTemp(min, max, degreesType)}
                                    {utilService.checkDegreesType(degreesType)}
                                </p>
                            </div>
                        </div>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
