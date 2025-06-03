const FREESOUND_API_KEY = 'CfYdNRoqBWgmD3gOtVTfbMBeYqCqTNR19cXrX2Tj'; // You'll need to get this from freesound.org
const FREESOUND_BASE_URL = 'https://freesound.org/apiv2';

export const fetchNatureSounds = async () => {
  try {
    const response = await fetch(
      `${FREESOUND_BASE_URL}/search/text/?query=nature&fields=id,name,previews,description&token=${FREESOUND_API_KEY}`
    );
    const data = await response.json();
    return data.results.map(sound => ({
      id: sound.id,
      title: sound.name,
      description: sound.description,
      url: sound.previews['preview-hq-mp3'] || sound.previews['preview-lq-mp3']
    }));
  } catch (error) {
    console.error('Error fetching nature sounds:', error);
    return [];
  }
};

export const fetchCalmingSounds = async () => {
  try {
    const response = await fetch(
      `${FREESOUND_BASE_URL}/search/text/?query=calming&fields=id,name,previews,description&token=${FREESOUND_API_KEY}`
    );
    const data = await response.json();
    return data.results.map(sound => ({
      id: sound.id,
      title: sound.name,
      description: sound.description,
      url: sound.previews['preview-hq-mp3'] || sound.previews['preview-lq-mp3']
    }));
  } catch (error) {
    console.error('Error fetching calming sounds:', error);
    return [];
  }
};

// Alternative: Use local sound files
export const localNatureSounds = [
  {
    id: 'rain',
    title: 'Gentle Rain',
    description: 'Soothing sound of gentle rainfall',
    url: '/sounds/rain.mp3'
  },
  {
    id: 'forest',
    title: 'Forest Ambience',
    description: 'Peaceful forest sounds with birds and wind',
    url: '/sounds/forest.mp3'
  },
  {
    id: 'waves',
    title: 'Ocean Waves',
    description: 'Calming ocean waves',
    url: '/sounds/waves.mp3'
  },
  {
    id: 'stream',
    title: 'Mountain Stream',
    description: 'Flowing water in a mountain stream',
    url: '/sounds/stream.mp3'
  }
];

export const localCalmingSounds = [
  {
    id: 'meditation',
    title: 'Meditation Bells',
    description: 'Peaceful meditation bells',
    url: '/sounds/meditation.mp3'
  },
  {
    id: 'whitenoise',
    title: 'White Noise',
    description: 'Soothing white noise',
    url: '/sounds/whitenoise.mp3'
  },
  {
    id: 'piano',
    title: 'Calm Piano',
    description: 'Gentle piano melodies',
    url: '/sounds/piano.mp3'
  },
  {
    id: 'ambient',
    title: 'Ambient Space',
    description: 'Relaxing ambient space sounds',
    url: '/sounds/ambient.mp3'
  }
]; 