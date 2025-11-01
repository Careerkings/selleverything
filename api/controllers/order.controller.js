import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_API_KEY);

export const orderCheckout = async (req, res, next) => {
  const { cartItems } = req.body;

  try {
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.name} * ${item.cartQuantity}`,
          images: [item.imageUrl],
          description: item.description,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    }));

    const session = await stripe.checkout.sessions.create({
      phone_number_collection: { enabled: true },
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/CheckoutSuccess?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/Cart?canceled=true`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    next(err);
  }
};
