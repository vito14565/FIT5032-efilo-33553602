// functions/index.js

// Admin SDK & Functions v2 imports
const admin = require("firebase-admin");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: true });

/** Initialize Admin app once */
if (!admin.apps.length) {
  admin.initializeApp();
}

/**
 * Firestore v2 trigger:
 * Capitalize all string fields when a new document is created in 'books'.
 */
exports.capitalizeOnCreate = onDocumentCreated("books/{bookId}", async (event) => {
  try {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data();
    if (!data) return;

    const update = {};
    let changed = false;

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string" && value.trim().length > 0) {
        const upper = value.toUpperCase();
        if (upper !== value) {
          update[key] = upper;
          changed = true;
        }
      }
    }

    if (changed) {
      await snap.ref.update(update);
      console.log(
        `[capitalizeOnCreate] Updated fields: ${Object.keys(update).join(", ")}`
      );
    } else {
      console.log("[capitalizeOnCreate] No fields needed capitalization.");
    }
  } catch (err) {
    console.error("[capitalizeOnCreate] Error processing document:", err);
  }
});

/**
 * HTTPS v2 function:
 * Returns { count: <number> } for documents in 'books' collection.
 * Uses CORS to avoid browser issues.
 */
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method === "OPTIONS") return res.status(204).send("");
      if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
      }

      // Prefer aggregation query (faster & cheaper than full get)
      const agg = await admin.firestore().collection("books").count().get();
      const count = agg.data().count || 0;

      return res.status(200).json({ count });
    } catch (err) {
      console.error("[countBooks] error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
});