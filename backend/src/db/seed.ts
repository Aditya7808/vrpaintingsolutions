/**
 * Seed script — populates the database with initial services,
 * a sample admin user, and placeholder gallery images.
 *
 * Run: npm run seed
 */
import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import { query, closePool } from './client';
import * as fs from 'fs';
import * as path from 'path';

async function seed() {
  console.log('🌱 Seeding database…\n');

  // 1. Run schema
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  await query(schema);
  console.log('✅ Schema created');

  // 2. Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@vrpaintingsolutions.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123';
  const hash = await bcrypt.hash(adminPassword, 12);

  await query(
    `INSERT INTO admin_users (email, password_hash) VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = $2`,
    [adminEmail, hash]
  );
  console.log(`✅ Admin user: ${adminEmail}`);

  // 3. Seed services
  const services = [
    {
      slug: 'interior-painting',
      title: 'Interior Painting',
      short_description: 'Transform your living spaces with premium interior painting — flawless finishes, proper surface prep, and colours that make every room feel like home.',
      full_description: 'Our interior painting service covers every room in your home or office. We start with thorough surface preparation — filling cracks, sanding rough patches, and priming walls — to ensure a smooth, long-lasting finish. Choose from thousands of shades across brands like Asian Paints, Berger, and Nerolac. We work around your schedule to minimize disruption and always leave your space spotless.',
      scope_of_work: 'Wall preparation (putty, primer, sanding) • 2–3 coats of premium emulsion paint • Ceiling painting • Trim and moulding finishing • Furniture and floor protection • Post-paint cleanup',
      process_steps: JSON.stringify([
        { step: 1, title: 'Free Site Inspection', description: 'Our team visits your home, measures wall area, and assesses surface condition.' },
        { step: 2, title: 'Colour Consultation', description: 'Browse shades with our expert. We bring colour cards and can do test patches on your wall.' },
        { step: 3, title: 'Detailed Quote', description: 'Transparent, itemised quote with paint brand, type, and labour — no hidden charges.' },
        { step: 4, title: 'Surface Preparation', description: 'Putty application, sanding, crack filling, and primer coat for a flawless base.' },
        { step: 5, title: 'Painting', description: '2–3 coats of your chosen paint applied with rollers and brushes for an even finish.' },
        { step: 6, title: 'Final Walkthrough', description: 'Owner personally inspects every wall with you and addresses any touch-ups on the spot.' },
      ]),
      faqs: JSON.stringify([
        { q: 'How long does interior painting take?', a: 'A 2BHK typically takes 5–7 working days, including surface prep and drying time.' },
        { q: 'Do I need to move furniture out?', a: 'No — we carefully cover and shift furniture away from walls. Everything goes back once dry.' },
        { q: 'Can I change colours mid-project?', a: 'Absolutely. We accommodate colour changes without extra hassle or charges for unused paint.' },
        { q: 'Which paint brands do you use?', a: 'Asian Paints, Berger, Nerolac, and Dulux. We recommend the best option for your walls and budget.' },
      ]),
      sort_order: 1,
    },
    {
      slug: 'exterior-painting',
      title: 'Exterior Painting',
      short_description: 'Weather-tough exterior painting that protects your building from Pune\'s monsoons while giving it a fresh, striking look for years.',
      full_description: 'Pune\'s climate demands paint that can handle intense monsoon rain, summer heat, and humidity. Our exterior painting service uses weather-proof, UV-resistant paints that resist peeling, cracking, and algae growth. We prep every surface meticulously — pressure washing old paint, sealing hairline cracks, and applying weatherproof primer — before laying down 2–3 coats of durable exterior emulsion.',
      scope_of_work: 'Pressure washing and surface cleaning • Crack sealing and waterproof putty • Exterior primer application • 2–3 coats of weather-proof exterior emulsion • Trim, grille, and gate painting • Scaffolding and safety equipment',
      process_steps: JSON.stringify([
        { step: 1, title: 'Building Survey', description: 'We inspect exterior walls for cracks, dampness, algae, and peeling paint.' },
        { step: 2, title: 'Surface Preparation', description: 'Pressure wash, scrape, and sand the entire exterior. Seal cracks with weather-resistant filler.' },
        { step: 3, title: 'Primer & Base Coat', description: 'Apply exterior-grade primer that bonds to the surface and blocks moisture.' },
        { step: 4, title: 'Top Coats', description: '2–3 coats of premium weather-proof paint with UV protection.' },
        { step: 5, title: 'Final Inspection', description: 'Walk around the building with you to ensure complete, even coverage.' },
      ]),
      faqs: JSON.stringify([
        { q: 'How long does exterior paint last in Pune?', a: 'With proper prep and quality paint, exterior paint lasts 7–10 years in Pune\'s climate.' },
        { q: 'Do you handle multi-storey buildings?', a: 'Yes — we use scaffolding and safety harnesses for buildings up to 5 floors.' },
        { q: 'Can you paint during monsoon?', a: 'We pause during active rain. We plan schedules around weather forecasts to minimise delays.' },
      ]),
      sort_order: 2,
    },
    {
      slug: 'waterproofing',
      title: 'Waterproofing',
      short_description: 'Stop leaks and dampness before they damage your home. Professional waterproofing for terraces, bathrooms, and exterior walls.',
      full_description: 'Water damage is the number one threat to buildings in Pune\'s monsoon belt. Our waterproofing service uses industry-grade membranes, coatings, and sealants to keep moisture out of your terrace, bathroom, basement, and exterior walls. We diagnose the root cause of leakage — not just the symptom — and apply targeted solutions that come with a workmanship warranty.',
      scope_of_work: 'Leak detection and root-cause analysis • Terrace waterproofing (membrane/coating) • Bathroom waterproofing (below tiles) • External wall damp-proofing • Crack injection sealing • Drainage improvement recommendations',
      process_steps: JSON.stringify([
        { step: 1, title: 'Leak Assessment', description: 'We inspect walls, ceilings, and terraces to trace the source of water ingress.' },
        { step: 2, title: 'Surface Preparation', description: 'Clean and prep the surface — remove loose material, open cracks for proper sealing.' },
        { step: 3, title: 'Waterproof Application', description: 'Apply appropriate solution: liquid membrane, cementitious coating, or injectable sealant.' },
        { step: 4, title: 'Curing & Testing', description: 'Allow proper curing time, then water-test the treated area to confirm seal.' },
      ]),
      faqs: JSON.stringify([
        { q: 'How long does waterproofing last?', a: 'Our terrace waterproofing comes with a 5-year workmanship warranty and typically lasts 8–12 years.' },
        { q: 'Can you waterproof without breaking tiles?', a: 'In many cases, yes. We use injection grouting and surface sealants that don\'t require tile removal.' },
        { q: 'Do you fix internal wall dampness?', a: 'Yes. We treat damp walls from the exterior to block moisture at the source.' },
      ]),
      sort_order: 3,
    },
    {
      slug: 'texture-pop',
      title: 'Texture & POP Design',
      short_description: 'Elevate your interiors with custom texture finishes, accent walls, and POP false ceilings — from rustic stone effects to sleek modern panels.',
      full_description: 'Add character and depth to your rooms with our texture painting and POP (Plaster of Paris) services. Choose from dozens of finishes — metallic sheen, rustic stone, sand swirl, Italian stucco, or geometric patterns — applied by experienced artisans. We also design and install POP false ceilings with integrated lighting profiles for a complete room transformation.',
      scope_of_work: 'Texture accent walls (roller, trowel, stencil) • Full-room texture painting • POP false ceiling design & installation • Cove and peripheral lighting channels • Designer wall panels • Colour-wash and sponge effects',
      process_steps: JSON.stringify([
        { step: 1, title: 'Design Discussion', description: 'We show you texture samples and ceiling designs to match your room\'s style.' },
        { step: 2, title: 'Surface Prep', description: 'Smooth and prime walls to ensure the texture bonds properly and looks even.' },
        { step: 3, title: 'Texture Application', description: 'Our artisans hand-apply the chosen finish with precision tools.' },
        { step: 4, title: 'POP Installation', description: 'Fabricate and mount POP ceiling panels with recessed lighting channels.' },
        { step: 5, title: 'Finishing Touches', description: 'Seal, sand edges, and clean up. Walk through the result with you.' },
      ]),
      faqs: JSON.stringify([
        { q: 'Is texture paint more expensive than regular paint?', a: 'Texture paint costs more per sq. ft due to materials and skilled labour, but it\'s applied to accent walls — not the entire room — keeping the total budget manageable.' },
        { q: 'Can texture paint be applied on old walls?', a: 'Yes, after proper surface prep (putty, primer). Old paint is sanded for good adhesion.' },
        { q: 'How long does POP ceiling installation take?', a: 'A single room POP ceiling typically takes 3–5 days including drying time.' },
      ]),
      sort_order: 4,
    },
    {
      slug: 'commercial-painting',
      title: 'Commercial Painting',
      short_description: 'Professional painting for offices, showrooms, retail spaces, and apartment complexes — on schedule, within budget, and built to impress.',
      full_description: 'First impressions matter. Our commercial painting service helps businesses, offices, retail stores, and housing societies present their best face. We work outside business hours to minimise disruption, follow strict timelines, and use commercial-grade paints rated for high-traffic environments. From a single cabin to an entire apartment complex, we scale to fit your project.',
      scope_of_work: 'Office interiors and cabin painting • Showroom and retail floor painting • Apartment complex common areas • Parking and basement line marking • Signage and branding walls • After-hours scheduling to avoid business disruption',
      process_steps: JSON.stringify([
        { step: 1, title: 'Site Assessment', description: 'We survey the commercial space, understand your branding, and note access restrictions.' },
        { step: 2, title: 'Project Plan & Timeline', description: 'Detailed scope, timeline, and phased schedule (nights/weekends if needed).' },
        { step: 3, title: 'Execution', description: 'Professional crew with commercial-grade materials. Daily progress reports.' },
        { step: 4, title: 'Quality Check & Handover', description: 'Final walkthrough, touch-ups, and formal handover with warranty documentation.' },
      ]),
      faqs: JSON.stringify([
        { q: 'Can you paint our office without shutting down operations?', a: 'Yes — we routinely paint offices during nights and weekends to keep your business running.' },
        { q: 'Do you handle society/apartment complex repainting?', a: 'Yes. We have experience with multi-building society projects including common areas, stairwells, and facades.' },
        { q: 'What warranty do you offer on commercial projects?', a: 'We provide a written workmanship warranty. Duration depends on paint type and surface conditions.' },
      ]),
      sort_order: 5,
    },
    {
      slug: 'color-consultation',
      title: 'Color Consultation',
      short_description: 'Find the perfect palette with professional on-site color consulting — shade cards, lighting analysis, and test patches tailored to your space.',
      full_description: 'Choosing the right wall colors can feel overwhelming with thousands of shades available. Our personalized color consultation brings shade decks, digital visualizations, and physical test patches directly to your space. We consider natural lighting, room dimensions, interior furnishings, and your aesthetic goals to create harmonious color palettes for every room.',
      scope_of_work: 'On-site lighting & space assessment • Shade book & digital palette selection • Wall test patch application • Accent wall & finish pairing (matte/satin/gloss) • Personalized paint specification sheet',
      process_steps: JSON.stringify([
        { step: 1, title: 'Space & Light Survey', description: 'Evaluate room dimensions, natural sunlight, and evening ambient lighting.' },
        { step: 2, title: 'Palette Discovery', description: 'Review your preferences, furnishings, and trending architectural palettes.' },
        { step: 3, title: 'Sample Wall Swatches', description: 'Apply real paint patches on actual walls to observe day-to-night transitions.' },
        { step: 4, title: 'Finish & Product Selection', description: 'Choose between luxury matte, silk, satin, or washable emulsions.' },
        { step: 5, title: 'Specification Handover', description: 'Detailed color codes, brand choices, and paint schedules ready for execution.' },
      ]),
      faqs: JSON.stringify([
        { q: 'Can you provide test swatches on my walls?', a: 'Yes! We apply physical sample patches so you can see how light changes the color throughout the day.' },
        { q: 'Do you help match existing furniture and curtains?', a: 'Absolutely. We take your flooring, curtains, lighting fixtures, and furniture into full account.' },
        { q: 'Is color consultation included with full painting projects?', a: 'Yes, a complimentary color consultation is included with every full interior or exterior painting package.' },
      ]),
      sort_order: 6,
    },
  ];

  for (const svc of services) {
    await query(
      `INSERT INTO services (slug, title, short_description, full_description, scope_of_work, process_steps, faqs, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (slug) DO UPDATE SET
         title = $2, short_description = $3, full_description = $4,
         scope_of_work = $5, process_steps = $6, faqs = $7, sort_order = $8`,
      [svc.slug, svc.title, svc.short_description, svc.full_description,
       svc.scope_of_work, svc.process_steps, svc.faqs, svc.sort_order]
    );
    console.log(`  ✅ Service: ${svc.title}`);
  }

  const serviceSlugs = ['interior-painting', 'exterior-painting', 'waterproofing', 'texture-pop', 'commercial-painting', 'color-consultation'];
  const filenames = [
    "2026-02-28 (1).jpg", "2026-02-28 (2).jpg", "2026-02-28.jpg",
    "2026-03-07 (1).jpg", "2026-03-07 (2).jpg", "2026-03-07 (3).jpg",
    "2026-03-07 (4).jpg", "2026-03-07 (5).jpg", "2026-03-07 (6).jpg",
    "2026-03-07 (7).jpg", "2026-03-07 (8).jpg", "2026-03-07 (9).jpg",
    "2026-03-07.jpg", "2026-03-15.png",
    "2026-05-29 (1).jpg", "2026-05-29 (2).jpg", "2026-05-29.jpg",
    "2026-06-16.jpg", "IMG-20260613-WA0005 (1).jpg",
    "WhatsApp Image 2026-09-24 at 11.20.45 PM - Copy.jpeg",
    "WhatsApp Image 2026-09-24 at 11.53.46 PM - Copy.jpeg",
    "WhatsApp Image 2026-09-24 at 11.53.46 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.54.33 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.54.34 PM - Copy.jpeg",
    "WhatsApp Image 2026-09-24 at 11.54.37 PM (1).jpeg",
    "WhatsApp Image 2026-09-24 at 11.54.38 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.54.39 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.54.42 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.55.16 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.55.17 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.55.18 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.55.19 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.56.28 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.56.30 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.56.31 PM - Copy.jpeg",
    "WhatsApp Image 2026-09-24 at 11.56.31 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.56.32 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.56.33 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.56.34 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.56.36 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.56.37 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.57.18 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.57.19 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.57.20 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.57.21 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.57.22 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.57.23 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.57.25 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.57.26 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.58.47 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.59.18 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.59.20 PM.jpeg",
    "WhatsApp Image 2026-09-24 at 11.59.21 PM (1).jpeg",
    "WhatsApp Image 2026-09-24 at 11.59.25 PM.jpeg",
    "our-team.jpg",
    "WhatsApp Image 2026-09-25 at 12.01.29 AM.jpeg",
    "WhatsApp Image 2026-09-25 at 12.01.51 AM.jpeg",
    "WhatsApp Image 2026-09-25 at 12.01.52 AM.jpeg",
    "WhatsApp Image 2026-09-25 at 12.01.53 AM.jpeg",
    "WhatsApp Image 2026-09-25 at 12.02.38 AM.jpeg",
    "WhatsApp Image 2026-09-25 at 12.02.39 AM.jpeg",
    "WhatsApp Image 2026-09-25 at 12.02.40 AM.jpeg",
    "WhatsApp Image 2026-09-25 at 12.02.41 AM.jpeg",
    "unnamed.webp"
  ];
  
  const serviceLabels: Record<string, string> = {
    'interior-painting': 'Interior Painting Work',
    'exterior-painting': 'Exterior Painting Work',
    'waterproofing': 'Waterproofing Work',
    'texture-pop': 'Wall Texture & POP Work',
    'commercial-painting': 'Commercial Painting Work',
    'color-consultation': 'Color Consultation & Repaint',
  };

  const placeholderImages = filenames.map((file, idx) => {
    const service_slug = serviceSlugs[idx % serviceSlugs.length];
    return {
      url: `/portfolio/${file}`,
      service_slug,
      caption: file === 'our-team.jpg' ? 'VR Painting Solutions Team' : (serviceLabels[service_slug] || 'VR Painting Work'),
    };
  });

  for (const img of placeholderImages) {
    await query(
      `INSERT INTO gallery_images (url, service_slug, caption) VALUES ($1, $2, $3)`,
      [img.url, img.service_slug, img.caption]
    );
  }
  console.log('  ✅ Placeholder gallery images seeded');

  console.log('\n🎉 Seed complete!\n');
  await closePool();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
