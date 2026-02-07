# Membership System Update

## Overview
The membership system has been updated to use a new `membership` collection instead of the previous `settings` collection. This provides more flexibility and better data structure for managing membership plans.

## New Database Structure

### Membership Collection
Each membership document in the `membership` collection contains:
- `type`: Name of the membership (e.g., "Basic", "Premium", "Gold")
- `description`: Description of the membership benefits
- `price`: Price of the membership (number)
- `duration`: Duration in months (number)
- `discountPercentage`: Discount offered to members (number)
- `createdAt`: Timestamp when created
- `updatedAt`: Timestamp when last updated

### User Collection Updates
User documents now include additional membership fields:
- `isMember`: Boolean indicating membership status
- `membershipType`: Type of membership (from the membership plan)
- `membershipStart`: When membership started
- `membershipEnd`: When membership expires
- `membershipPlanId`: Reference to the membership plan document
- `discountPercentage`: Stored discount for quick access

## API Endpoints

### Updated Endpoints
- `GET /api/membership/settings` - Now returns array of all membership plans
- `GET /api/membership/status` - Gets user's membership status (requires auth)
- `POST /api/membership/subscribe` - Subscribe to a membership plan (requires auth)

### New Endpoints
- `GET /api/membership/plans` - Get all available membership plans
- `GET /api/membership/plan/:id` - Get specific membership plan by ID

## Frontend Changes

### Type Definitions
- `MembershipPlan`: New type for individual membership plans
- `MembershipSettings`: Now represents an array of `MembershipPlan[]`
- `MembershipStatus`: Updated to include `membershipPlanId` and `discountPercentage`

### API Service Updates
- `getSettings()`: Now returns array of membership plans
- `getPlans()`: New method to fetch all plans
- `getPlanById()`: New method to fetch specific plan
- `subscribe()`: Updated to handle new response format

### Component Updates
- **KishanParivarForm**: Updated to work with new plan structure
- **MembershipPayment**: Updated to handle new plan data format
- **ProductDetail**: Updated discount calculation logic

### State Management
- Redux store now handles both `settings` and `plans` arrays
- Discount calculation prioritizes user's membership discount over plan defaults
- New selectors for accessing membership plans

## Migration Notes

### Backward Compatibility
- Legacy plan types (`monthly`, `quarterly`, `yearly`) are still supported
- The system maps these to duration-based queries in the membership collection
- Existing frontend code should continue to work with minimal changes

### Data Migration
- No existing data migration is required
- New membership plans should be created in the `membership` collection
- Users will automatically get the new structure when they subscribe

## Usage Examples

### Creating a New Membership Plan
```javascript
// In Firestore
{
  type: "Premium",
  description: "Premium membership with exclusive benefits",
  price: 999,
  duration: 12,
  discountPercentage: 15,
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now()
}
```

### Frontend Usage
```typescript
// Fetch all plans
const plans = await membershipApi.getPlans();

// Subscribe to a plan
const result = await membershipApi.subscribe(planId);

// Get user's membership status
const status = await membershipApi.getStatus();
```

## Benefits of New Structure

1. **Flexibility**: Easy to add/remove/modify membership plans
2. **Scalability**: Better performance with larger numbers of plans
3. **Maintainability**: Cleaner separation of concerns
4. **Extensibility**: Easy to add new fields to membership plans
5. **User Experience**: Better tracking of user's specific membership details

## Testing

### Backend Testing
- Test all new endpoints with valid/invalid data
- Verify membership subscription flow
- Check discount calculation accuracy

### Frontend Testing
- Verify plan display and selection
- Test payment flow with new plan structure
- Confirm discount application in product pages
- Test membership status display

## Future Enhancements

1. **Plan Categories**: Group plans by category (e.g., Basic, Premium, Enterprise)
2. **Custom Plans**: Allow users to create custom membership durations
3. **Plan Comparison**: Add comparison features between different plans
4. **Analytics**: Track membership usage and conversion rates
5. **A/B Testing**: Test different plan structures and pricing
