import { IHistoryData } from '@/interfaces/history';

export const mockHistory: IHistoryData = {
  '2024-11-03': [
    {
      id: 1,
      status: 'completed',
      totalValue: 25.5,
      routeTime: '15 mins',
      driverTripCount: 127,
      driver: {
        id: 101,
        name: 'João Silva',
        photo: {
          url: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        rating: 4.8,
      },
      category: {
        name: 'Carro',
      },
      subcategory: {
        type: 'car',
      },
      vehicle: {
        vehicle_model: {
          model: 'Honda Civic',
        },
        plate: 'ABC-1234',
      },
      locals: [
        {
          addressString: 'Rua das Flores, 123 - Centro, São Paulo - SP',
          latitude: -23.5505,
          longitude: -46.6333,
        },
        {
          addressString: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
          latitude: -23.5613,
          longitude: -46.6565,
        },
      ],
    },
    {
      id: 2,
      status: 'completed',
      totalValue: 18.75,
      routeTime: '12 mins',
      driverTripCount: 89,
      driver: {
        id: 102,
        name: 'Maria Santos',
        photo: {
          url: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        rating: 4.9,
      },
      category: {
        name: 'Moto',
      },
      subcategory: {
        type: 'motorcycle',
      },
      vehicle: {
        vehicle_model: {
          model: 'Honda CG 160',
        },
        plate: 'XYZ-5678',
      },
      locals: [
        {
          addressString: 'Shopping Ibirapuera - Vila Olímpia, São Paulo - SP',
          latitude: -23.5957,
          longitude: -46.6516,
        },
        {
          addressString: 'Rua Augusta, 500 - Consolação, São Paulo - SP',
          latitude: -23.5558,
          longitude: -46.6596,
        },
      ],
    },
  ],
  '2024-11-02': [
    {
      id: 3,
      status: 'cancelada',
      totalValue: 0,
      routeTime: '8 mins',
      driverTripCount: 0,
      driver: {
        id: 103,
        name: 'Carlos Oliveira',
        photo: {
          url: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
        rating: 4.5,
      },
      category: {
        name: 'Carro',
      },
      subcategory: {
        type: 'car',
      },
      vehicle: {
        vehicle_model: {
          model: 'Chevrolet Onix',
        },
        plate: 'DEF-9012',
      },
      locals: [
        {
          addressString: 'Estação da Luz - Centro, São Paulo - SP',
          latitude: -23.5359,
          longitude: -46.6359,
        },
        {
          addressString: 'Mercado Municipal - Centro, São Paulo - SP',
          latitude: -23.5431,
          longitude: -46.6291,
        },
      ],
    },
  ],
  '2024-11-01': [
    {
      id: 4,
      status: 'procurandoMotorista',
      totalValue: 32.0,
      routeTime: '22 mins',
      driverTripCount: 0,
      category: {
        name: 'Carro',
      },
      subcategory: {
        type: 'car',
      },
      locals: [
        {
          addressString:
            'Aeroporto de Congonhas - Vila Congonhas, São Paulo - SP',
          latitude: -23.6262,
          longitude: -46.6564,
        },
        {
          addressString: 'Hotel Copacabana - Copacabana, Rio de Janeiro - RJ',
          latitude: -22.9711,
          longitude: -43.1882,
        },
      ],
    },
    {
      id: 5,
      status: 'completed',
      totalValue: 14.25,
      routeTime: '10 mins',
      driverTripCount: 203,
      driver: {
        id: 104,
        name: 'Ana Costa',
        photo: {
          url: 'https://randomuser.me/api/portraits/women/4.jpg',
        },
        rating: 4.7,
      },
      category: {
        name: 'Moto',
      },
      subcategory: {
        type: 'motorcycle',
      },
      vehicle: {
        vehicle_model: {
          model: 'Yamaha Factor 125',
        },
        plate: 'GHI-3456',
      },
      locals: [
        {
          addressString: 'Parque Ibirapuera - Ibirapuera, São Paulo - SP',
          latitude: -23.5873,
          longitude: -46.6576,
        },
        {
          addressString:
            'Museu de Arte de São Paulo - Bela Vista, São Paulo - SP',
          latitude: -23.5614,
          longitude: -46.6558,
        },
      ],
    },
  ],
};
