import React from 'react'
import { createUseStyles } from 'react-jss'
import { ReactComponent as LoaderIcon } from '../icons/vivid-angle-top-left.svg'
import theme from '../style/theme'

const Loader = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.loader}>
        <LoaderIcon className={classes.loaderIcon} />
        <p className={classes.loaderText}>Loading ...</p>
      </div>
    </div>
  )
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    height: 400,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader: {
    position: 'relative'
  },
  loaderIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 35,
    height: 35,
    fill: theme.colors.secondary,
    zIndex: 5,
    animation: '$slideOut 1s infinite alternate',
    animationTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)'
  },
  loaderText: {
    position: 'relative',
    fontFamily: theme.fonts.headings,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 28,
    color: theme.colors.black,
    backgroundColor: theme.colors.grey,
    padding: '5px 28px',
    zIndex: 10
  },
  '@keyframes slideOut': {
    from: { transform: 'translate(0, 0)' },
    to: { transform: 'translate(-20px, -20px)' }
  }
})

export default Loader
