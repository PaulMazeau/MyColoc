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
  {
    name: 'Laser',
    path: require('./../../../assets/sounds/Laser.mp3'),
  },
  // {
  //   name: 'Bubble',
  //   path: require('./../../../assets/sounds/Bubble.mp3'),
  // },
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
  // Parcourir et décharger tous les sons
  for (let key in loadedSounds) {
    if (loadedSounds.hasOwnProperty(key)) {
      try {
        await loadedSounds[key].unloadAsync();
      } catch (error) {
        console.error(`Erreur lors du déchargement du son ${key}:`, error);
      }
    }
  }

  // Continuer avec le code existant
  const soundObject = loadedSounds[soundName];
  if (soundObject) {
    try {
      await soundObject.loadAsync(sounds.find(sound => sound.name === soundName).path); // recharger le son
      await soundObject.playAsync(); // jouer le son
    } catch (error) {
      console.error(`Erreur lors de la lecture du son ${soundName}:`, error);
    }
  }
};



