const axios = require("axios");

class PaymentService {
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const products = [
      {
        title: "Afeitadora",
        description: "Esta es una afeitadora premium",
        picture_url: "https://images.philips.com/is/image/philipsconsumer/e2c57450f26a40fa8accae7700c13b18?$jpglarge$&wid=960",
        category_id: "Premium",
        quantity: 1,
        unit_price: 101
      },
      {
        title: "Crema para el pelo",
        description: "Esta es una Crema para el pelo basic",
        picture_url: "https://images.philips.com/is/image/philipsconsumer/e2c57450f26a40fa8accae7700c13b18?$jpglarge$&wid=960",
        category_id: "Basic",
        quantity: 1,
        unit_price: 101
      },
      {
        title: "Crema para la barba",
        description: "Esta es una Crema para la barba premium",
        picture_url: "https://images.philips.com/is/image/philipsconsumer/e2c57450f26a40fa8accae7700c13b18?$jpglarge$&wid=960",
        category_id: "Premium",
        quantity: 1,
        unit_price: 103
      }
    ]
    const body = {
      payer_email: "",

      items : products,

      back_urls: {
        failure: "http://localhost:3000/",
        pending: "http://localhost:3000/",
        success: "http://localhost:3000/"
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS"
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_46945293@testuser.com"
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data;
  }
}

module.exports = PaymentService;