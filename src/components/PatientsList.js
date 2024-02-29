import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container } from '@mui/material'

import { getPatients } from '../store/actions'

import DataTable from './DataTable'

const PatientsList = () => {
  const dispatch = useDispatch()
  const patients = useSelector((state) => state.patients)

  useEffect(() => {
    dispatch(getPatients())
  }, [dispatch, patients])

  return (
    <Container>
      <h2>病患名單</h2>
      <DataTable patients={patients} />
    </Container>
  )
}

export default PatientsList
