/**
 * Complete Seed Data for Delhi - NEW DELHI Constituency
 * Real candidate data from MyNeta (2024 Delhi Assembly Elections)
 * All 23 candidates with correct asset/liability values
 */

export const delhiData = {
  state: {
    name: 'Delhi',
    code: 'DL'
  },
  constituencies: [
    {
      name: 'NEW DELHI',
      code: 'NEW_DELHI',
      candidates: [
        { name: 'Anita', party: 'IND', symbol: '⭐', education: 'Post Graduate', age: 34, criminalCases: 0, assets: '< ₹1 Lakh', liabilities: '₹1–10 Lakh', dataSource: 'MyNeta' },
        { name: 'Anuradha Rana', party: 'IND', symbol: '⭐', education: 'Post Graduate', age: 48, criminalCases: 0, assets: '< ₹1 Lakh', liabilities: '₹1–10 Lakh', dataSource: 'MyNeta' },
        { name: 'Arun Kumar Sharma', party: 'Delhi Janta Party', symbol: '⭐', education: 'Post Graduate', age: 72, criminalCases: 1, assets: '₹1–5 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Arvind Kejriwal', party: 'AAP', symbol: '⭐', education: 'Graduate Professional', age: 56, criminalCases: 15, assets: '₹1–5 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Bhawana', party: 'IND', symbol: '⭐', education: 'Graduate', age: 25, criminalCases: 0, assets: '₹1–10 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Dr. Abhilasha', party: 'IND', symbol: '⭐', education: 'Doctorate', age: 49, criminalCases: 0, assets: '₹1–10 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Dr. Munish Kumar Raizada', party: 'Bharatiya Liberal Party', symbol: '⭐', education: 'Graduate Professional', age: 56, criminalCases: 0, assets: '₹5 Crore+', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Duggirala Nageswara Rao', party: 'Jatiya Jana Sena Party', symbol: '⭐', education: 'Post Graduate', age: 42, criminalCases: 0, assets: '₹1–10 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Haider Ali', party: 'IND', symbol: '⭐', education: '8th Pass', age: 34, criminalCases: 0, assets: '< ₹1 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Ishwar Chand', party: 'Bharatrashtra Democratic Party', symbol: '⭐', education: 'Graduate Professional', age: 72, criminalCases: 0, assets: '₹1–5 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Jagdeesh Prasad', party: 'Samarth Bharatvarsh Party', symbol: '⭐', education: 'Graduate', age: 59, criminalCases: 0, assets: '₹10 Lakh–1 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Mukesh Jain', party: 'Rashtrawadi Janlok Party (Satya)', symbol: '⭐', education: 'Graduate Professional', age: 62, criminalCases: 4, assets: '₹1–10 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Naresh Kumar', party: 'Aapki Apni Party (Peoples)', symbol: '⭐', education: '8th Pass', age: 66, criminalCases: 0, assets: '₹10 Lakh–1 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Nitya Nand Singh', party: 'Rashtriya Manav Party', symbol: '⭐', education: 'Doctorate', age: 50, criminalCases: 0, assets: '₹10 Lakh–1 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Pankaj Sharma', party: 'IND', symbol: '⭐', education: 'Graduate', age: 39, criminalCases: 1, assets: '₹1–10 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Parvesh Sahib Singh', party: 'BJP', symbol: '⭐', education: 'Post Graduate', age: 47, criminalCases: 1, assets: '₹5 Crore+', liabilities: '₹5 Crore+', dataSource: 'MyNeta', isWinner: true },
        { name: 'Ravinder Singh Rawat', party: 'Haryana Jansena Party', symbol: '⭐', education: 'Post Graduate', age: 41, criminalCases: 0, assets: '₹1–10 Lakh', liabilities: '₹1–10 Lakh', dataSource: 'MyNeta' },
        { name: 'Sandeep Dikshit', party: 'INC', symbol: '⭐', education: 'Post Graduate', age: 60, criminalCases: 0, assets: '₹5 Crore+', liabilities: '₹10 Lakh–1 Crore', dataSource: 'MyNeta' },
        { name: 'Sangha Nand Bauddh', party: 'Bhim Sena', symbol: '⭐', education: 'Graduate', age: 52, criminalCases: 0, assets: '< ₹1 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Sanjay Rawat', party: 'IND', symbol: '⭐', education: 'Graduate', age: 51, criminalCases: 0, assets: '₹1–5 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Santosh Kumar', party: 'Right to Recall Party', symbol: '⭐', education: 'Graduate', age: 48, criminalCases: 0, assets: '< ₹1 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Santosh Rai', party: 'Abhinav Bharat Party', symbol: '⭐', education: 'Post Graduate', age: 50, criminalCases: 2, assets: '₹10 Lakh–1 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Virender', party: 'BSP', symbol: '⭐', education: 'Graduate', age: 27, criminalCases: 0, assets: '< ₹1 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' }
      ]
    },
    {
      name: 'RAJINDER NAGAR',
      code: 'RAJINDER_NAGAR',
      candidates: [
        { name: 'Durgesh Pathak', party: 'AAP', symbol: '⭐', education: 'Post Graduate', age: 36, criminalCases: 4, assets: '₹10 Lakh–1 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Pankaj Jagya', party: 'Republican Party of India (Athawale)', symbol: '⭐', education: 'Doctorate', age: 46, criminalCases: 0, assets: '₹1–5 Crore', liabilities: '₹1–5 Crore', dataSource: 'MyNeta' },
        { name: 'Praveen Kumar Bharti', party: 'Aazad Samai Party (Kanshi Ram)', symbol: '⭐', education: 'Post Graduate', age: 44, criminalCases: 0, assets: '₹1–10 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Shiv Prasad Verma', party: 'BSP', symbol: '⭐', education: '8th Pass', age: 58, criminalCases: 0, assets: '₹10 Lakh–1 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Umang', party: 'IND', symbol: '⭐', education: '10th Pass', age: 25, criminalCases: 1, assets: '< ₹1 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Umang Bajaj', party: 'BJP', symbol: '⭐', education: 'Post Graduate', age: 31, criminalCases: 0, assets: '₹5 Crore+', liabilities: '₹1–5 Crore', dataSource: 'MyNeta', isWinner: true },
        { name: 'Vineet Yadav', party: 'INC', symbol: '⭐', education: '12th Pass', age: 30, criminalCases: 0, assets: '₹5 Crore+', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' }
      ]
    },
    {
      name: 'PATEL NAGAR',
      code: 'PATEL_NAGAR',
      candidates: [
        { name: 'Ashok Kumar', party: 'Aazad Samaj Party (Kanshi Ram)', symbol: '⭐', education: '8th Pass', age: 42, criminalCases: 0, assets: '₹1–10 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Krishna Tirath', party: 'INC', symbol: '⭐', education: 'Graduate Professional', age: 69, criminalCases: 0, assets: '₹5 Crore+', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Pravesh Ratn', party: 'AAP', symbol: '⭐', education: 'Graduate', age: 39, criminalCases: 0, assets: '₹1–5 Crore', liabilities: '₹10 Lakh–1 Crore', dataSource: 'MyNeta', isWinner: true },
        { name: 'Raaj Kumar Anand', party: 'BJP', symbol: '⭐', education: 'Post Graduate', age: 58, criminalCases: 2, assets: '₹5 Crore+', liabilities: '₹5 Crore+', dataSource: 'MyNeta' },
        { name: 'Ram Avtar', party: 'BSP', symbol: '⭐', education: '12th Pass', age: 57, criminalCases: 0, assets: '₹10 Lakh–1 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' }
      ]
    },
    {
      name: 'R K PURAM',
      code: 'R_K_PURAM',
      candidates: [
        { name: 'Abha Jha', party: 'Bhartiya Mahasangh Party', symbol: '⭐', education: '12th Pass', age: 43, criminalCases: 0, assets: '₹10 Lakh–1 Crore', liabilities: '₹1–10 Lakh', dataSource: 'MyNeta' },
        { name: 'Anil Kumar Sharma', party: 'BJP', symbol: '⭐', education: 'Graduate', age: 53, criminalCases: 0, assets: '₹5 Crore+', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta', isWinner: true },
        { name: 'Kuldeep Singh Ahlawat', party: 'IND', symbol: '⭐', education: 'Graduate', age: 62, criminalCases: 0, assets: '₹10 Lakh–1 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Lokesh Kumar Masterji', party: 'Rashtriya Rashtrawadi Party', symbol: '⭐', education: 'Graduate', age: 48, criminalCases: 0, assets: '₹10 Lakh–1 Crore', liabilities: '₹1–10 Lakh', dataSource: 'MyNeta' },
        { name: 'Neeraj Chourasiya', party: 'Yuva Bharat Rashtraseva Party', symbol: '⭐', education: 'Post Graduate', age: 35, criminalCases: 0, assets: '₹1–5 Crore', liabilities: '₹10 Lakh–1 Crore', dataSource: 'MyNeta' },
        { name: 'Permila', party: 'IND', symbol: '⭐', education: 'Post Graduate', age: 45, criminalCases: 0, assets: '₹1–10 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Pramila Tokas', party: 'AAP', symbol: '⭐', education: '12th Pass', age: 47, criminalCases: 2, assets: '₹5 Crore+', liabilities: '₹5 Crore+', dataSource: 'MyNeta' },
        { name: 'Rai Singh', party: 'IND', symbol: '⭐', education: '10th Pass', age: 67, criminalCases: 0, assets: '₹5 Crore+', liabilities: '₹10 Lakh–1 Crore', dataSource: 'MyNeta' },
        { name: 'Ramesh Advocate', party: 'IND', symbol: '⭐', education: 'Graduate Professional', age: 39, criminalCases: 1, assets: '₹10 Lakh–1 Crore', liabilities: '₹1–10 Lakh', dataSource: 'MyNeta' }
      ]
    },
    {
      name: 'GREATER KAILASH',
      code: 'GREATER_KAILASH',
      candidates: [
        { name: 'Garvit Singhvi', party: 'INC', symbol: '⭐', education: 'Post Graduate', age: 37, criminalCases: 0, assets: '₹5 Crore+', liabilities: '₹5 Crore+', dataSource: 'MyNeta' },
        { name: 'Niyati Choudhary', party: 'BSP', symbol: '⭐', education: 'Post Graduate', age: 34, criminalCases: 0, assets: '₹10 Lakh–1 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Ramesh Jagannath Shah', party: 'Delhi Janta Party', symbol: '⭐', education: 'Graduate', age: 77, criminalCases: 0, assets: '₹10 Lakh–1 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Satish Kumar Gulliya', party: 'Bhartiya Rashtrawadi Party', symbol: '⭐', education: 'Graduate Professional', age: 45, criminalCases: 0, assets: '₹1–5 Crore', liabilities: '₹1–10 Lakh', dataSource: 'MyNeta' },
        { name: 'Saurabh Bharadwaj', party: 'AAP', symbol: '⭐', education: 'Graduate Professional', age: 45, criminalCases: 6, assets: '₹1–5 Crore', liabilities: '₹1–10 Lakh', dataSource: 'MyNeta' },
        { name: 'Shikha Roy', party: 'BJP', symbol: '⭐', education: 'Post Graduate', age: 60, criminalCases: 0, assets: '₹5 Crore+', liabilities: '₹1–5 Crore', dataSource: 'MyNeta', isWinner: true }
      ]
    },
    {
      name: 'DELHI CANTT',
      code: 'DELHI_CANTT',
      candidates: [
        { name: 'Ashok Agyani', party: 'IND', symbol: '⭐', education: '12th Pass', age: 54, criminalCases: 0, assets: '₹10 Lakh–1 Crore', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Bhuvan Tanwar', party: 'BJP', symbol: '⭐', education: 'Post Graduate', age: 36, criminalCases: 0, assets: '₹5 Crore+', liabilities: '₹10 Lakh–1 Crore', dataSource: 'MyNeta' },
        { name: 'Namit Kumar Gautam', party: 'BSP', symbol: '⭐', education: 'Graduate', age: 26, criminalCases: 0, assets: '₹1–10 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Pradeep Kumar Upmanyu', party: 'INC', symbol: '⭐', education: 'Graduate', age: 63, criminalCases: 1, assets: '₹5 Crore+', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Sachin', party: 'Bharatiya Sampuran Krantikari Party', symbol: '⭐', education: '5th Pass', age: 31, criminalCases: 0, assets: '₹1–10 Lakh', liabilities: '< ₹1 Lakh', dataSource: 'MyNeta' },
        { name: 'Surender Kumar', party: 'Peoples Party of India (Democratic)', symbol: '⭐', education: '10th Pass', age: 51, criminalCases: 2, assets: '₹1–10 Lakh', liabilities: '₹1–10 Lakh', dataSource: 'MyNeta' },
        { name: 'Virender Singh Kadian', party: 'AAP', symbol: '⭐', education: 'Post Graduate', age: 49, criminalCases: 2, assets: '₹5 Crore+', liabilities: '₹10 Lakh–1 Crore', dataSource: 'MyNeta', isWinner: true }
      ]
    }
  ]
}
