import React from 'react';
import Carousel from '../components/Carousel';
import CustomButton from '../components/CustomButton'; 
import Card from '../components/Card'; 

// Ejemplo de datos para las cards
const cardData = [
  { id: 1, title: 'Card 1', description: 'Description for Card 1' },
  { id: 2, title: 'Card 2', description: 'Description for Card 2' },
  { id: 3, title: 'Card 3', description: 'Description for Card 3' },
  // Agrega más objetos según necesites
];

function Home() {
  return (
    <div>
      {/* Título */}
      <h1 className="text-4xl text-green-800 font-bold text-center py-8">Welcome, Thomas!
      </h1>
      
      {/* Carousel */}
      <Carousel />

      <div className="flex justify-center items-center space-x-4 mt-8 mb-8">
  <div className="py-4">
    <CustomButton text="Request Account" />
  </div>
  <div className="flex space-x-4">
    <Card />
    <Card />
    <Card />
  </div>
</div>

    </div>
  );
}

export default Home;