import { Product } from '../types';
export const sampleProducts : Product[] = [ 
    {
      id: '1',
      name: 'Organic Ghee',
      price: {
        amount: 1200,
        currency: 'INR',
        variants: [
          { weight: '500g', price: 1200, inStock: true },
          { weight: '1kg', price: 2200, inStock: true },
          { weight: '2kg', price: 4200, inStock: false }
        ]
      },
      description: 'Pure and authentic A2 cow ghee made using traditional bilona method.',
      ingredients: ['Pure A2 cow milk cream'],
      origin: 'Rajasthan',
      category: 'ghee',
      images: {
        main: 'https://media.istockphoto.com/id/1187181045/photo/pure-or-desi-ghee-clarified-melted-butter-healthy-fats-bulletproof-diet-concept-or-paleo.jpg?s=1024x1024&w=is&k=20&c=-4zQOcgG2okpWgMADLsPhwyieXawsF95998EG-tdwEw=',
        gallery: [
          'https://images.unsplash.com/photo-1707424124274-689499bbe5e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://media.istockphoto.com/id/1413268611/photo/ghee-butter-oil.jpg?s=1024x1024&w=is&k=20&c=_zCH0sX7r980zx2Tndxtn_kQZ_HE0yglHKfJZaHC6p8=',
          'https://media.istockphoto.com/id/1413268632/photo/ghee-butter-oil.jpg?s=1024x1024&w=is&k=20&c=xu957dBzuNHTjAHu_5L0DMH9wA439oYdrPGv0IxyyHM='
        ],

      },
      stockStatus: 'in_stock',
      ratings: 4.5,
      reviews: 128
    },
    {
      id: '2',
      name: 'Organic Honey',
      price: {
        amount: 850,
        currency: 'INR',
        variants: [
          { weight: '250g', price: 850, inStock: true },
          { weight: '500g', price: 1600, inStock: true },
          { weight: '1kg', price: 3000, inStock: true }
        ]
      },
      description: 'Raw and unprocessed honey collected from wild forest flowers.',
      ingredients: ['100% pure wild honey'],
      origin: 'Nilgiris',
      category: 'honey',
      images: {
        main: 'https://media.istockphoto.com/id/1093966722/photo/honey-jar-with-honey-dipper-shot-on-rustic-wooden-table.jpg?s=1024x1024&w=is&k=20&c=pChEG74s_iilUJHO3JnAI2ccgY3woWsrryOID3VRqtQ=',
        gallery: [
          'https://media.istockphoto.com/id/494081382/photo/fresh-honey.jpg?s=1024x1024&w=is&k=20&c=hz_mHnOWXjEaNuLmfHWTNpPp-lHIwhKaKCAJavRhacs=',
          'https://media.istockphoto.com/id/494081470/photo/fresh-honey.jpg?s=1024x1024&w=is&k=20&c=b8FevPpTKo78kpRyrmQFgdMaRB_1bneVMkQmpq7Irw0=',
          'https://plus.unsplash.com/premium_photo-1663851330303-2cfb17822dbb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        
      },
      stockStatus: 'in_stock',
      ratings: 4.8,
      reviews: 95
    }
  ];