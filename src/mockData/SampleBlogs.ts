import { Blog } from '../types/blog';

export const sampleBlogs: Blog[] = [
  {
    id: '1',
    title: 'The Benefits of Pure Cow Ghee in Your Daily Diet',
    excerpt: 'Discover why traditional cow ghee is a superfood and how it can enhance your health and cooking.',    content: `
      <article class="prose lg:prose-lg mx-auto">
        <p class="lead">Pure cow ghee has been a staple of Indian cuisine and Ayurvedic medicine for thousands of years. Not just a cooking medium, it's a superfood that carries profound health benefits and cultural significance.</p>

        <figure class="my-8">
          <img src="/assets/images/ghee-benefits.jpg" alt="Traditional ghee making process" class="rounded-lg shadow-lg"/>
          <figcaption class="text-center text-sm mt-2">Traditional method of ghee preparation at Kishan2Kitchen</figcaption>
        </figure>

        <h2>Rich in Essential Nutrients</h2>
        <p>Our pure cow ghee is a powerhouse of nutrients that are essential for maintaining good health:</p>
        <ul>
          <li><strong>Fat-Soluble Vitamins:</strong> Rich in Vitamins A, D, E, and K</li>
          <li><strong>Essential Fatty Acids:</strong> Contains Omega-3 and Omega-6 in optimal ratios</li>
          <li><strong>Butyric Acid:</strong> A short-chain fatty acid that supports gut health and reduces inflammation</li>
          <li><strong>CLA (Conjugated Linoleic Acid):</strong> Known for its potential anti-cancer properties</li>
        </ul>

        <blockquote>
          <p>"Ghee is considered liquid gold in Ayurveda, known for its numerous health benefits and healing properties."</p>
        </blockquote>

        <h2>Superior Cooking Benefits</h2>
        <p>What sets ghee apart from other cooking oils is its remarkable properties in the kitchen:</p>
        <ul>
          <li>High smoke point of 485°F (252°C) makes it ideal for high-temperature cooking</li>
          <li>Doesn't break down into harmful compounds when heated</li>
          <li>Enhances the flavor of spices and herbs</li>
          <li>Long shelf life without refrigeration</li>
        </ul>

        <h2>Our Traditional Production Methods</h2>
        <p>At Kishan2Kitchen, we take pride in our authentic ghee production process:</p>
        <ol>
          <li>Sourcing milk from grass-fed indigenous cows</li>
          <li>Traditional hand-churning method</li>
          <li>Slow-cooking process to preserve nutrients</li>
          <li>Strict quality control measures</li>
        </ol>

        <div class="bg-amber-50 p-6 rounded-lg my-8">
          <h3 class="text-xl font-semibold mb-4">Did You Know?</h3>
          <p>The word "ghee" comes from the Sanskrit word "ghrta" and has been mentioned in sacred Hindu texts dating back over 5000 years.</p>
        </div>

        <h2>Incorporating Ghee in Your Diet</h2>
        <p>Here are some simple ways to add ghee to your daily diet:</p>
        <ul>
          <li>Add a teaspoon to your morning coffee or tea</li>
          <li>Use it for tempering dals and curries</li>
          <li>Spread on rotis or parathas</li>
          <li>Add to rice for enhanced flavor and nutrition</li>
        </ul>

        <div class="bg-green-50 p-6 rounded-lg my-8">
          <h3 class="text-xl font-semibold mb-4">Storage Tips</h3>
          <ul>
            <li>Store in an airtight container</li>
            <li>Keep away from direct sunlight</li>
            <li>Use a clean, dry spoon</li>
            <li>Can be stored at room temperature for up to 1 year</li>
          </ul>
        </div>
      </article>
    `,coverImage: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200&auto=format&fit=crop',
    category: 'products',
    author: {
      name: 'Dr. Sharma',
      avatar: '/assets/images/founder1.jpg'
    },
    publishedAt: '2025-06-01',
    readTime: '5 min read',
    tags: ['ghee', 'health', 'traditional']
  },
  {
    id: '2',
    title: 'From Farm to Kitchen: Our Journey',
    excerpt: 'Learn about our process of working directly with farmers to bring you the purest ingredients.',
    content: `
      <article class="prose lg:prose-lg mx-auto">
        <p class="lead">At Kishan2Kitchen, our journey begins in the fertile fields of India's heartland. We've built strong partnerships with farming communities to ensure that every product that reaches your kitchen is of the highest quality and ethically sourced.</p>

        <figure class="my-8">
          <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200" alt="Farmers in field" class="rounded-lg shadow-lg"/>
          <figcaption class="text-center text-sm mt-2">Our partner farmers working in organic fields</figcaption>
        </figure>

        <h2>Our Farmer Partnership Program</h2>
        <p>We believe that sustainable farming starts with empowered farmers. Our comprehensive partnership program includes:</p>
        <ul>
          <li><strong>Direct Relationships:</strong> We work directly with farmers, eliminating middlemen and ensuring better returns</li>
          <li><strong>Fair Price Guarantee:</strong> Farmers receive premium prices for quality produce</li>
          <li><strong>Technical Support:</strong> Regular training sessions on organic farming practices</li>
          <li><strong>Quality Control:</strong> On-site assistance for maintaining high standards</li>
        </ul>

        <blockquote>
          <p>"When farmers prosper, the nation prospers. Our partnership with Kishan2Kitchen has transformed not just our farming practices, but our entire community."</p>
          <cite>- Ramesh Patel, Partner Farmer since 2020</cite>
        </blockquote>

        <h2>Quality Assurance at Every Step</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div class="bg-green-50 p-6 rounded-lg">
            <h3>Field Level</h3>
            <ul>
              <li>Soil testing</li>
              <li>Water quality monitoring</li>
              <li>Organic certification</li>
              <li>Regular field inspections</li>
            </ul>
          </div>
          <div class="bg-green-50 p-6 rounded-lg">
            <h3>Processing Level</h3>
            <ul>
              <li>Clean room facilities</li>
              <li>Quality testing labs</li>
              <li>Hygienic packaging</li>
              <li>Batch tracking</li>
            </ul>
          </div>
        </div>

        <h2>Community Impact</h2>
        <p>Our partnerships have created lasting impact in farming communities:</p>
        <ul>
          <li>Employment generation for over 1000+ farming families</li>
          <li>20% average increase in farmer income</li>
          <li>Support for children's education</li>
          <li>Women empowerment initiatives</li>
        </ul>

        <div class="bg-amber-50 p-6 rounded-lg my-8">
          <h3 class="text-xl font-semibold mb-4">Success Metrics</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center">
              <p class="text-2xl font-bold text-green-600">1000+</p>
              <p class="text-sm">Partner Farmers</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-green-600">20%</p>
              <p class="text-sm">Income Increase</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-green-600">100%</p>
              <p class="text-sm">Organic</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-green-600">50+</p>
              <p class="text-sm">Villages</p>
            </div>
          </div>
        </div>
      </article>
    `,    coverImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop',
    category: 'company',
    author: {
      name: 'Rajesh Kumar',
      avatar: '/assets/images/founder2.jpg'
    },
    publishedAt: '2025-05-28',
    readTime: '7 min read',
    tags: ['farming', 'sustainability', 'community']
  },
  {
    id: '3',
    title: 'Understanding Cold-Pressed Oils: A Guide to Better Health',
    excerpt: 'Discover the benefits of cold-pressed oils and why they are superior to refined oils for your cooking needs.',
    content: `
      <p>Cold-pressed oils have been a cornerstone of traditional Indian cooking for centuries. Today, we will explore why these oils are making a comeback in modern kitchens and why they should be your first choice for healthy cooking.</p>

      <h2>What is Cold Pressing?</h2>
      <p>Cold pressing is a natural method of oil extraction that maintains the oil's:</p>
      <ul>
        <li>Natural nutrients</li>
        <li>Original flavor</li>
        <li>Beneficial enzymes</li>
        <li>Antioxidant properties</li>
      </ul>

      <h2>Health Benefits</h2>
      <p>Our cold-pressed oils offer numerous health benefits:</p>
      <ul>
        <li>Higher retention of natural vitamins</li>
        <li>Better absorption of nutrients</li>
        <li>No harmful chemicals or solvents</li>
        <li>Rich in essential fatty acids</li>
      </ul>

      <h2>Cooking Tips</h2>
      <p>To get the most out of your cold-pressed oils, follow these simple guidelines:</p>
      <ul>
        <li>Store in a cool, dark place</li>
        <li>Use for medium-temperature cooking</li>
        <li>Perfect for dressings and marinades</li>
        <li>Replace refined oils gradually</li>
      </ul>
    `,    coverImage: '/assets/bannerimg/GheeBanner.png',
    category: 'products',
    author: {
      name: 'Anita Kumar',
      avatar: '/assets/images/founder3.jpg'
    },
    publishedAt: '2025-06-10',
    readTime: '6 min read',
    tags: ['oils', 'health', 'cooking', 'traditional']
  },
  {
    id: '4',
    title: 'The Sweet Truth About Pure Honey',
    excerpt: 'Learn how to identify pure honey and its incredible health benefits. Our guide to understanding what makes honey truly special.',
    content: `
      <p>Pure honey is nature's miracle food, packed with health benefits and natural goodness. However, not all honey is created equal. Let's explore what makes pure honey special and how to identify it.</p>

      <h2>Signs of Pure Honey</h2>
      <p>Here's how you can identify pure honey:</p>
      <ul>
        <li>Natural crystallization over time</li>
        <li>Thick consistency and slow drip</li>
        <li>Raw, unfiltered appearance</li>
        <li>Complex, natural flavor profile</li>
      </ul>

      <h2>Health Benefits</h2>
      <p>Pure honey offers numerous health benefits:</p>
      <ul>
        <li>Natural antibacterial properties</li>
        <li>Rich in antioxidants</li>
        <li>Supports immune system</li>
        <li>Natural energy booster</li>
      </ul>

      <h2>Our Honey Collection Process</h2>
      <p>At Kishan2Kitchen, we work directly with beekeepers to ensure:</p>
      <ul>
        <li>Sustainable harvesting practices</li>
        <li>Support for local bee populations</li>
        <li>Preservation of natural ecosystems</li>
        <li>Fair trade practices</li>
      </ul>
    `,    coverImage: '/assets/bannerimg/HoneyBanner.png',
    category: 'products',
    author: {
      name: 'Dr. Sharma',
      avatar: '/assets/images/founder1.jpg'
    },
    publishedAt: '2025-06-05',
    readTime: '5 min read',
    tags: ['honey', 'health', 'natural', 'pure']
  },
  {
    id: '5',
    title: 'Empowering Rural Women Through Agriculture',
    excerpt: 'How Kishan2Kitchen is creating opportunities for rural women in agriculture and food processing.',    content: `
      <p>In the heart of India's agricultural landscape, a quiet revolution is taking place. At Kishan2Kitchen, we're proud to be at the forefront of empowering rural women through sustainable agriculture and traditional food processing. Our initiative isn't just about creating employment; it's about nurturing leadership, preserving heritage, and building stronger communities.</p>

      <img src="https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?q=80&w=1200&auto=format&fit=crop" alt="Women working in agricultural field" class="my-8" />

      <h2>The Power of Women in Agriculture</h2>
      <p>Women have always been the backbone of Indian agriculture, yet their contributions often go unrecognized. Our program aims to change this narrative by providing women with the tools, knowledge, and opportunities they need to become agricultural entrepreneurs and leaders in their communities.</p>

      <h2>Comprehensive Empowerment Program</h2>
      <p>Our women empowerment initiative takes a holistic approach to development:</p>
      <ul>
        <li><strong>Skill Development Workshops:</strong>
          <ul>
            <li>Traditional food processing techniques</li>
            <li>Modern agricultural practices</li>
            <li>Quality control and safety standards</li>
            <li>Business management skills</li>
          </ul>
        </li>
        <li><strong>Financial Literacy Training:</strong>
          <ul>
            <li>Basic accounting and bookkeeping</li>
            <li>Digital banking awareness</li>
            <li>Investment planning</li>
            <li>Micro-enterprise management</li>
          </ul>
        </li>
        <li><strong>Market Access Initiatives:</strong>
          <ul>
            <li>Direct market linkages</li>
            <li>E-commerce platform training</li>
            <li>Brand building support</li>
            <li>Quality certification assistance</li>
          </ul>
        </li>
      </ul>

      <h2>Inspiring Success Stories</h2>
      <p>Our program has nurtured numerous success stories that inspire and motivate others:</p>

      <div class="my-8 p-6 bg-green-50 rounded-lg">
        <h3 class="text-xl font-semibold mb-4">Lakshmi's Journey to Success</h3>
        <p>From a farm laborer earning daily wages to running her own organic farming collective, Lakshmi's story exemplifies the transformative power of our program. Today, she leads a group of 25 women farmers, implementing sustainable farming practices and securing premium prices for their produce.</p>
      </div>

      <div class="my-8 p-6 bg-green-50 rounded-lg">
        <h3 class="text-xl font-semibold mb-4">Meena's Ghee Processing Revolution</h3>
        <p>Meena started with a small ghee processing unit in her home kitchen. With our support, she has scaled her operation to employ 15 local women and now supplies pure cow ghee to markets across three districts.</p>
      </div>

      <img src="https://images.unsplash.com/photo-1595332785584-858f27b1870c?q=80&w=1200&auto=format&fit=crop" alt="Women led farming cooperative" class="my-8" />

      <h2>Measurable Community Impact</h2>
      <p>The ripple effect of empowering women extends far beyond individual success:</p>
      <ul>
        <li><strong>Economic Impact:</strong>
          <ul>
            <li>Employment generated for over 100 rural women</li>
            <li>Average household income increased by 60%</li>
            <li>15 women-led micro-enterprises established</li>
          </ul>
        </li>
        <li><strong>Social Impact:</strong>
          <ul>
            <li>Improved education access for children</li>
            <li>Enhanced healthcare awareness</li>
            <li>Stronger community bonds</li>
          </ul>
        </li>
        <li><strong>Environmental Impact:</strong>
          <ul>
            <li>Adoption of sustainable farming practices</li>
            <li>Reduced chemical pesticide usage</li>
            <li>Water conservation initiatives</li>
          </ul>
        </li>
      </ul>

      <h2>Looking Ahead</h2>
      <p>As we continue to grow, our commitment to women's empowerment remains steadfast. We're expanding our program to reach more villages, introducing new training modules, and creating stronger market linkages. Together, we're building a future where rural women are not just participants in agriculture but leaders of agricultural innovation and sustainability.</p>
    `,coverImage: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1200&auto=format&fit=crop',
    category: 'company',
    author: {
      name: 'Priya Singh',
      avatar: '/assets/images/founder2.jpg'
    },
    publishedAt: '2025-05-25',
    readTime: '8 min read',
    tags: ['women empowerment', 'rural development', 'community']
  },
  {
    id: '6',
    title: 'Sustainable Farming: Our Commitment to the Environment',
    excerpt: "Explore how we are promoting sustainable farming practices and protecting the environment while producing quality food products.",
    content: `
      <p>Sustainable farming is at the heart of everything we do at Kishan2Kitchen. We believe that good food should not come at the cost of our environment.</p>

      <h2>Our Sustainable Practices</h2>
      <p>We implement various sustainable methods:</p>
      <ul>
        <li>Organic farming techniques</li>
        <li>Water conservation methods</li>
        <li>Natural pest control</li>
        <li>Crop rotation</li>
      </ul>

      <h2>Environmental Impact</h2>
      <p>Our sustainable practices help:</p>
      <ul>
        <li>Reduce carbon footprint</li>
        <li>Preserve soil health</li>
        <li>Protect biodiversity</li>
        <li>Minimize water usage</li>
      </ul>

      <h2>Future Goals</h2>
      <p>We are working towards:</p>
      <ul>
        <li>100% renewable energy usage</li>
        <li>Zero-waste packaging</li>
        <li>Enhanced biodiversity programs</li>
        <li>Expanded organic farming network</li>
      </ul>
    `,    coverImage: 'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?q=80&w=1200&auto=format&fit=crop',
    category: 'farming',
    author: {
      name: 'Rajesh Kumar',
      avatar: '/assets/images/founder2.jpg'
    },
    publishedAt: '2025-05-20',
    readTime: '7 min read',
    tags: ['sustainability', 'environment', 'farming', 'organic']
  }
];
