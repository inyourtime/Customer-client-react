import { Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'

let OmiseCard

const CheckoutCreditCard = ({ createCreditCardCharge }) => {

	useEffect(() => {
		OmiseCard = window.OmiseCard
		OmiseCard.configure({
			publicKey: 'pkey_test_5s4kdbco6bm8aj65z5s',
			buttonLabel: "Pay with Omise",
			submitLable: 'Pay now',
			currency: 'thb',
			frameLabel: 'My radius'
		});
	}, [])

	const creditCardConfigure = () => {
		OmiseCard.configure({
			defaultPaymentMethod: 'credit_card',
			otherPaymentMethods: []
		})
		OmiseCard.configureButton("#credit_card")
		OmiseCard.attach()
	}

	const handleClick = (e) => {
		e.preventDefault()
		creditCardConfigure()
		omiseCardHandler()
	}

	const omiseCardHandler = () => {

		OmiseCard.open({
			amount: 20000,
			submitFormTarget: '#checkout-form',
			onCreateTokenSuccess: (token) => {
				createCreditCardCharge(token, 20000)
			},
			onFormClosed: () => {
				/* Handler on form closure. */
			},
		})
	}

	return (
		<>
			<form>
				<Button
					id="credit_card"
					sx={{ mt: 2, ml: 2 }}
					// fullWidth
					size="medium"
					variant="contained"
					color="info"
					onClick={handleClick}
				>
					Pay
				</Button>
			</form>
		</>
	)
}

export default CheckoutCreditCard