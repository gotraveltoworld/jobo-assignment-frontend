import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'

import { saveOrder, cleanOrderDetailMessage } from '../store/actions'

const BasicTable = ({ patients }) => {
  const dispatch = useDispatch()

  const [isShowing, setIsShowing] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [message, setMessage] = useState(null);
  const [patientName, setPatientName] = useState('');

  const orderDetailIsError = useSelector(state => state.orderDetail.isError)
  const orderDetailMessage = useSelector(state => state.orderDetail.message)

  const renderOrderDialog = (patientName, patientId, message) => {
    setMessage(message || '')
    setPatientId(patientId || '')
    setPatientName(patientName || '<病患大名>')
    setIsShowing(true)
  }

  const handleClose = () => {
    dispatch(cleanOrderDetailMessage())
    setIsShowing(false)
  }

  const handleCloseSaveOrder = async () => {
    dispatch(saveOrder(patientId, message))
    setMessage(message)
  }

  return (
    <React.Fragment>
      <Dialog
        open={isShowing}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{patientName}的醫囑</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" component={'span'}>
            <TextField
              multiline
              id="item-message"
              value={message || ''}
              onChange={e => setMessage(e.target.value)}
              error={orderDetailIsError}
              helperText={orderDetailMessage}
              placeholder="請填入醫囑"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSaveOrder}>更新醫囑</Button>
          <Button onClick={handleClose}>離開</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>序號</TableCell>
              <TableCell>病患姓名</TableCell>
              <TableCell>新增/編輯 醫囑</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients?.map?.((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.patientName}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    color={row.orderId ? "primary" : "error"}
                    onClick={() => renderOrderDialog(
                      row.patientName, row.patientId, row.message
                    )}>
                    {row.orderId ? '編緝' : '新增'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  )
}

BasicTable.propTypes = {
  patients: PropTypes.array,
}

export default BasicTable
