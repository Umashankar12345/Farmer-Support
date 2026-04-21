export const SUPPORT_STATES = {
  RJ: {
    name: "Rajasthan",
    districts: [
      { name: "Jaipur", officer: "Shri. R.C. Gupta", role: "Joint Director (Agri)", contact: "0141-2227849", email: "jd.jaipur@rajasthan.gov.in" },
      { name: "Jodhpur", officer: "Shri. M.S. Rathore", role: "Dy. Director (Agri)", contact: "0291-2550112", email: "dd.jodhpur@rajasthan.gov.in" },
      { name: "Kota", officer: "Shri. P.K. Sharma", role: "Joint Director (Agri)", contact: "0744-2423719", email: "jd.kota@rajasthan.gov.in" }
    ],
    helpline: "1800-180-1551 (Kisan Call Center)"
  },
  UP: {
    name: "Uttar Pradesh",
    districts: [
      { name: "Lucknow", officer: "Dr. Vinod Kumar", role: "District Agri Officer", contact: "0522-2200051", email: "dao.lucknow@up.gov.in" },
      { name: "Varanasi", officer: "Shri. Amit Singh", role: "Dy. Director (Agri)", contact: "0542-2348501", email: "dd.varanasi@up.gov.in" },
      { name: "Agra", officer: "Shri. Rahul Dev", role: "District Agri Officer", contact: "0562-2520114", email: "dao.agra@up.gov.in" }
    ],
    helpline: "1800-180-5109 (State Kisan Helpline)"
  },
  PB: {
    name: "Punjab",
    districts: [
      { name: "Ludhiana", officer: "Dr. Amanpreet Singh", role: "Chief Agri Officer", contact: "0161-2401184", email: "cao.ldh@punjab.gov.in" },
      { name: "Amritsar", officer: "Shri. Jatinder Gill", role: "Chief Agri Officer", contact: "0183-2553011", email: "cao.asr@punjab.gov.in" },
      { name: "Bathinda", officer: "Dr. Gurpreet Singh", role: "Chief Agri Officer", contact: "0164-2211514", email: "cao.bta@punjab.gov.in" }
    ],
    helpline: "0172-2701010 (Directorate Agri)"
  },
  MH: {
    name: "Maharashtra",
    districts: [
      { name: "Pune", officer: "Shri. Anil Mane", role: "Dist. Supt. Agri Officer", contact: "020-25538114", email: "dsao.pune@maharashtra.gov.in" },
      { name: "Nashik", officer: "Shri. Sanjay Patil", role: "Dist. Supt. Agri Officer", contact: "0253-2573011", email: "dsao.nsk@maharashtra.gov.in" },
      { name: "Aurangabad", officer: "Shri. Vijay Patil", role: "Dist. Supt. Agri Officer", contact: "0240-2334000", email: "dsao.abd@maharashtra.gov.in" }
    ],
    helpline: "1800-233-4000 (Farmer Call Center)"
  }
};

export const LIAISON_SERVICES = [
  { id: 'papers', title: 'Paperwork Help', desc: 'Assistance with scheme registration & document uploads.', icon: '📄' },
  { id: 'eligibility', title: 'Scheme Audit', desc: 'Full review of your eligibility for local subsidies.', icon: '🔍' },
  { id: 'grievance', title: 'Submit Grievance', desc: 'Formal channel to report delays or corruption.', icon: '⚖️' },
  { id: 'visit', title: 'Field Visit', desc: 'Apply for a formal farm inspection by an officer.', icon: '🚜' }
];
