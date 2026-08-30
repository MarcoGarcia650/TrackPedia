# Firestore Security Specification

## Data Invariants
- `UserProfile`: `id` must match the document ID and the `auth.uid`.
- `Trip`: `ownerId` must match the creator's `auth.uid`.
- `Member`: A user can only be added to a trip if they exist.
- `Expense`: `amount` must be positive. `paidBy` must be a valid member ID.
- `Vote`: `votedBy` must contain valid member IDs.
- `Booking`: `userId` must match `auth.uid`. `totalCost` must be non-negative.
- `Message`: `senderId` must match the `auth.uid` or be 'system'.

## The Dirty Dozen Payloads

### 1. Identity Spoofing (Trip)
Attempt to create a trip with an `ownerId` that doesn't match `request.auth.uid`.
```json
{
  "id": "malicious-trip",
  "name": "I Own This Now",
  "ownerId": "some-other-user",
  "status": "active"
}
```

### 2. Resource Poisoning (Member ID)
Attempt to use a massive string as a member ID to cause resource exhaustion.
```json
{
  "id": "m" + "a".repeat(2000),
  "name": "Huge ID",
  "avatar": "...",
  "budget": 1000,
  "hasVoted": false
}
```

### 3. State Shortcutting (Expense)
Update an expense to 'settled' without being the owner or a recognized admin.
```json
{
  "status": "settled"
}
```

### 4. Shadow Field Injection
Inject a `isVerified` field into a `UserProfile`.
```json
{
  "name": "Alex",
  "isVerified": true
}
```

### 5. PII Leak (User Email)
Attempt to read another user's email without permission.
```json
// GET /users/target-user-id
```

### 6. Relational Sync Violation
Add an expense to a trip that the user is not a member of.
```json
// POST /trips/other-trip/expenses
```

### 7. Immortal Field Corruption
Attempt to change `createdAt` on an existing trip.
```json
{
  "createdAt": "2020-01-01T00:00:00Z"
}
```

### 8. Value Poisoning (Expense Amount)
Set a negative amount for an expense.
```json
{
  "amount": -100
}
```

### 9. Unauthorized Vote
Vote on behalf of another user.
```json
{
  "votedBy": ["other-user-id"]
}
```

### 10. Message Forgery
Send a system message as a regular user.
```json
{
  "type": "system",
  "text": "User kicked (fake)"
}
```

### 11. Orphan Write (Member)
Add a member to a non-existent trip.
```json
// POST /trips/bogus-id/members/m1
```

### 12. List Scraping
Attempt to list all trips in the system without member context.
```json
// QUERY /trips
```

## Test Runner Logic
The `firestore.rules.test.ts` will verify that all the above payloads are denied and that legitimate operations are allowed for authenticated members.
