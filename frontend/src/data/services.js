export const services = [
  {
    id: 1,
    category: "Civil Registry",
    title: "Birth Certificate Request",
    description:
      "Apply for a certified copy of your birth certificate from the Local Civil Registry Office.",
    icon: "📄",
    requirements: [
      "Valid government-issued ID",
      "Completed application form",
      "Processing fee: ₱50.00",
      "Self-addressed stamped envelope (if mailing)",
    ],
    processingTime: "3-5 working days",
    fees: "₱50.00",
    status: "active",
  },
  {
    id: 2,
    category: "Civil Registry",
    title: "Marriage Certificate Request",
    description: "Request a certified true copy of your marriage certificate.",
    icon: "💍",
    requirements: [
      "Valid government-issued ID",
      "Completed application form",
      "Processing fee: ₱75.00",
      "Original receipt of marriage license",
    ],
    processingTime: "5-7 working days",
    fees: "₱75.00",
    status: "active",
  },
  {
    id: 3,
    category: "Permits & Licenses",
    title: "Business Permit Application",
    description:
      "Apply for or renew your business permit to operate legally within the municipality.",
    icon: "🏪",
    requirements: [
      "DTI/SEC Registration",
      "Barangay Clearance",
      "Community Tax Certificate",
      "Lease contract or land title",
      "Sketch of business location",
    ],
    processingTime: "7-10 working days",
    fees: "₱500.00 - ₱5,000.00",
    status: "active",
  },
  {
    id: 4,
    category: "Permits & Licenses",
    title: "Building Permit",
    description:
      "Secure a building permit before starting any construction project.",
    icon: "🏗️",
    requirements: [
      "Signed application form",
      "Lot plan and vicinity map",
      "Structural plans (5 sets)",
      "Tax declaration",
      "Environmental compliance certificate",
    ],
    processingTime: "15-20 working days",
    fees: "₱2,000.00 - ₱50,000.00",
    status: "active",
  },
  {
    id: 5,
    category: "Social Services",
    title: "Senior Citizen ID Application",
    description:
      "Apply for a Senior Citizen ID card to avail of government benefits and discounts.",
    icon: "👴",
    requirements: [
      "Proof of age (birth certificate)",
      "Valid ID with photo",
      "Barangay clearance",
      "Two 1x1 ID photos",
    ],
    processingTime: "1-3 working days",
    fees: "Free",
    status: "active",
  },
  {
    id: 6,
    category: "Social Services",
    title: "Financial Assistance Program",
    description:
      "Apply for financial assistance for medical, educational, or emergency needs.",
    icon: "💰",
    requirements: [
      "Barangay indigency certificate",
      "Medical certificate (if medical)",
      "Enrollment form (if educational)",
      "Valid ID",
    ],
    processingTime: "3-5 working days",
    fees: "Free",
    status: "active",
  },
  {
    id: 7,
    category: "Health & Sanitation",
    title: "Sanitary Permit",
    description:
      "Apply for a sanitary permit for food establishments and public facilities.",
    icon: "🏥",
    requirements: [
      "Business permit",
      "Health certificate of workers",
      "Floor plan of establishment",
      "Potable water test results",
    ],
    processingTime: "3-5 working days",
    fees: "₱200.00 - ₱1,000.00",
    status: "active",
  },
  {
    id: 8,
    category: "Environment",
    title: "Tree Planting Permit",
    description:
      "Apply for a tree planting permit as part of our green community initiative.",
    icon: "🌳",
    requirements: [
      "Application form",
      "Proposed location map",
      "Species selection plan",
      "Maintenance commitment letter",
    ],
    processingTime: "5-7 working days",
    fees: "Free",
    status: "active",
  },
];

export const serviceCategories = [
  "All Services",
  "Civil Registry",
  "Permits & Licenses",
  "Social Services",
  "Health & Sanitation",
  "Environment",
];

export default services;
