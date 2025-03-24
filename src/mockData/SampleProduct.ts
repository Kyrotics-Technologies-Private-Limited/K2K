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
      description: 'Our adulteration-free desi A2 Cow ghee, handcrafted by rural women, brings remarkable health benefits. Pure Ghee enhances digestion,supports brain function, and strengthens bones. Packed with vitamins and healthy fats, it nourishes the body, boosts immunity,and promotes overall well-being. Experience the goodness of tradition and empower the rural communities with every wholesome drop.',
      
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
      reviews: 128,
      badges: [
        { text: 'Zero Adulteration', type: 'organic' },
        { text: 'Lab Tested', type: 'premium' },
        { text: 'Made at Home- Not in Factories', type: 'natural' },
        { text: 'Zero Preservatives', type: 'organic' },
        { text: 'No Bad Cholesterol', type: 'natural' }
      ],
      benefits: [
        {
          title: 'Nutrient Rich',
          description: 'Packed with essential vitamins A, D, E, and K, supporting immunity and proper organ function',
          icon: '/assets/benefits/ghee/Nutrient Rich.png'
        },
        {
          title: 'Digestive Aid',
          description: 'Stimulates digestive system, aids nutrient absorption, and promotes healthy bowel movements',
          icon: '/assets/benefits/ghee/Digestive Aid.png'
        },
        {
          title: 'Heart Health',
          description: 'Contains omega-3 fatty acids and CLA that support cardiovascular well-being and improve cholesterol levels',
          icon: '/assets/benefits/ghee/Heart Health.png'
        },
        {
          title: 'Brain Function',
          description: 'Rich in butyric acid that supports brain health, cognitive function, and reduces risk of neurodegenerative diseases',
          icon: '/assets/benefits/ghee/Enhanced Brain Function.png'
        },
        {
          title: 'Weight Management',
          description: 'Healthy fats provide satiety and CLA promotes weight loss while reducing body fat',
          icon: '/assets/benefits/ghee/Healthy Weight Management.png'
        },
        {
          title: 'Skin & Hair Health',
          description: 'Moisturizing properties nourish skin, improve complexion, and promote healthy hair growth',
          icon: '/assets/benefits/ghee/Skin and Hair Health.png'
        }
      ]
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
      description: "Unlock the natural goodness of health with our adulteration-free, raw, and unprocessed honey, sourced directly from dedicated beekeepers.Packed with antioxidants, enzymes, and nutrients, it boosts immunity, soothes sore throats, promotes digestion, and enhances overallwell-being. Indulge in the pure sweetness of nature's gift.",
     
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
      reviews: 95,
      badges: [
        { text: 'Zero Adulteration', type: 'organic' },
        { text: 'No added sugar', type: 'natural' },
        { text: 'Unprocessed', type: 'natural' },
        { text: 'Immunity Booster', type: 'premium' },
        { text: 'Sourced from Beekeepers', type: 'organic' }
      ],
      benefits: [
        {
          title: 'Immune Support',
          description: 'Raw and unprocessed honey contains antioxidants and antibacterial properties that can help strengthen the immune system and protect against infections',
          icon: '/assets/benefits/honey/immune-support.png'
        },
        {
          title: 'Soothes Coughs',
          description: 'The natural antibacterial properties of honey can help soothe coughs and relieve sore throats, providing temporary relief and promoting overall comfort',
          icon: '/assets/benefits/honey/soothes-coughs.png'
        },
        {
          title: 'Wound Healing',
          description: "Honey's antimicrobial properties and ability to create a protective barrier make it useful for promoting wound healing and preventing infection",
          icon: '/assets/benefits/honey/wound-healing.png'
        },
        {
          title: 'Nutrient Rich',
          description: 'Raw and unprocessed honey is a natural source of vitamins, minerals, and enzymes that contribute to overall nutrition and well-being',
          icon: '/assets/benefits/honey/nutrient-rich.png'
        },
        {
          title: 'Digestive Aid',
          description: 'Honey has been used traditionally to aid digestion. It can help soothe digestive discomfort and promote a healthy digestive system',
          icon: '/assets/benefits/honey/digestive-aid.png'
        },
        {
          title: 'Natural Energy',
          description: 'The natural sugars in honey provide a quick and sustained energy boost, making it a healthier alternative to refined sugars or artificial sweeteners',
          icon: '/assets/benefits/honey/natural-energy.png'
        }
      ]
    }
  ];