const symptomMap = [
  { keywords: ['fever','cough','cold'], specialization: 'General Physician' },
  { keywords: ['chest pain','breath'], specialization: 'Cardiologist' },
  { keywords: ['skin','rash','acne'], specialization: 'Dermatologist' }
];

function recommend(text){
  text = text.toLowerCase();
  for (let rule of symptomMap){
    if (rule.keywords.some(k => text.includes(k))) return rule.specialization;
  }
  return 'General Physician';
}
module.exports = { recommend };
