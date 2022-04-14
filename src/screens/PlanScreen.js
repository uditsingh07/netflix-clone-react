import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import db from '../firebase'
import "./PlanScreen.css"

function PlanScreen() {
    const [products, setProducts] = useState([])
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null)

    useEffect(() => {
        db.collection('customers')
            .doc(user.uid)
            .collection('subscriptions')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async (subscription) => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds,
                    })
                })
            })

    }, [user.uid])
   

    useEffect(() => {
        db.collection("products")
            .where("active", "==", true)
            .get()
            .then((querySnapshot) => {
                const products = {};
                querySnapshot.forEach(async productDoc => {
                    products[productDoc.id] = productDoc.data()
                    const priceSnap = await productDoc.ref.collection("prices").get();
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].price = {
                            priceId: price.id,
                            priceData: price.data()
                        }
                    })
                })
                setProducts(products)
            })
    }, [])

    console.log(products)
    console.log("--")
    console.log(subscription)
    const loadCheckout = async (priceId) => {
        const docRef = await db
            .collection("customers")
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            })
        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data()

            if (error) {
                alert(`An error occured: ${error.message}`)
            }

            if (sessionId) {
                const stripe = await loadStripe("pk_live_51JEHDSSGT9ldkAXaFUbqpbXlYyJJ2zpy8YZciqoaRD2N6cn0NYXP9XFERxwrZDUKelxmktC2tVA7nH2eDuZGFLsz00uAGvk99l")
                stripe.redirectToCheckout({ sessionId })
            }
            
        })
    
    }

    return (
        <div className="PlanScreen">
            <br />
            {subscription && (< p > Renewal date:{" "}
                {new Date(subscription?.current_period_end * 1000
                ).toLocaleDateString()}</p>)}
            {Object.entries(products).map(([productId, productData]) => {

                const isCurrentPackage = productData.name
                   .includes(subscription?.role)
                console.log(isCurrentPackage)


                return (
                    <div key={productId}
                        className={`${
                        isCurrentPackage && "planScreen_plan--disabled"}
                        planscreen_plan`}>
                        <div className="planscreen_info">
                            <h5>{productData.name}</h5>
                            <h5>{productData.description}</h5>
                        </div>
                        <button onClick={() => !isCurrentPackage && loadCheckout(productData.price.priceId)}>
                            {isCurrentPackage ? 'Current Package':'Subscribe'}
                        </button>
                        </div>
                    )
            })}

        </div>
        )
}

export default PlanScreen