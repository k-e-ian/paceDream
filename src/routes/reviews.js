import { Router } from 'express';
import { promises as fs } from 'fs'; // File system module for storing data in JSON

const router = Router();
const fileName = 'reviews.json'; // File name to store reviews

// Function to load reviews data from JSON file
const loadReviews = async () => {
  try {
    const data = await fs.readFile(fileName, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If the file doesn't exist, return an empty array
      console.log('Reviews file not found, initializing with empty array.');
      return [];
    } else {
      console.error('Error reading reviews file:', error.message);
      throw error;
    }
  }
};

// Function to save reviews data to JSON file
const saveReviews = async (reviews) => {
  try {
    const data = JSON.stringify(reviews, null, 2); // Stringify with indentation
    await fs.writeFile(fileName, data);
  } catch (error) {
    console.error('Error saving reviews file:', error.message);
    throw error;
  }
};

// Endpoint to add a review
router.post('/add', async (req, res) => {
  try {
    const { bookingId, userId, rating, comment } = req.body;

    // Validate required fields
    if (!bookingId || !userId || rating === undefined) {
      return res.status(400).send({ message: 'Missing required fields: bookingId, userId, rating' });
    }

    // Validate rating
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).send({ message: 'Rating must be a number between 1 and 5' });
    }

    const reviews = await loadReviews();
    const review = { bookingId, userId, rating, comment, timestamp: Date.now() };

    reviews.push(review);
    await saveReviews(reviews);

    res.status(201).send({ message: 'Review added successfully', review });
  } catch (error) {
    console.error('Error adding review:', error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Endpoint to list all reviews
router.get('/list', async (req, res) => {
  try {
    const reviews = await loadReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error loading reviews:', error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

export default router;
