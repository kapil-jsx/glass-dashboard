import { createContext, useContext, useState } from 'react';
import { orders, loadingSlips } from '../data/staticData';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [ordersData, setOrdersData] = useState(orders);
  const [loadingSlipsData, setLoadingSlipsData] = useState(loadingSlips);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: order.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setOrdersData([newOrder, ...ordersData]);
    return newOrder;
  };

  const updateOrder = (id, updates) => {
    setOrdersData(
      ordersData.map((order) =>
        order.id === id
          ? { ...order, ...updates, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  const deleteOrder = (id) => {
    setOrdersData(ordersData.filter((order) => order.id !== id));
  };

  const addLoadingSlip = (loadingSlip) => {
    const newLoadingSlip = {
      ...loadingSlip,
      id: loadingSlip.id,
      createdAt: new Date().toISOString()
    };
    setLoadingSlipsData([newLoadingSlip, ...loadingSlipsData]);
    return newLoadingSlip;
  };

  const updateLoadingSlip = (id, updates) => {
    setLoadingSlipsData(
      loadingSlipsData.map((slip) =>
        slip.id === id
          ? { ...slip, ...updates, updatedAt: new Date().toISOString() }
          : slip
      )
    );
  };

  const value = {
    orders: ordersData,
    loadingSlips: loadingSlipsData,
    addOrder,
    updateOrder,
    deleteOrder,
    addLoadingSlip,
    updateLoadingSlip
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};


