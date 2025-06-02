export async function createSubscription() {

  const user_id = localStorage.getItem("uid");

  const res = await fetch("http://localhost:8000/razorpay/subscriptions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id,
    }),
  });

  if (!res.ok) throw new Error("Something went wrong");

  const data = await res.json();
  return data;
}

export const initialisePayment = async () => {
  try {
    const subscriptionData = await createSubscription();

    if (subscriptionData && subscriptionData.id) {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        subscription_id: subscriptionData.id,
        name: "Vizion",
        description: "Subscribing to Pro Tier",
        // image: '/logo.png', // Optional logo
        handler: async function (response) {
          const user_id = localStorage.getItem("uid");
          const verificationResult = await fetch(
            "http://localhost:8000/razorpay/verify-subscription",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({...response, user_id}),
            }
          );

          if (verificationResult.ok) {
            console.log("Subscription verified on backend");
          } else {
            console.error("Payment verification failed on backend");
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Checkout form closed");
          },
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error("Subscription ID not found in the response.");
      // Handle this error
    }
  } catch (error) {
    console.error("Error initialising payment:", error);
    // Handle error in UI
  }
};
