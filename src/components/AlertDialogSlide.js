import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

import { closeAlterDialogPage } from '../store/actions'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const AlertDialogSlide = ({ title, msg }) => {
  const dispatch = useDispatch()
  const isShowingAlertDialog = useSelector((state) => state.isShowingAlertDialog)
  const alertDialogPage = useSelector((state) => state.alertDialogPage)

  const handleClose = () => {
    dispatch(closeAlterDialogPage())
  }

  return (
    <React.Fragment>
      <Dialog
        open={isShowingAlertDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title || alertDialogPage.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{msg || alertDialogPage.msg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

AlertDialogSlide.propTypes = {
  title: PropTypes.string,
  msg: PropTypes.string,
}

export default AlertDialogSlide
