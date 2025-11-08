import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const DealerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const totalAmount = orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
  const paidAmount = orders.reduce((sum: number, order: any) => sum + order.paidAmount, 0);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Bayi Dashboard</h1>
        <div>
          <span style={{ marginRight: '15px' }}>👤 {user?.name}</span>
          <button onClick={logout}>Çıkış Yap</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#3b82f6', color: 'white', padding: '20px', borderRadius: '10px' }}>
          <h3>Toplam Sipariş</h3>
          <p style={{ fontSize: '36px', margin: '10px 0' }}>{orders.length}</p>
        </div>
        <div style={{ background: '#10b981', color: 'white', padding: '20px', borderRadius: '10px' }}>
          <h3>Toplam Satış</h3>
          <p style={{ fontSize: '36px', margin: '10px 0' }}>₺{totalAmount.toLocaleString()}</p>
        </div>
        <div style={{ background: '#ef4444', color: 'white', padding: '20px', borderRadius: '10px' }}>
          <h3>Kalan Borç</h3>
          <p style={{ fontSize: '36px', margin: '10px 0' }}>₺{(totalAmount - paidAmount).toLocaleString()}</p>
        </div>
      </div>

      <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
        <h2>Siparişlerim</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Sipariş No</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Müşteri</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Durum</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Tutar</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Kalan</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '10px' }}>{order.orderNumber}</td>
                <td style={{ padding: '10px' }}>{order.customerName}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: order.status === 'pending' ? '#fef3c7' : '#d1fae5',
                    color: order.status === 'pending' ? '#92400e' : '#065f46'
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '10px', textAlign: 'right' }}>₺{order.totalAmount.toLocaleString()}</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>₺{order.remainingAmount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
