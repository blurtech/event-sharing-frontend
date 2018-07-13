import React from "react";
import * as selectors from "../ducks/events-duck/Selectors";
import * as authSelectors from "../ducks/auth-duck/Selectors";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "material-ui";
import moment from "moment";
import { YMaps, Map, Placemark } from "react-yandex-maps";
const styles = theme => ({
  container: {
    display: "flex",
    marginTop: "100px",
    flexDirection: "column"
  },
  eachEvent: {
    marginBottom: 10,
    border: "2px solid black"
  },
  chips: {
    margin: theme.spacing.unit
  },
  title: {
    fontSize: 50
  }
});

class AddedEventsContainer extends React.Component {
  render() {
    const { classes } = this.props;
    const addedEvents = this.props.eventsList.filter(el => {
      return el.host === this.props.user.id;
    });
    console.log(addedEvents);
    return (
      <div className={classes.container}>
        <Typography variant="display2">Созданные события: </Typography>
        {addedEvents.length === 0 ? (
          <Typography variant="display1">
            Не создано ни одного события{" "}
          </Typography>
        ) : (
          addedEvents.map(event => {
            const thisCoordinates = event.place.split(",");
            return (
              <div className={classes.eachEvent}>
                <Typography variant="title">{event.name}</Typography>
                <Typography>{event.description}</Typography>
                <Typography variant="title">Тэги: </Typography>
                {event.tags.map((tag, index) => {
                  console.log(tag);
                  const tagEl = this.props.tags.find(el => {
                    return el.id === tag;
                  });
                  console.log("tagEl", tagEl);
                  return (
                    <Chip
                      className={classes.chips}
                      key={index}
                      label={tagEl.name}
                    />
                  );
                })}
                <Typography>
                  Начало{" "}
                  {moment(Number(event.start)).format("MM-DD-YYYY h:mm:ss")}
                </Typography>
                <Typography>
                  Окончание{" "}
                  {moment(Number(event.end)).format("MM-DD-YYYY h:mm:ss")}
                </Typography>
                <Typography variant="title">
                  Количество подписавшихся на событие:{event.guests.length}
                </Typography>
                <Typography variant="title">Месторасположение</Typography>
                <YMaps>
                  <Map
                    state={{
                      center: thisCoordinates,
                      zoom: 10,
                      controls: []
                    }}
                    instanceRef={this.setMapControlRef}
                  >
                    {console.log(thisCoordinates)}
                    <Placemark
                      geometry={{
                        coordinates: thisCoordinates
                      }}
                      properties={{
                        hintContent: event.name,
                        iconContent: "E"
                      }}
                      options={{
                        preset: "islands#nightCircleIcon"
                      }}
                    />
                  </Map>
                </YMaps>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  eventsList: selectors.selectFiltredEventsList(state),
  user: authSelectors.selectUser(state),
  tags: selectors.selectTagsList(state)
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(AddedEventsContainer));
