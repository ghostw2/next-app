import React from 'react'
import CardTable from './card-table'
import { getMyCart } from '@/lib/actions/card.actions'
const Card = async () => {
  const card = await getMyCart()
  return (
    <>
      <CardTable card={card}/>
    </>
  )
}

export default Card
