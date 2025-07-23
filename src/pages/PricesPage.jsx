import React from 'react';
import './styles/PricesPage.css';

const prices = [
  { id: 1, name: 'Ендоскопія', description: 'Гастроскопія в медикаментозному сні.', price: 3500 },
  { id: 2, name: 'Ендоскопія', description: 'Колоноскопія в медикаментозному сні.', price: 4000 },
  { id: 3, name: 'Ендоскопія', description: 'PH метрія (визначення кислотності).', price: 400 },
  { id: 4, name: 'Ендоскопія', description: 'Тест Helicobacter pylori.', price: 460 },
  { id: 5, name: 'УЗД', description: 'Детальне обстеження органів живота.', price: 550 },
  { id: 6, name: 'УЗД', description: 'УЗД органів малого тазу ТА.', price: 660 },
  { id: 7, name: 'УЗД', description: 'УЗД органів малого тазу з доплерометрією судин.', price: 750 },
  { id: 8, name: 'УЗД', description: 'УЗД молочних залоз та щитовидної залози.', price: 1200 },
  { id: 9, name: 'УЗД', description: 'Виявлення вагітності на ранніх термінах.', price: 670 },
  { id: 10, name: 'УЗД', description: 'УЗД нирок, наднирників та сечового міхура.', price: 750 },
  { id: 11, name: 'Загальний аналіз крові', description: 'Розширений аналіз для оцінки стану здоров’я.', price: 300 },
  { id: 12, name: 'Кардіологія', description: 'Електрокардіографія: з розшифровкою.', price: 250 },
  { id: 13, name: 'Кардіологія', description: 'Електрокардіографія: без розшифровки.', price: 200 },
  { id: 14, name: 'Гастроскопія', description: 'Обстеження шлунка ендоскопом.', price: 850 },
  { id: 15, name: 'Ендоскопія', description: 'Первинна консультація загального лікаря.', price: 400 },
  { id: 16, name: 'Проктолопія', description: 'Первинна консультація проктолога.', price: 550 },
  { id: 17, name: 'Проктолопія', description: 'Повторна консультація.', price: 500 },
  { id: 18, name: 'Проктолопія', description: 'Ректороманоскопія.', price: 340 },
  { id: 19, name: 'Проктолопія', description: 'Очищуюча процедура.', price: 400 },
  { id: 20, name: 'Хірургія', description: 'Первинна консультація з оглядом.', price: 700 },
  { id: 21, name: 'Хірургія', description: 'Повторна консультація.', price: 600 },
  { id: 22, name: 'Хірургія', description: 'Розширений аналіз для оцінки стану здоров’я.', price: 300 },
  { id: 23, name: 'Хірургія', description: 'Обстеження серцевої діяльності.', price: 250 },
  { id: 24, name: 'Хірургія', description: 'Консультація вузького спеціаліста.', price: 600 },
  { id: 25, name: 'Неврологія', description: 'Первинна консультація невролога.', price: 690 },
];

const PricesPage = () => {
  return (
    <div className="prices-page container py-5">
      <h1 className="text-center mb-4">Прайс</h1>
      <p className="text-center mb-5">Актуальні ціни на основні медичні послуги нашої клініки.</p>

      <div className="table-responsive">
        <table className="table table-striped align-middle shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>Послуга</th>
              <th>Опис</th>
              <th className="text-end">Ціна, грн</th>
            </tr>
          </thead>
          <tbody>
            {prices.map(service => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td className="text-end">{service.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricesPage;
