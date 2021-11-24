const BASE = "https://dictionaryapi.com/api/v3/references/sd2/json/";
const AUDIO_BASE = "https://media.merriam-webster.com/audio/prons/en/us/";
const KEY = "";

function getDictionaryEntry(word)
{
  return fetch(BASE + word + "?" + KEY)
    .then(x => x.json());
}

function getAudio(word, format="mp3")
{
  return getDictionaryEntry(word)
    .then(x => {
      const audioFileName = x[0].hwi.prs[0].sound.audio;
      
      let subDir = word[0];
      if (word.substring(0, 3) === "bix")
      {
        subDir = "bix";
      }
      else if (word.substring(0, 2) === "gg")
      {
        subDir = "gg";
      }
      else if (/[^a-zA-Z]/ig.test(word.substring(0, 1)))
      {
        subDir = "number";
      }
      
      const url = AUDIO_BASE + format + "/" + subDir + "/" + audioFileName + "." + format;
      return url;
    });
}

export {
  getDictionaryEntry,
  getAudio
};
