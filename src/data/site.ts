export const COMPANY = {
  name: 'WINGS Security',
  email: 'info@wingssecurity.ie',
  phone: '+353 87 369 4378',
  tel: 'tel:+353873694378',
  whatsapp: 'https://wa.me/353873694378',
  hours: 'Monday to Friday, 09:00-17:00',
  address: 'Block 1, Office 156, Blanchardstown Corporate Park 1, Dublin 15',
  logo: '/brand/wings-wordmark.png',
  psa: '/brand/psa-licence.png',
  guardingImage: '/images/campus.webp',
  eventImage: '/images/event.webp',
} as const;

export const IMAGES = {
  hero: '/images/hero-guarding-branded.webp',
  campus: '/images/campus.webp',
  construction: '/images/construction.webp',
  retail: '/images/retail.webp',
  event: '/images/event.webp',
  reception: '/images/reception.webp',
  monitoring: '/images/monitoring.webp',
  logistics: '/images/logistics.webp',
} as const;

export interface ServiceUseCase { title: string; description: string }
export interface ServiceDetails {
  useCases: readonly ServiceUseCase[];
  outcomes: readonly string[];
}

export const serviceDetails: Readonly<Record<string, ServiceDetails>> = {
  'static-guarding': {
    useCases: [
      { title: 'Construction & vacant sites', description: 'Gate access, perimeter observations, delivery checks and agreed out-of-hours site protection.' },
      { title: 'Retail & shopping centres', description: 'A customer-facing security presence, coordination with store management and clear incident escalation.' },
      { title: 'Offices & commercial property', description: 'Visitor and contractor checks, building patrols and security that fits the working day.' },
      { title: 'Warehouses & logistics', description: 'Gatehouse duties, vehicle movements, restricted-area checks and structured shift handovers.' },
      { title: 'Residential & student accommodation', description: 'Common-area guarding, visitor procedures and liaison with the property management team.' },
      { title: 'Campuses & specialist premises', description: 'Site-specific guarding for education, healthcare and other controlled environments, with the required screening and training agreed before deployment.' },
    ],
    outcomes: ['An agreed assignment brief and nominated contacts', 'Access and patrol duties matched to the site', 'Observation records and incident escalation', 'Temporary, recurring and out-of-hours cover by agreement'],
  },
  'event-security': {
    useCases: [
      { title: 'Concerts & festivals', description: 'Event-site and equipment guarding, agreed access duties and coordination with the organiser and venue.' },
      { title: 'Corporate events & conferences', description: 'A professional presence for venues, delegates, production areas and event equipment.' },
      { title: 'Exhibitions & trade shows', description: 'Build-up, event-day and breakdown cover for exhibition spaces and designated equipment areas.' },
      { title: 'Sports & community events', description: 'Defined guarding and stewarding duties around the event layout, visitor flow and organiser instructions.' },
      { title: 'Private functions & celebrations', description: 'A discreet event presence with the role and any door-supervision requirement assessed in advance.' },
      { title: 'Setup, breakdown & overnight cover', description: 'Security outside public opening hours for temporary infrastructure, stages and production equipment.' },
    ],
    outcomes: ['Roles defined against the event plan and licence requirements', 'A shared briefing and clear reporting contacts', 'Guarding and non-security stewarding duties agreed separately', 'Door supervision coordinated with licensed specialist providers where required'],
  },
  'reception-security': {
    useCases: [
      { title: 'Corporate receptions', description: 'A welcoming security presence that works alongside reception and facilities teams.' },
      { title: 'Managed commercial buildings', description: 'Tenant, visitor and contractor procedures around the building’s operating hours.' },
      { title: 'Residential entrances', description: 'Front-desk access procedures and coordination with property management.' },
      { title: 'Visitor-heavy premises', description: 'Clear sign-in, host notification and escalation arrangements tailored to the site.' },
    ],
    outcomes: ['Defined visitor procedures', 'Professional front-of-house presentation', 'Agreed access records', 'A clear management contact'],
  },
  'specialist-solutions': {
    useCases: [
      { title: 'CCTV & security installation', description: 'Discuss cameras, intruder alarms and access-control requirements with an appropriate specialist provider.' },
      { title: 'Remote monitoring', description: 'CCTV and alarm-monitoring requirements assessed around your premises, hours and escalation needs.' },
      { title: 'Door supervision', description: 'Licensed door-supervision requirements for venues, licensed premises and events.' },
      { title: 'Combined security requirements', description: 'A coordinated brief where on-site guarding and specialist provision need to work together.' },
    ],
    outcomes: ['One initial conversation with WINGS', 'Appropriate specialist assessment', 'Licensing and delivery responsibilities confirmed', 'Written scope and availability before work begins'],
  },
};

export const sectorImages: Readonly<Record<string, string>> = {
  construction: IMAGES.construction, retail: IMAGES.retail, corporate: '/images/sector-corporate.webp',
  'industrial-logistics': IMAGES.logistics, residential: '/images/sector-residential.webp',
  education: '/images/sector-education.webp', healthcare: '/images/sector-healthcare.webp', 'public-sector': '/images/sector-public-sector.webp',
  events: IMAGES.event, pharmaceutical: '/images/sector-pharmaceutical.webp',
  hospitality: '/images/sector-hospitality.webp', 'small-business': '/images/sector-small-business.webp',
};

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  label: string;
  summary: string;
  introduction: string;
  duties: readonly string[];
  preparation: string;
  image: string;
  delivery: 'wings' | 'specialist';
}

export const services: readonly Service[] = [
  {
    slug: 'static-guarding', title: 'Static guarding. A reassuring presence.', shortTitle: 'Static guarding',
    label: 'ON-SITE SECURITY',
    summary: 'Dedicated guarding for workplaces, properties and sites. Temporary cover or a regular presence, shaped around your operation.',
    introduction: 'Your site has its own routines, people and risks. We start by understanding them. WINGS provides static guarding across the Republic of Ireland, with duties and cover agreed around your site rather than a one-size-fits-all package.',
    duties: ['Access control and visitor checks against your site instructions', 'An on-site security presence and agreed patrol duties', 'Recording observations and escalating incidents to nominated contacts', 'Shift handovers and coordination with your site team'],
    preparation: 'Tell us the site location, proposed start date, shift hours and the main duties. We will discuss access arrangements, induction, reporting and the appropriate staffing before confirming a written proposal.',
    image: IMAGES.construction, delivery: 'wings',
  },
  {
    slug: 'event-security', title: 'Event security. Ready for the occasion.', shortTitle: 'Event security',
    label: 'EVENTS & VENUES',
    summary: 'A considered security presence for events of every scale. Clear briefs, defined responsibilities and a shared plan.',
    introduction: 'From a corporate gathering to an outdoor event, security needs to work with the organiser, the venue and the programme. WINGS provides event guarding within its PSA licence scope, with the assignment agreed before deployment.',
    duties: ['Event-site guarding and protection of equipment or designated areas', 'Supporting agreed access arrangements within the licensed role', 'Liaison with organisers, venue teams and nominated supervisors', 'Reporting concerns and following the event escalation plan'],
    preparation: 'Share the date, location, event format, expected attendance, operating hours and your proposed duties. Door-supervision requirements are assessed separately and coordinated with appropriately licensed specialist providers.',
    image: COMPANY.eventImage, delivery: 'wings',
  },
  {
    slug: 'reception-security', title: 'Reception security. A professional welcome.', shortTitle: 'Reception security',
    label: 'FRONT OF HOUSE',
    summary: 'A front-of-house security presence that helps your visitors feel welcome and your workplace stay organised.',
    introduction: 'The reception desk is often the first point of contact with your organisation. We discuss how visitor management, access procedures and security duties should work alongside your existing reception and facilities teams.',
    duties: ['Visitor sign-in and liaison with hosts', 'Checking access permissions in line with your procedures', 'Maintaining an agreed reception and security log', 'Escalating access concerns to your nominated contact'],
    preparation: 'Let us know your opening hours, visitor volume, building access arrangements and the balance of reception and security duties required.',
    image: IMAGES.reception, delivery: 'wings',
  },
  {
    slug: 'specialist-solutions', title: 'Specialist security. One conversation.', shortTitle: 'Specialist solutions',
    label: 'COORDINATED DELIVERY',
    summary: 'Installation, remote-monitoring and door-supervision enquiries coordinated with appropriately licensed specialist providers.',
    introduction: 'Some requirements need specialist equipment, monitoring or a different licensed role. Tell WINGS what you need and we will coordinate an assessment with the appropriate specialist provider. The delivery arrangements, provider responsibilities and scope are confirmed in the proposal.',
    duties: ['CCTV, alarm and access-control installation enquiries', 'Remote CCTV and alarm-monitoring enquiries', 'Door-supervision enquiries for venues and events', 'Coordination of specialist requirements alongside guarding'],
    preparation: 'Specialist services are delivered by appropriately licensed providers. The proposal confirms the provider, responsibilities, scope and availability. IRIS is a separate future development.',
    image: IMAGES.monitoring, delivery: 'specialist',
  },
];

export interface Sector {
  slug: string;
  title: string;
  summary: string;
  focus: readonly string[];
  brief: string;
}

export const sectors: readonly Sector[] = [
  { slug: 'construction', title: 'Construction & development', summary: 'Guarding around changing sites, access points and project schedules.', focus: ['Site access and delivery procedures', 'Agreed perimeter patrols and observations', 'Site induction, welfare and escalation arrangements'], brief: 'Share the project phase, site boundaries, working hours and induction requirements. Site-specific training and credentials must be checked before deployment.' },
  { slug: 'retail', title: 'Retail & shopping centres', summary: 'A visible presence that fits the pace of your store and the customer experience.', focus: ['Customer-facing guarding duties', 'Coordination with store and centre management', 'Incident reporting and agreed escalation'], brief: 'Tell us about opening times, busy periods and the duties expected of the officer. We agree reporting and intervention procedures with your management team.' },
  { slug: 'corporate', title: 'Offices & commercial property', summary: 'Security that works alongside your people, tenants and visitors.', focus: ['Visitor and contractor access procedures', 'Front-of-house security', 'Building handovers and nominated contacts'], brief: 'Share your occupancy pattern, reception needs, access systems and out-of-hours arrangements. We will distinguish guarding duties from facilities-management tasks.' },
  { slug: 'industrial-logistics', title: 'Industrial & logistics', summary: 'Site guarding shaped around deliveries, shift changes and restricted areas.', focus: ['Gatehouse and vehicle access procedures', 'Contractor and visitor checks', 'Agreed site patrols and shift handovers'], brief: 'Outline delivery schedules, vehicle movements, restricted areas and site hazards so the assignment can be assessed and briefed properly.' },
  { slug: 'residential', title: 'Residential & student living', summary: 'A considered security presence for managed properties and shared spaces.', focus: ['Reception and visitor procedures', 'Common-area observations', 'Escalation to property management'], brief: 'Tell us about the property, occupancy, reception hours and resident-contact procedures. The role must respect residents, privacy and agreed boundaries.' },
  { slug: 'education', title: 'Education & campuses', summary: 'Guarding enquiries for learning environments and campus facilities.', focus: ['Authorised access procedures', 'Campus opening and closing requirements', 'Coordination with facilities and safeguarding leads'], brief: 'Any required screening, safeguarding briefings and site induction must be identified and verified before an assignment is agreed. We do not assume one screening standard fits every site.' },
  { slug: 'healthcare', title: 'Healthcare & care settings', summary: 'Site-specific guarding enquiries for sensitive, people-focused environments.', focus: ['Visitor and premises access procedures', 'Coordination with the on-site management team', 'Clear boundaries and incident escalation'], brief: 'We assess the exact role, required training and screening with the organisation. Clinical duties and specialist interventions are not assumed to be part of a guarding assignment.' },
  { slug: 'public-sector', title: 'Public sector & community', summary: 'Guarding requirements for public buildings, facilities and community spaces.', focus: ['Defined assignment instructions', 'Visitor access and site reporting', 'Procurement and contract requirements'], brief: 'Share the procurement requirements, service specification and expected evidence. This page invites enquiries; it does not imply an existing public-sector contract or framework appointment.' },
  { slug: 'events', title: 'Events & live experiences', summary: 'Guarding that supports your event plan, venue and production team.', focus: ['Pre-event requirements and role definition', 'Event-site and equipment guarding', 'Communication with organisers and venue staff'], brief: 'Provide your event date, venue, expected attendance and required duties. Guarding and door-supervision roles are assessed separately against the relevant licence requirements.' },
  { slug: 'pharmaceutical', title: 'Pharmaceutical & specialist sites', summary: 'Guarding enquiries where site instructions and access discipline matter.', focus: ['Controlled visitor and contractor procedures', 'Site-specific induction requirements', 'Documented observations and escalation'], brief: 'We assess required screening, training and site procedures before agreeing cover. No pharmaceutical certification, cleanroom competence or existing sector client is implied.' },
  { slug: 'hospitality', title: 'Hotels & hospitality', summary: 'A professional security presence that respects your guests, staff and the way your venue operates.', focus: ['Reception and guest-access procedures', 'Premises and event-space guarding', 'Coordination with venue management and specialist door-supervision providers'], brief: 'Describe the venue, guest arrivals, operating hours and any events or licensed areas. We distinguish premises guarding from door supervision, agree the role with your management team and coordinate the appropriate specialist licence category where required.' },
  { slug: 'small-business', title: 'SME & small business', summary: 'A proportionate guarding brief for shops, offices and smaller business premises.', focus: ['The hours and access points that matter most', 'Temporary or recurring guarding requirements', 'A named business contact and practical reporting arrangements'], brief: 'Start with your premises, opening hours and the specific concern you need addressed. We discuss a focused guarding role rather than assuming every business needs the same level of cover. Share your preferred schedule and any existing alarm or monitoring arrangements so responsibilities can be agreed clearly.' },
];

export interface ArticleSection { heading: string; paragraphs: readonly string[] }
export interface Article {
  slug: string;
  title: string;
  category: string;
  summary: string;
  minutes: number;
  image: string;
  service: string;
  sections: readonly ArticleSection[];
}

export const articles: readonly Article[] = [
  { slug: 'requesting-a-security-quote', title: 'A better brief. A more useful security quote.', category: 'BUYER GUIDE', summary: 'The details to gather before requesting guarding cover, from shift patterns to the site handover.', minutes: 3, image: IMAGES.reception, service: 'static-guarding', sections: [
    { heading: 'Start with the site and the purpose', paragraphs: ['Give the site address and explain why you need cover. A vacant property, occupied office and active construction site present different requirements. Describe the areas to be guarded, access points and who will be present during each shift. Avoid sending sensitive access codes through a public enquiry form.'] },
    { heading: 'Define the time, not just the number of guards', paragraphs: ['Include the start date, finish date if known, days of the week and expected shift times. Highlight weekends, overnight work and any variation between days. If you do not know the required staffing level, say so rather than selecting a number without an assessment.'] },
    { heading: 'Make responsibilities explicit', paragraphs: ['List the duties you want covered: visitor checks, site patrols, a reception presence or recording deliveries. Identify the person who can approve changes. Share the required induction and credentials so suitability can be checked before anyone is assigned.'] },
    { heading: 'Compare the scope as well as the price', paragraphs: ['Ask what reporting, supervision, handover arrangements and additional charges are included. Check the process for a change of hours or an extension. A written proposal should make responsibilities clear on both sides. An enquiry is the start of that discussion, not a confirmed booking.'] },
  ] },
  { slug: 'planning-event-security', title: 'Event security starts before the gates open.', category: 'EVENT PLANNING', summary: 'A practical starting point for a conversation between the organiser, the venue and the security provider.', minutes: 3, image: COMPANY.eventImage, service: 'event-security', sections: [
    { heading: 'Bring the whole event into the brief', paragraphs: ['Share the event format, venue, attendance estimate, programme and arrival pattern. Include setup and breakdown periods, not just the time that guests are present. Identify who owns the event plan and who is authorised to make decisions on the day.'] },
    { heading: 'Separate different responsibilities', paragraphs: ['Event guarding, stewarding, door supervision and medical provision are not interchangeable. Agree the exact responsibilities and the licensing or qualifications applicable to each role. Do not use a generic job title as a substitute for a clear assignment.'] },
    { heading: 'Agree communications and escalation', paragraphs: ['Confirm who each team reports to, how concerns are communicated and which venue procedures apply. Give the security provider the current site plan and briefing instructions. Changes to access arrangements or timings should reach everyone affected before the event begins.'] },
    { heading: 'Allow time for assessment', paragraphs: ['There is no universal guard-to-attendee ratio that replaces a site-specific assessment. The event layout, activities and requirements all matter. Discuss your plans early and make sure the final written scope matches what the organiser and venue expect.'] },
  ] },
  { slug: 'construction-site-guarding-brief', title: 'What belongs in a construction-site guarding brief?', category: 'SITE SECURITY', summary: 'Access points, site changes and handovers: useful questions before arranging construction cover.', minutes: 3, image: IMAGES.construction, service: 'static-guarding', sections: [
    { heading: 'Work from the current site layout', paragraphs: ['Construction sites change as the project develops. Identify current boundaries, entry points, delivery routes and areas that are not safe to enter. The guarding brief should use the current site layout rather than an old plan from a previous project phase.'] },
    { heading: 'Define access procedures', paragraphs: ['Agree how authorised workers, visitors and deliveries will be checked and who can resolve an uncertain entry request. Specify the record required and how it is handed over. Security officers should not be expected to improvise access decisions without instructions.'] },
    { heading: 'Confirm site readiness', paragraphs: ['Identify induction, required training, welfare arrangements, communication equipment and the emergency contact list. Confirm relevant credentials before deployment. The scope should distinguish guarding from any construction, traffic-management or safety role.'] },
    { heading: 'Keep the brief up to date', paragraphs: ['Tell the provider when gates move, working hours change or new areas open. Agree how changes are approved and communicated to the next shift. Regular handovers give both the site team and security officers a shared understanding of what has changed.'] },
  ] },
  { slug: 'retail-security-duties', title: 'Retail security that fits the customer experience.', category: 'RETAIL', summary: 'How to define a customer-facing guarding role without leaving duties or escalation to assumption.', minutes: 3, image: IMAGES.retail, service: 'static-guarding', sections: [
    { heading: 'Start with your store', paragraphs: ['Opening times, customer flow and the layout of a store influence the guarding assignment. Explain busy periods, staff arrival arrangements and shared responsibilities with shopping-centre management. What works for one location is not automatically suitable for another.'] },
    { heading: 'Agree the role with management', paragraphs: ['A visible security presence should sit alongside customer service, not replace store management. Define the duties, reporting expectations and escalation procedures. Discuss difficult situations in advance rather than expecting an officer to infer store policy during an incident.'] },
    { heading: 'Make handovers useful', paragraphs: ['Give each shift a nominated management contact and a way to record relevant observations. Share changes to opening hours, deliveries or access arrangements. Incident records should contain factual information and be handled according to the agreed process.'] },
    { heading: 'Review the assignment', paragraphs: ['Use observations and management feedback to review whether the agreed cover still matches the store. Changes to duties or hours should be documented. Begin an enquiry with your location, operating hours and the concerns you want the assignment to address.'] },
  ] },
  { slug: 'temporary-and-recurring-cover', title: 'Temporary cover or a regular guarding team?', category: 'GUARDING', summary: 'How to scope a short assignment and a recurring requirement with the same attention to detail.', minutes: 3, image: IMAGES.logistics, service: 'static-guarding', sections: [
    { heading: 'Understand the requirement', paragraphs: ['Temporary guarding can support a defined period or a change in site circumstances. Recurring guarding provides an agreed schedule over a longer term. Neither should be booked solely by the length of the contract; the duties, site requirements and staffing suitability still need assessment.'] },
    { heading: 'Do not skip mobilisation for short cover', paragraphs: ['Even a short assignment needs an authorised contact, site instructions, access arrangements and an escalation process. Make enough time for the provider to confirm suitability and availability. Sending an enquiry does not reserve an officer or guarantee a start time.'] },
    { heading: 'Plan continuity for recurring work', paragraphs: ['Discuss how shift information, site changes and scheduled hours will be communicated. Agree who reviews the service and how extensions or variations are approved. Document the duties so different shifts follow the same instructions.'] },
    { heading: 'Give the provider a useful starting point', paragraphs: ['Share your preferred start date, site location, regular hours and known end date. Explain any flexibility in the schedule. A written proposal should confirm the scope, price and responsibilities before the assignment begins.'] },
  ] },
  { slug: 'choosing-a-security-provider', title: 'Questions to ask your next security provider.', category: 'BUYER GUIDE', summary: 'Look beyond the headline promise and ask how your specific assignment will be delivered.', minutes: 3, image: COMPANY.eventImage, service: 'static-guarding', sections: [
    { heading: 'Check the relevant licence', paragraphs: ['Ask which contractor licence category applies to your requested service and check the current PSA register. A licence for one activity is not evidence of authorisation for every security service. Where specialist providers are involved, clarify who will deliver each element.'] },
    { heading: 'Ask about the site brief', paragraphs: ['Find out how instructions, required credentials and site induction will be agreed. Explain your escalation contacts and reporting needs. A useful conversation should address the specific work, not just list generic assurances.'] },
    { heading: 'Understand the written proposal', paragraphs: ['Check the schedule, duties, price, exclusions and change process. Ask how concerns are raised and who owns the response. Request relevant insurance evidence and references where available; do not assume a logo or stock photograph proves experience.'] },
    { heading: 'Separate current services from future plans', paragraphs: ['If a provider describes a platform or dashboard, ask which features are available now. Planned technology is not a substitute for current delivery arrangements. At WINGS, WYNTRA and IRIS are labelled as in development rather than offered as live platforms.'] },
  ] },
];

export const enquiryTypes: readonly string[] = ['Static guarding', 'Event security', 'Reception security', 'Specialist solutions', 'Business partnership / subcontracting', 'General enquiry'];

export const publicPaths: readonly string[] = [
  '/', '/services', '/sectors', '/about', '/partnerships', '/technology', '/insights', '/careers', '/contact', '/privacy-policy', '/terms-of-service',
  ...services.map((service: Service): string => `/services/${service.slug}`),
  ...sectors.map((sector: Sector): string => `/sectors/${sector.slug}`),
  ...articles.map((article: Article): string => `/insights/${article.slug}`),
];
