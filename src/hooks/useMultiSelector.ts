import { RootState } from '@/redux/store'
import { createSelector } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux'

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export const useMultiSelector = <T extends Record<string, (state: RootState) => any>>(
    selectors: T,
): { [K in keyof T]: ReturnType<T[K]> } => {
    const values = Object.values(selectors)

    const derivedState = createSelector(values, (...results) => {
        const data = results.reduce((acc, value, index) => {
            const key = Object.keys(selectors)[index]
            acc[key] = value
            return acc
        }, {} as any)
        return data
    })

    return useSelector(derivedState)
}
