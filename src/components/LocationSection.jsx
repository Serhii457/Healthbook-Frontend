import React from 'react';
import './styles/LocationSection.css';

const LocationSection = () => {
  return (
    <section className="location-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Наша локація</h2>
        <div className="ratio ratio-16x9 shadow rounded">
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
    </section>
  );
};

export default LocationSection;
