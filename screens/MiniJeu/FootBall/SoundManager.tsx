import { Audio } from 'expo-av';

const sounds = [
  {
    name: 'Hi-Hat',
    path: require('./../../../assets/sounds/Hi-Hat.mp3'),
  },
  {
    name: 'Drum',
    path: require('./../../../assets/sounds/Drum-Sticks.mp3'),
  },
  // Ajoutez d'autres sons si nécessaire
];

const loadedSounds = {};

export const loadSounds = async () => {
  for (const sound of sounds) {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(sound.path);
      loadedSounds[sound.name] = soundObject;
    } catch (error) {
      console.error(`Erreur lors du chargement du son ${sound.name}:`, error);
    }
  }
};

export const playSound = async (soundName) => {
  const soundObject = loadedSounds[soundName];
  if (soundObject) {
    try {
      await soundObject.replayAsync();
    } catch (error) {
      console.error(`Erreur lors de la lecture du son ${soundName}:`, error);
    }
  }
};
