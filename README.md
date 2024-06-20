# Booking Review API

## Endpoints

### POST /reviews/add

**Description**: Adds a new booking review.

**Request Body**:
- `bookingId` (string, required): The ID of the booking.
- `userId` (string, required): The ID of the user.
- `rating` (number, required): The rating given by the user (between 1 and 5).
- `comment` (string, optional): Additional comments by the user.

**Response**:
- `201 Created`: Review added successfully.
  ```json
  {
    "message": "Review added successfully",
    "review": {
      "bookingId": "string",
      "userId": "string",
      "rating": 5,
      "comment": "string",
      "timestamp": 1627349273000
    }
  }```
- `400 Bad Request`: Missing required fields or invalid rating.
  ```json
  {
  "message": "Missing required fields: bookingId, userId, rating"
  }
- `500 Internal Server Error`: Error adding review.

### GET /reviews/list

**Description**: Retrieves a list of all booking reviews.

**Response**:

- `200 OK`: Returns a list of reviews.
  ```json
  [
    {
        "bookingId": "string",
        "userId": "string",
        "rating": 5,
        "comment": "string",
        "timestamp": 1627349273000
    }
  ]

- `500 Internal Server Error`: Error loading reviews.