// src/constants/lifecycleEvents.js
export const LIFECYCLE_EVENT_TYPES = {
  PLANTING: { en: 'Planting', ur: 'بوائی', value: 'PLANTING' },
  SEEDLING: { en: 'Seedling', ur: 'پودا', value: 'SEEDLING' },
  VEGETATIVE: { en: 'Vegetative Growth', ur: 'نشوونما', value: 'VEGETATIVE' },
  FLOWERING: { en: 'Flowering', ur: 'پھول', value: 'FLOWERING' },
  FRUITING: { en: 'Fruiting', ur: 'پھل', value: 'FRUITING' },
  MATURATION: { en: 'Maturation', ur: 'پختگی', value: 'MATURATION' },
  HARVESTING: { en: 'Harvesting', ur: 'کٹائی', value: 'HARVESTING' },
  POST_HARVEST: { en: 'Post Harvest', ur: 'کٹائی کے بعد', value: 'POST_HARVEST' },
  DISEASE: { en: 'Disease Treatment', ur: 'بیماری کا علاج', value: 'DISEASE' },
  PEST_CONTROL: { en: 'Pest Control', ur: 'حشرات کا کنٹرول', value: 'PEST_CONTROL' },
  FERTILIZATION: { en: 'Fertilization', ur: 'کھاد ڈالنا', value: 'FERTILIZATION' },
  IRRIGATION: { en: 'Irrigation', ur: 'آبپاشی', value: 'IRRIGATION' },
  WEEDING: { en: 'Weeding', ur: 'گھاس نکالنا', value: 'WEEDING' },
  PRUNING: { en: 'Pruning', ur: 'کانٹ چھانٹ', value: 'PRUNING' },
  OTHER: { en: 'Other', ur: 'دوسرا', value: 'OTHER' }
};

export const getLifecycleEventOptions = () => {
  return Object.values(LIFECYCLE_EVENT_TYPES).map(event => ({
    value: event.value,
    label: `${event.en} (${event.ur})`
  }));
};

export const getLifecycleEventByValue = (value) => {
  return Object.values(LIFECYCLE_EVENT_TYPES).find(event => event.value === value);
};
