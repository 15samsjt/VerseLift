const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// --- Feeling to Bible verse mapping ---
const feelingMap = {
  happy: "psalm 118:24",
  joyful: "nehemiah 8:10",
  sad: "psalm 34:18",
  lonely: "psalm 23:4",
  anxious: "philippians 4:6",
  worried: "matthew 6:34",
  tired: "matthew 11:28",
  stressed: "1 peter 5:7",
  fearful: "isaiah 41:10",
  scared: "psalm 56:3",
  angry: "ephesians 4:26",
  frustrated: "proverbs 16:32",
  guilty: "1 john 1:9",
  ashamed: "psalm 34:5",
  hopeful: "romans 15:13",
  peaceful: "john 14:27",
  relaxed: "psalm 23:2",
  confident: "philippians 4:13",
  motivated: "colossians 3:23",
  overwhelmed: "psalm 61:2",
  blessed: "numbers 6:24-26",
  content: "philippians 4:11",
  curious: "proverbs 2:3",
  inspired: "2 timothy 1:7",
  nervous: "isaiah 41:13",
  lonelyhearted: "psalm 147:3",
  compassionate: "colossians 3:12",
  loving: "1 corinthians 13:4-5",
  grateful: "1 thessalonians 5:18",
  excited: "ecclesiastes 3:4",
  peacefulmind: "philippians 4:7",
  doubtful: "mark 9:24",
  sleepy: "psalm 127:2",
  relaxedmind: "proverbs 3:24",
  forgiving: "ephesians 4:32",
  joyfulhearted: "psalm 16:11",
  lonelysoul: "isaiah 41:10",
  anxiousmind: "psalm 94:19",
  discouraged: "galatians 6:9",
  hopefulhearted: "romans 12:12",
  patient: "galatians 5:22",
  calm: "psalm 46:10",
  trusting: "proverbs 3:5",
  fearfulhearted: "2 timothy 1:7",
  worriedmind: "matthew 11:28",
  contented: "1 timothy 6:6",
  blessedheart: "deuteronomy 28:6",
  lovingheart: "1 john 4:18",
  serene: "isaiah 26:3",
  faithful: "hebrews 11:1",
  brave: "joshua 1:9",
  thankful: "colossians 3:15"
};

// --- Bible Verse Endpoint ---
app.get("/verse", async (req, res) => {
  const feeling = req.query.feeling; // <-- get userFeeling from frontend
  console.log("Feeling received:", feeling); // <-- DEBUG LINE

    try {
      let verseRef = "john 3:16"; // default verse

    // Simple mapping example
      if (feeling) {
        const f = feeling.toLowerCase();
        for (const key in feelingMap) {
        if (f.includes(key)) {
          verseRef = feelingMap[key];
          break;
        }
      }
    }

    const response = await axios.get(`https://bible-api.com/${verseRef}`);
    res.json({
      reference: response.data.reference,
      text: response.data.text,
      translation: response.data.translation_name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch verse" });
  }
});

// --- Start server ---
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
