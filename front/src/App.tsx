import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = '/api';

interface Booking {
  id: number;
  customer_name: string;
  email: string;
  booking_date: string;
  service_type: string;
  status: string;
}

function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    booking_date: '',
    service_type: 'Консультация'
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/bookings`);
      setBookings(res.data);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/bookings`, formData);
      setMsg('Бронирование успешно создано');
      setFormData({
        customer_name: '',
        email: '',
        booking_date: '',
        service_type: 'Консультация'
      });
      fetchBookings();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('Ошибка при создании бронирования');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = (id: number) => {
    window.open(`${API_BASE_URL}/bookings/${id}/pdf`, '_blank');
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Система Бронирования</h1>
      </header>

      <div className="card">
        <h2>Новое бронирование</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя клиента</label>
            <input
              type="text"
              required
              value={formData.customer_name}
              onChange={e => setFormData({ ...formData, customer_name: e.target.value })}
              placeholder="Введите имя"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@mail.ru"
            />
          </div>
          <div className="form-group">
            <label>Дата и время</label>
            <input
              type="datetime-local"
              required
              value={formData.booking_date}
              onChange={e => setFormData({ ...formData, booking_date: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Тип услуги</label>
            <select
              value={formData.service_type}
              onChange={e => setFormData({ ...formData, service_type: e.target.value })}
            >
              <option value="Консультация">Консультация</option>
              <option value="Дизайн">Дизайн</option>
              <option value="Разработка">Разработка</option>
              <option value="Поддержка">Поддержка</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Загрузка...' : 'Забронировать'}
          </button>
          {msg && <p style={{ marginTop: '10px', color: msg.includes('успешно') ? 'green' : 'red' }}>{msg}</p>}
        </form>
      </div>

      <div className="card">
        <h2>Список бронирований</h2>
        {bookings.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Бронирований пока нет</p>
        ) : (
          <div>
            {bookings.map(booking => (
              <div key={booking.id} className="list-item">
                <div>
                  <div style={{ fontWeight: 'bold' }}>{booking.customer_name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {booking.service_type} — {new Date(booking.booking_date).toLocaleString('ru-RU')}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span className={`status-badge status-${booking.status}`}>
                    {booking.status === 'pending' ? 'Ожидает' : 'Подтвержден'}
                  </span>
                  <button
                    onClick={() => handleDownloadPdf(booking.id)}
                    className="btn-outline"
                  >
                    PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
