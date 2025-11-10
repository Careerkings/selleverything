import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/order.model.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_API_KEY);

export const orderCheckout = async (req, res, next) => {
  const { cartItems, userId } = req.body;

  try {
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.imageUrl],
          description: item.description,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.cartQuantity,
    }));

    const session = await stripe.checkout.sessions.create({
      customer_email: req.user?.email || req.body?.email,
      shipping_address_collection: {
        allowed_countries: [
          "US",
          "CA",
          "GB",
          "AU",
          "NZ",
          "DE",
          "FR",
          "IT",
          "ES",
          "NL",
          "SE",
          "NO",
          "CH",
          "IE",
          "PL",
          "NG",
          "GH",
          "ZA",
          "KE",
          "EG",
          "MA",
          "IN",
          "CN",
          "JP",
          "KR",
          "SG",
          "AE",
          "SA",
          "BR",
          "MX",
        ],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      line_items,
      mode: "payment",
      success_url: `${process.env.DEPLOY_URL}/CheckoutSuccess?success=true`,
      cancel_url: `${process.env.DEPLOY_URL}/Cart?canceled=true`,
      metadata: {
        userId: userId || "guest",
        cart: JSON.stringify(
          cartItems.map((cartItem) => ({
            id: cartItem._id,
            name: cartItem.name,
            quantity: cartItem.cartQuantity,
          }))
        ),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    next(err.message);
  }
};

export const stripeWebHook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
    console.log("✅ Webhook verified:", event.type);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("💰 Payment successful for session:", session.id);

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const products = lineItems.data.map((item) => ({
        name: item.description,
        price: item.amount_total / 100,
        quantity: item.quantity,
        image: item.price?.product?.images?.[0] || "",
      }));

      const newOrder = new Order({
        userId: session.metadata?.userId || "guest",
        paymentIntentId: session.payment_intent,
        products,
        totalAmount: session.amount_total / 100,
        currency: session.currency,
        payment_status: session.payment_status,
      });

      await newOrder.save();
      console.log("💾 Order saved to database:", newOrder._id);
    } catch (err) {
      console.error("❌ Error saving order:", err.message);
    }
  }

  res.status(200).json({ received: true });
};
