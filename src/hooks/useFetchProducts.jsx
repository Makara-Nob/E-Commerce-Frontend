import ProductService from '../Services/ProductService'
import { useQuery } from 'react-query';

export function useFetchProducts () {
        return useQuery({
            queryKey: ['products'],
            queryFn: ProductService.getProducts,
        })
}