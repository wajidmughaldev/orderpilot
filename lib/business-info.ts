export const BUSINESS_INFO = {
  productName: 'OrderPilot',
  productDomain: 'orderpilot.pk',
  email: 'info@digipexsolutions.com', // General enquiry/support email
  website: 'https://orderpilot.pk',
  location: 'Pakistan',
  
  // Backer details
  backerName: 'Digipex Solutions',
  backerLegalName: 'Digipex Solutions LLC',
  backerLegalEntityDescription: 'a Colorado limited liability company registered in the United States',
  backerAddressLine1: '1500 N GRANT ST STE R',
  backerAddressLine2: 'Denver, CO 80203',
  backerCountry: 'United States',
  backerWebsite: 'https://digipexsolutions.com', // verified website spelling
  
  // Core founding team (URLs left blank/empty so they are prepared but not rendered as broken links)
  team: [
    {
      name: 'Abdul Wajid Khan',
      role: 'Founder & CEO',
      company: 'OrderPilot',
      linkedin: '',
    },
    {
      name: 'Muhammad Ebad Khan',
      role: 'Co-Founder & COO',
      company: 'OrderPilot',
      linkedin: '',
    },
    {
      name: 'Muhammad Hunain Memon',
      role: 'CTO',
      company: 'OrderPilot',
      additionalRole: 'Founder, Digipex Solutions',
      linkedin: '',
    },
  ],
};

export const BACKING_RELATIONSHIP_LINE = `OrderPilot is built by the OrderPilot team and backed by ${BUSINESS_INFO.backerName}, a registered business.`;
export const LEGAL_OPERATOR_LINE = `OrderPilot is built by the OrderPilot team and backed by ${BUSINESS_INFO.backerLegalName}, ${BUSINESS_INFO.backerLegalEntityDescription}.`;

