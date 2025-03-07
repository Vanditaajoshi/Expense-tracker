const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export const months = (config: { count: number; section?: number }) => {
  const count = config.count || 12;
  const section = config.section; // section is optional
  const values = [];

  for (let i = 0; i < count; i++) {
    let value = MONTHS[i % 12]; // ✅ Corrected: Use the MONTHS array
    values.push(section ? value.substring(0, section) : value);
  }

  return values;
};
