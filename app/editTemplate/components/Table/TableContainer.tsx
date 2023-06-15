import React from 'react'
import Table from './Table'
import { useTable } from '@/store/slice/tableSlice'
import DraggableArea from '../DraggableArea'
import { v4 as uuid } from 'uuid'

export default function TableContainer() {
  const { tableState } = useTable()
  // console.log(tableState.tableList)
  return (
      <section>
        <DraggableArea areaType="tableArea" />
        {tableState.tableList.map((_, index) => {
          return <Table key={uuid()} tableIndex={index} />
        })}
      </section>
  )
}