import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from '../Assets/partyInTheForest.jpg'


const styles = {
    parentCard: {
        display:'flex',
        flexWrap:'wrap',
        maxWidth:
    },
    card: {
        width: 300,
        maxHeight: 450,
        minHeight: 450,
        marginLeft: '5px',
        marginRight: '5px',
        fontFamily: 'Verdana, Geneva, sans-serif',



    },
    media: {
        height: 10,
        paddingTop: '56.25%', // 16:9
    },
    inCardButton: {
        display:'flex',
        alignItems:'flex-end'
    }

};


const EventPreview = props => {
    const {classes} = props;
    return (
        <div className={classes.parentCard}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={img}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {props.event.name}
                    </Typography>
                    <Typography component="p">
                        {props.event.host}
                    </Typography>
                    {props.event.description}
                    <Typography>

                    </Typography>
                </CardContent>
                <CardActions className={classes.inCardButton}>
                    <Button size="small" color="primary">
                        I`ll be here
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>

        </div>
    );
}


export default withStyles(styles)(EventPreview);


