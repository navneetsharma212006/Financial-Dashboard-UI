/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { seedTransactions } from '../data/seedTransactions'

const FinanceContext = createContext(null)

const STORAGE_KEYS = {
  transactions: 'fd_transactions',
  role: 'fd_role',
  filters: 'fd_filters',
  search: 'fd_search',
  theme: 'fd_theme',
}

const initialFilters = {
  type: 'all',
  category: 'all',
  sortBy: 'date_desc',
}

const getStoredValue = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const initialState = {
  transactions: getStoredValue(STORAGE_KEYS.transactions, seedTransactions),
  role: getStoredValue(STORAGE_KEYS.role, 'viewer'),
  filters: getStoredValue(STORAGE_KEYS.filters, initialFilters),
  searchQuery: getStoredValue(STORAGE_KEYS.search, ''),
  theme: getStoredValue(STORAGE_KEYS.theme, 'light'),
  syncStatus: 'idle',
}

const financeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload }
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload }
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'SET_SYNC_STATUS':
      return { ...state, syncStatus: action.payload }
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] }
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((item) => (item.id === action.payload.id ? action.payload : item)),
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((item) => item.id !== action.payload),
      }
    case 'CLEAR_TRANSACTIONS':
      return { ...state, transactions: [] }
    default:
      return state
  }
}

export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(state.transactions))
  }, [state.transactions])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.role, JSON.stringify(state.role))
  }, [state.role])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.filters, JSON.stringify(state.filters))
  }, [state.filters])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.search, JSON.stringify(state.searchQuery))
  }, [state.searchQuery])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(state.theme))
    document.documentElement.classList.toggle('dark', state.theme === 'dark')
  }, [state.theme])

  const categories = useMemo(() => [...new Set(state.transactions.map((item) => item.category))].sort(), [state.transactions])

  const filteredTransactions = useMemo(() => {
    const query = state.searchQuery.trim().toLowerCase()
    const data = state.transactions.filter((item) => {
      const passType = state.filters.type === 'all' || item.type === state.filters.type
      const passCategory = state.filters.category === 'all' || item.category === state.filters.category
      const passSearch =
        query.length === 0 ||
        item.category.toLowerCase().includes(query) ||
        item.note.toLowerCase().includes(query) ||
        String(item.amount).includes(query)
      return passType && passCategory && passSearch
    })

    return [...data].sort((a, b) => {
      switch (state.filters.sortBy) {
        case 'amount_asc':
          return a.amount - b.amount
        case 'amount_desc':
          return b.amount - a.amount
        case 'date_asc':
          return new Date(a.date) - new Date(b.date)
        case 'date_desc':
        default:
          return new Date(b.date) - new Date(a.date)
      }
    })
  }, [state.transactions, state.filters, state.searchQuery])

  const value = {
    ...state,
    categories,
    filteredTransactions,
    setRole: (role) => dispatch({ type: 'SET_ROLE', payload: role }),
    setFilters: (payload) => dispatch({ type: 'SET_FILTERS', payload }),
    setSearchQuery: (value) => dispatch({ type: 'SET_SEARCH', payload: value }),
    setTheme: (value) => dispatch({ type: 'SET_THEME', payload: value }),
    addTransaction: (payload) => dispatch({ type: 'ADD_TRANSACTION', payload }),
    updateTransaction: (payload) => dispatch({ type: 'UPDATE_TRANSACTION', payload }),
    deleteTransaction: (id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id }),
    clearTransactions: () => dispatch({ type: 'CLEAR_TRANSACTIONS' }),
    mockSync: async () => {
      dispatch({ type: 'SET_SYNC_STATUS', payload: 'syncing' })
      await new Promise((resolve) => setTimeout(resolve, 1200))
      dispatch({ type: 'SET_SYNC_STATUS', payload: 'success' })
      setTimeout(() => dispatch({ type: 'SET_SYNC_STATUS', payload: 'idle' }), 1600)
    },
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export const useFinance = () => {
  const context = useContext(FinanceContext)
  if (!context) throw new Error('useFinance must be used inside FinanceProvider')
  return context
}
