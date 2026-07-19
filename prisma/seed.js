const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  console.log('Clearing existing database tables...');
  await prisma.admin.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.trainer.deleteMany();
  await prisma.program.deleteMany();
  await prisma.membershipPlan.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.fAQ.deleteMany();

  console.log('Seeding default Admin credentials...');
  const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'password123';
  const defaultAdminUsername = process.env.ADMIN_USERNAME || 'admin';
  await prisma.admin.create({
    data: {
      username: defaultAdminUsername,
      passwordHash: hashPassword(defaultAdminPassword),
    },
  });
  console.log(`- Admin seeded. User: "${defaultAdminUsername}", Pass: "${defaultAdminPassword}"`);

  console.log('Seeding trainers...');
  await prisma.trainer.createMany({
    data: [
      {
        name: 'Coach Dev',
        role: 'Head of Transformation',
        experience: '10+ Years',
        specialization: 'Biomechanical Hypertrophy & Bio-Programming',
        certificates: 'Gold\'s Gym Academy, K11 Master Trainer, NESTA Nutritionist',
        image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
      },
      {
        name: 'Coach Vikram',
        role: 'CrossFit & Conditioning Lead',
        experience: '8+ Years',
        specialization: 'Olympic Weightlifting & Aerobic Capacity',
        certificates: 'CrossFit Level 2 Coach, Rogue Athlete Trainer, CPR/AED Standard',
        image: 'https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=600',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
      },
      {
        name: 'Coach Ananya',
        role: 'Strength & Conditioning Specialist',
        experience: '6+ Years',
        specialization: 'Athletic Performance & Functional Aesthetics',
        certificates: 'K11 Personal Training, ACSM Specialist, Sports Rehab Cert',
        image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
      },
      {
        name: 'Guru Sunita',
        role: 'Mind-Body Instructor',
        experience: '12+ Years',
        specialization: 'Classical Hatha & Postural Restoration',
        certificates: 'RYS 500 Yoga Alliance, Iyengar Therapy Cert, Sound Healing Master',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
      },
    ],
  });

  console.log('Seeding programs...');
  await prisma.program.createMany({
    data: [
      {
        title: 'Weight Training',
        description: 'Hypertrophy and structural strength development.',
        overview: 'Bespoke hypertrophy mapping utilizing custom biomechanics to ensure efficient muscle load targeting.',
        benefits: 'Hypertrophy development,Increase bone density,Fat loss support',
        schedule: 'Mon - Sat: 06:00 AM - 10:00 PM',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
      },
      {
        title: 'CrossFit Arena',
        description: 'High-intensity functional group athletic routines.',
        overview: 'Functional conditioning involving cardiovascular intervals, gymnastic body weight holds, and lifts.',
        benefits: 'VO2 Max conditioning,Explosive power gains,Core strengthening',
        schedule: 'Mon, Wed, Fri: 07:00 AM & 06:00 PM',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800',
      },
    ],
  });

  console.log('Seeding membership plans...');
  await prisma.membershipPlan.createMany({
    data: [
      {
        name: 'Monthly Elite',
        price: '₹3,500',
        duration: 'Per Month',
        features: 'Strength Zone & Cardio Arena access,CrossFit Arena group sessions,Rainforest showers & executive lockers,Valet parking assistance',
        popular: false,
      },
      {
        name: 'Annual Club',
        price: '₹22,000',
        duration: 'Per Year',
        features: 'Strength Zone & Cardio Arena access,CrossFit Arena group sessions,Rainforest showers & executive lockers,Valet parking assistance,Semi-Olympic Pool access,Finnish sauna & steam cabins access,2x Personal Training sessions & bio-scans,10% Discount at Nutrition Bar',
        popular: true,
      },
      {
        name: 'VIP Obsidian',
        price: '₹60,000',
        duration: 'Per Year',
        features: 'Strength Zone & Cardio Arena access,CrossFit Arena group sessions,Rainforest showers & executive lockers,Valet parking assistance,Semi-Olympic Pool access,Finnish sauna & steam cabins access,Unlimited Cryo recovery ice baths,1x Assigned Tier-1 coach session weekly,Private digital locker & laundry service,VIP lounge access & guest pass priority',
        popular: false,
      },
    ],
  });

  console.log('Seeding gallery items...');
  await prisma.galleryItem.createMany({
    data: [
      { url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800', category: 'Strength' },
      { url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800', category: 'Cardio' },
      { url: 'https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?q=80&w=800', category: 'CrossFit' },
      { url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?q=80&w=800', category: 'Pool' },
      { url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800', category: 'Recovery' },
    ],
  });

  console.log('Seeding blog posts...');
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'The Science of Active Recovery: Cryo vs. Heat',
        slug: 'science-of-active-recovery',
        category: 'Recovery',
        excerpt: 'Explore how ice bath cryo-conditioning and Finnish saunas affect muscle hypertrophy, inflammation, and recovery biomarkers.',
        content: `Active recovery is the differentiator between average performance and elite progression.
        
### Cryotherapy & Ice Baths
Diving into a 3-5°C cold plunge triggers vasoconstriction, moving blood from extremities to vital organs. This reduces intramuscular swelling, dampens soreness markers (like creatine kinase), and resets the central nervous system.
        
### Thermotherapy & Dry Saunas
Conversely, heat stress triggers vasodilation, flooding muscles with nutrient-rich blood. Saunas stimulate Heat Shock Proteins (HSPs) which preserve muscle mass during recovery windows and improve plasma volume.
        
### The Verdict
Use cryotherapy immediately post-workout to manage acute soreness. Use sauna therapy 24 hours later to facilitate metabolic waste removal and mental relaxation.`,
        readTime: '5 Min Read',
        author: 'Coach Dev',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=600',
      },
    ],
  });

  console.log('Seeding FAQs...');
  await prisma.fAQ.createMany({
    data: [
      {
        question: 'What are the operating hours of Muscle Garaage?',
        answer: 'We are open Monday through Saturday from 06:00 AM to 10:00 PM. On Sundays, our facility is open from 08:00 AM to 02:00 PM exclusively for active recovery, swimming pool access, and the cryo recovery suite.',
      },
      {
        question: 'Is valet parking available at the facility?',
        answer: 'Yes, we provide complimentary secure valet parking for all active members at the main entrance of our Motera facility.',
      },
    ],
  });

  console.log('Seeding testimonials...');
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Rajesh Sharma',
        role: 'Managing Director',
        content: 'Ahmedabad\'s luxury fitness standard has finally arrived. Valet parking, private digital lockers, and absolute privacy. Coach Dev\'s bio-scans helped me lose 14kg in 4 months while managing my corporate workload.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=100',
      },
    ],
  });

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
