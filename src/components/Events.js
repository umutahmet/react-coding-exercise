import React from 'react'
import { createUseStyles } from 'react-jss'
import { useSelector } from 'react-redux'
import { getEvents, getEventsCount, getEventsError, isEventsReady } from '../selectors'
import { ReactComponent as TitleIcon } from '../icons/vivid-angle-top-left.svg'
import theme from '../style/theme'
import Event from './Event'
import Loader from './Loader'

const Events = () => {
  const classes = useStyles()
  const ready = useSelector(isEventsReady)
  const count = useSelector(getEventsCount)
  const events = useSelector(getEvents)
  const error = useSelector(getEventsError)

  if (error) {
    return (
      <div className={classes.errorContainer}>
        <div>
          <h1 className={classes.errorTitle}>Whoops! <br />Something went wrong.</h1>
          <div className={classes.errorText}>
            <p><strong>Looks like we couldn't find any events.</strong></p>
            <p>Our engineers have been notified, but in the mean time please take a look at the full events listing.</p>
            <a href='/' className={classes.button}>See all events</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>
        <TitleIcon className={classes.titleIcon} />
        {ready ? `Results: ${count} events found` : 'Results'}
      </h3>
      {!ready && <Loader />}
      {ready && (
        <div className={classes.tilesWrapper}>
          <div className={classes.tiles}>
            {events.map(event => <Event key={event.id} className={classes.tile} content={event} />)}
          </div>
        </div>
      )}
    </div>
  )
}

const useStyles = createUseStyles({
  title: {
    paddingLeft: 20,
    position: 'relative'
  },
  titleIcon: {
    position: 'absolute',
    left: 0,
    top: 5,
    width: 11,
    height: 11,
    fill: 'currentColor'
  },
  tilesWrapper: {
    margin: [0, 'auto'],
    maxWidth: theme.maxTileWidth,
    '@media (min-width: 768px)': {
      maxWidth: theme.maxTileWidth * 2 + theme.gutter
    },
    '@media (min-width: 1200px)': {
      maxWidth: theme.maxTileWidth * 3 + theme.gutter * 2
    }
  },
  tiles: {
    '@media (min-width: 768px)': {
      marginLeft: -theme.gutter / 2,
      marginRight: -theme.gutter / 2,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start'
    }
  },
  tile: {
    margin: [0, 'auto', theme.gutter],
    maxWidth: theme.maxTileWidth,
    '@media (min-width: 768px)': {
      marginLeft: theme.gutter / 2,
      marginRight: theme.gutter / 2,
      width: `calc(50% - ${theme.gutter}px)`
    },
    '@media (min-width: 1200px)': {
      width: `calc(${100 / 3}% - ${theme.gutter}px)`
    }
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 500,
    height: 400,
    margin: '0 auto',
    textAlign: 'center',
    paddingLeft: theme.gutter,
    paddingRight: theme.gutter
  },
  errorTitle: {
    marginBottom: theme.gutter * 2
  },
  errorText: {
    fontSize: 16
  },
  button: {
    display: 'inline-block',
    fontFamily: theme.fonts.headings,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    padding: [5, 28],
    marginTop: theme.gutter * 2,
    '&:hover': {
      color: theme.colors.white,
      backgroundColor: theme.colors.secondary,
      transition: 'background-color 0.3s ease-in'
    }
  }
}, { name: 'Events' })

export default Events
