import { useState } from 'react'
import { categoryService, ICategory } from '../../services/Category.service'
import { tap, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'

export function useCategoryList () {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  function onSuccess (categories: ICategory[]) {
    setCategories(categories)
    setLoading(false)
  }

  function onError (error: any) {
    setLoading(false)
    setError(error)
    return throwError(error)
  }

  function listCategory () {
    setLoading(true)
    setError(null)

    return categoryService
      .list()
      .pipe(tap(onSuccess))
      .pipe(catchError(onError))
  }

  return {
    categories,
    listCategory,
    listCategoryLoading: loading,
    listCategoryError: error
  }
}
