import React from 'react';
import './styles/ContactsPage.css';

const ContactsPage = () => {
  return (
    <div className="contacts-page container py-5">
      <h1 className="text-center mb-4">Контакти</h1>

      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <h5>Адреса</h5>
          <p>м. Чернівці, вул. Клінічна, 1</p>

          <h5>Телефони</h5>
          <p>
            <a href="tel:+380501234567" className="text-decoration-none">
              📞 +38 (050) 123-45-67
            </a>
          </p>

          <h5>Години роботи</h5>
          <p>Пн–Пт: 09:00 – 18:00<br />Сб, Нд: вихідний</p>

          <h5>Email</h5>
          <p>
            <a href="mailto:info@healthbook.com" className="text-decoration-none">
              ✉ info@healthbook.com
            </a>
          </p>
        </div>

        <div className="col-md-6">
          <h5>Ми на карті</h5>
          <div className="ratio ratio-4x3 shadow-sm rounded">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2739.972857042145!2d25.93203621575255!3d48.29140637924224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4730494b9b3f307f%3A0x40b40b9e3ed010ea!2z0JLQsNGA0LDRgNC-0YHQutC40LrQsCwgMSwg0J7QsdC70LDRgNC60LDRjywg0JrQsNC70LDRgtC-0YDQvtCy0LAsINCQ0L7QsdC70LXQvdC-0YDQvtCy0YHQutC40LrQsA!5e0!3m2!1suk!2sua!4v1691630481999!5m2!1suk!2sua"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Карта клініки"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
