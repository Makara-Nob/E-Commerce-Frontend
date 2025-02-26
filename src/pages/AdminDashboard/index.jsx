import React from 'react'
import ProductTable from '../../components/dashboard/ProductTable'
import { useFetchProducts } from '../../hooks/useFetchProducts'

function index() {
 const { data: products = [], isLoading, isError, refetch } = useFetchProducts()
  return (
    <div className='w-full flex justify-center'>
        <ProductTable products={products.content} isLoading={isLoading} isError={isError} isRefetch={refetch} />
    </div>
  )
}

export default index