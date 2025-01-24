import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

export interface ITransactions {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface ITransactionsContextType {
  transactions: ITransactions[];
  fetchTransactions: (query?: string) => Promise<void>;
}

interface ITransactionsProvider {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionsContext = createContext({} as ITransactionsContextType);

export function TransactionsProvider({ children }: ITransactionsProvider) {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  
  async function fetchTransactions(query?: string) {
    const response = await api.get('/transaction', {
      params: { q: query }
    })

    setTransactions(response.data);
  }
  
  useEffect(() => {
    fetchTransactions();
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}