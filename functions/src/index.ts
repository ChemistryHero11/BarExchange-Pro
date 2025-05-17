'use server';
/**
 * @fileOverview Firebase Cloud Functions for BarExchange Pro.
 *
 * - onNewOrder: Firestore trigger that updates drink prices upon new order creation.
 * - scheduledPriceDecay: Scheduled function that nudges drink prices towards their base price.
 */

import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Interfaces for Firestore document data used within functions
// These are simplified and focused on what the functions need.
// For comprehensive types, refer to src/types/index.ts in the main app.

interface DrinkData {
  name: string;
  basePrice: number;
  currentPrice: number;
  previousPrice?: number;
  totalSold: number;
  lastPriceUpdate: admin.firestore.Timestamp;
}

interface OrderItemData {
  drinkId: string;
  quantity: number;
  // pricePerUnit: number; // Price at time of order, useful but not directly for this function
}

interface OrderData {
  items: OrderItemData[];
  barId: string; // Assuming barId is explicitly on the order document
  // Other fields like totalAmount, status, createdAt are not directly used by onNewOrder's price logic
}

const PRICE_INCREASE_PERCENTAGE = 0.01; // 1% increase per unit sold in an order
const PRICE_DECAY_FACTOR = 0.05; // Decay 5% of the difference towards base price

/**
 * Firestore trigger that fires when a new order is created.
 * It updates the price and sales volume of the drinks in the order.
 */
export const onNewOrder = onDocumentWritten(
  "bars/{barId}/orders/{orderId}",
  async (event) => {
    logger.info(`Processing new order: bars/${event.params.barId}/orders/${event.params.orderId}`);

    // Only process document creation
    if (!event.data || !event.data.after.exists || event.data.before.exists) {
      logger.info("Not a new order creation, skipping.");
      return null;
    }

    const order = event.data.after.data() as OrderData;
    const barId = event.params.barId;

    if (!order.items || order.items.length === 0) {
      logger.warn("Order has no items, skipping price update.");
      return null;
    }

    const batch = db.batch();

    for (const item of order.items) {
      const drinkRef = db.collection("bars").doc(barId).collection("drinks").doc(item.drinkId);
      
      try {
        const drinkDoc = await drinkRef.get();
        if (!drinkDoc.exists) {
          logger.error(`Drink ${item.drinkId} not found in bar ${barId}.`);
          continue;
        }

        const drinkData = drinkDoc.data() as DrinkData;
        const oldPrice = drinkData.currentPrice;
        
        // Calculate new price: increase by X% for each unit sold
        let newPrice = oldPrice * (1 + PRICE_INCREASE_PERCENTAGE * item.quantity);
        // Round to 2 decimal places
        newPrice = Math.round(newPrice * 100) / 100;

        const updatePayload: Partial<DrinkData> & { lastPriceUpdate: admin.firestore.FieldValue, totalSold: admin.firestore.FieldValue } = {
          currentPrice: newPrice,
          previousPrice: oldPrice,
          totalSold: admin.firestore.FieldValue.increment(item.quantity),
          lastPriceUpdate: admin.firestore.FieldValue.serverTimestamp(),
        };
        
        batch.update(drinkRef, updatePayload);
        logger.info(`Drink ${item.drinkId} price updated from ${oldPrice} to ${newPrice}. Total sold incremented by ${item.quantity}.`);

      } catch (error) {
        logger.error(`Error processing drink ${item.drinkId} for order ${event.params.orderId}:`, error);
      }
    }

    try {
      await batch.commit();
      logger.info(`Batch committed for order ${event.params.orderId}.`);
    } catch (error) {
      logger.error(`Error committing batch for order ${event.params.orderId}:`, error);
    }
    return null;
  }
);

/**
 * Scheduled function that runs every 2 minutes to adjust drink prices
 * towards their base price (price decay/recovery).
 */
export const scheduledPriceDecay = onSchedule(
  "every 2 minutes",
  async (event) => {
    logger.info("Running scheduledPriceDecay function.", { eventTime: event.time });

    const drinksSnapshot = await db.collectionGroup("drinks").get();
    if (drinksSnapshot.empty) {
      logger.info("No drinks found to process for price decay.");
      return null;
    }

    const batch = db.batch();
    let updatedCount = 0;

    drinksSnapshot.forEach((doc) => {
      const drink = doc.data() as DrinkData;
      const drinkRef = doc.ref;

      let newPrice = drink.currentPrice;
      const { basePrice, currentPrice } = drink;

      if (currentPrice > basePrice) {
        newPrice = currentPrice - (currentPrice - basePrice) * PRICE_DECAY_FACTOR;
        newPrice = Math.max(basePrice, newPrice); // Don't go below base price
      } else if (currentPrice < basePrice) {
        newPrice = currentPrice + (basePrice - currentPrice) * PRICE_DECAY_FACTOR;
        newPrice = Math.min(basePrice, newPrice); // Don't go above base price
      }
      
      newPrice = Math.round(newPrice * 100) / 100; // Round to 2 decimal places

      if (newPrice !== currentPrice) {
        const updatePayload: Partial<DrinkData> & { lastPriceUpdate: admin.firestore.FieldValue } = {
          currentPrice: newPrice,
          previousPrice: currentPrice,
          lastPriceUpdate: admin.firestore.FieldValue.serverTimestamp(),
        };
        batch.update(drinkRef, updatePayload);
        updatedCount++;
        // logger.debug(`Scheduled decay for ${doc.id}: ${currentPrice} -> ${newPrice} (base: ${basePrice})`);
      }
    });

    if (updatedCount > 0) {
      try {
        await batch.commit();
        logger.info(`Price decay batch committed. ${updatedCount} drinks updated.`);
      } catch (error) {
        logger.error("Error committing price decay batch:", error);
      }
    } else {
      logger.info("No drink prices required adjustment in this run.");
    }

    return null;
  }
);
