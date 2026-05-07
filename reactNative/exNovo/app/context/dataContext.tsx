import React, { createContext, useContext, useState } from 'react';

export interface DataItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
}

interface DataContextType {
  items: DataItem[];
  addItem: (item: Omit<DataItem, 'id'>) => void;
  updateItem: (id: string, item: Omit<DataItem, 'id'>) => void;
  deleteItem: (id: string) => void;
  getItem: (id: string) => DataItem | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialData: DataItem[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 98765-4321',
    status: 'Ativo'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 99876-5432',
    status: 'Ativo'
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    phone: '(11) 97654-3210',
    status: 'Inativo'
  }
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<DataItem[]>(initialData);

  const addItem = (item: Omit<DataItem, 'id'>) => {
    const newItem: DataItem = {
      ...item,
      id: Date.now().toString()
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, updatedItem: Omit<DataItem, 'id'>) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getItem = (id: string) => {
    return items.find(item => item.id === id);
  };

  return (
    <DataContext.Provider value={{ items, addItem, updateItem, deleteItem, getItem }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
