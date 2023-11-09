# hospital-ordering

## Prerequisites

```
node.js >= 16
npm >= 8
```

## Setup

```
npm install
npm run test
```

If the unit tests are successful, you are ready to go!

# Context
In a hospital, the diet office and kitchen need to carefully prepare meals for patients, each with their own specific health needs. For example, too much sodium can be harmful to a diabetic patient, while too much potassium can be deadly to a patient with kidney disease.

It is critical for the hospital to track the nutrients in patient meals AND be able to change the nutrients in a recipe without affecting already delivered meals.

Your task is to build a system that can calculate and manage the nutrients in meals and recipes for hospital patients.

## Example Workflow

1. Your system has a recipe for an apple pie slice with 10g of fat, 250 kcal, and 150mg of sodium.
2. The diet office creates a meal A with 2 slices of apple pie.
3. After creating the meal, the diet office changes the recipe to have 15g of fat, 300 kcal, and 50mg of sodium.
4. The diet office creates a new meal B with 2 slices of apple pie.
5. The hospital kitchen wants to know the nutritional information for meal A and meal B.
   - The nutritional information for meal A should be 20g of fat, 500 kcal, and 300mg of sodium.
   - The nutritional information for meal B should be 30g of fat, 600 kcal, and 100mg of sodium.
