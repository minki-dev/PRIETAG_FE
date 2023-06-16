import React from 'react'
import Table from './Table'
import { useTable } from '@/store/slice/tableSlice'
import DraggableArea from '../DraggableArea'
import { v4 as uuid } from 'uuid'
import { useConfig } from '@/store/slice/configSlice'

export default function TableContainer() {
  const { tableState } = useTable()
  const { configState } = useConfig()
  const { isPreview } = configState
  // console.log(tableState.tableList)
  return (
      <section className={`${isPreview ? "editable-outer-preview":"editable-outer"}`}>
        <DraggableArea areaType="tableArea" />
        {tableState.tableList.map((_, index) => {
          return <Table key={uuid()} tableIndex={index} />
        })}
      </section>
  )
}