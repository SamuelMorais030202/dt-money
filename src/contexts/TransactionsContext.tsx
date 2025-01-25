import { ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

export interface ITransactions {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransaction {
  category: string;
  description: string;
  price: number;
  type: string;
}

interface ITransactionsContextType {
  transactions: ITransactions[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransaction) => Promise<void>;
}

interface ITransactionsProvider {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionsContext = createContext({} as ITransactionsContextType);

export function TransactionsProvider({ children }: ITransactionsProvider) {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  
  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'asc',
        q: query,
      }
    })

    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback(async (data: CreateTransaction) => {
    const { category, description, price, type } =  data;

    const responde = await api.post('/transactions', {
      category,
      description,
      price,
      type,
      createdAt: new Date(),
    });
    
    setTransactions((prevState) => ([
      responde.data,
      ...prevState,
    ]));
  }, []);
  
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}