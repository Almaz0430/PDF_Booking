<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Подтверждение бронирования</title>
    <style>
        body { 
            font-family: "DejaVu Sans", sans-serif; 
            color: #333; 
            line-height: 1.6; 
            font-size: 12px;
        }
        .container { width: 100%; max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #eee; }
        .header { text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 10px; margin-bottom: 20px; }
        .header h1 { color: #8B0000; margin: 0; font-size: 24px; }
        .details { margin-bottom: 30px; }
        .details-row { display: table; width: 100%; margin-bottom: 10px; }
        .label { display: table-cell; font-weight: bold; width: 40%; }
        .value { display: table-cell; }
        .footer { text-align: center; font-size: 10px; color: #777; margin-top: 50px; border-top: 1px solid #eee; padding-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Подтверждение бронирования</h1>
            <p>Номер заказа: #{{ $booking->id }}</p>
        </div>

        <div class="details">
            <div class="details-row">
                <span class="label">Имя клиента:</span>
                <span class="value">{{ $booking->customer_name }}</span>
            </div>
            <div class="details-row">
                <span class="label">Электронная почта:</span>
                <span class="value">{{ $booking->email }}</span>
            </div>
            <div class="details-row">
                <span class="label">Дата и время:</span>
                <span class="value">{{ \Carbon\Carbon::parse($booking->booking_date)->format('d.m.Y H:i') }}</span>
            </div>
            <div class="details-row">
                <span class="label">Тип услуги:</span>
                <span class="value">{{ $booking->service_type }}</span>
            </div>
            <div class="details-row">
                <span class="label">Статус:</span>
                <span class="value" style="text-transform: uppercase; font-weight: bold; color: {{ $booking->status === 'pending' ? '#f39c12' : '#27ae60' }}">
                    {{ $booking->status === 'pending' ? 'ОЖИДАЕТ' : 'ПОДТВЕРЖДЕНО' }}
                </span>
            </div>
        </div>

        <div class="footer">
            <p>Спасибо за ваше бронирование! Если у вас есть вопросы, пожалуйста, свяжитесь с нами по адресу support@example.com</p>
            <p>&copy; {{ date('Y') }} {{ config('app.name') }}. Все права защищены.</p>
        </div>
    </div>
</body>
</html>
