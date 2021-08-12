'use strict'
import API from '../api'
import { BalanceInfo, BankForm, DeepLinkInfo, Dict, GoodsInfo, LoginInfo, MandateSupportedApps, MerchantDetails, MerchantLimitInfo, Money, PaymentMode, PayOption, promoCodeData, ResultInfo, RiskConvenienceFee, ShippingInfo, simplifiedPaymentOffers, SimplifiedSubvention, SplitSettlementInfo, TxnInfo, UserDetails, UserInfo, VanInfo, VanInfoStatus } from '../types'

export interface initTransactionBody {
	requestType: 'Payment' | 'One time Payment';
	orderId: string;
	txnAmount?: Money;
	userInfo: UserInfo;
	paytmSsoToken?: string;
	enablePaymentMode?: PaymentMode[];
	disablePaymentMode?: PaymentMode[];
	promoCode?: string;
	goods?: GoodsInfo[];
	shippingInfo?: ShippingInfo[];
	extendInfo?: Dict;
	VanInfo?: VanInfo;
	paymentOffersApplied?: Dict;
	simplifiedPaymentOffers?: simplifiedPaymentOffers;
	simplifiedSubvention?: SimplifiedSubvention;
	emiSubventionToken?: string;
	payableAmount?: Money;
	splitSettlementInfo?: SplitSettlementInfo
}

export interface updateTransactionBody {
	txnAmount?: Money;
	goods?: GoodsInfo[];
	shippingInfo?: ShippingInfo[];
	extendInfo?: Dict;
}

export interface initTransactionResponse {
	resultInfo: ResultInfo;
	txnToken: string;
	isPromoCodeValid: boolean;
	extraParamsMap: Dict;
	authenticated: boolean;
}

export interface StandardResponse {
	resultInfo: ResultInfo;
	extraParamsMap: Dict;
}

export interface ValidateOtpCheckoutResponse extends StandardResponse {
	authenticated: boolean;
}

export interface FetchBalanceResponse extends StandardResponse {
	balanceInfo: BalanceInfo;
	passCodeRequired: boolean;
	accountStatus: 'Active' | 'Inactive';
	enable: boolean;
}

export interface ProcessTransactionResponse extends StandardResponse {
	txnInfo: TxnInfo;
	callBackUrl: string;
	bankForm: BankForm;
	deepLinkInfo: DeepLinkInfo;
}

export interface FetchPaytmOptionsBody {
	'origin-channel'?: string;
	deviceId?: string;
}

export interface FetchPaytmOptionsResponse {
	resultInfo: ResultInfo;
	merchantDetails: MerchantDetails;
	addMoneyMerchantDetails: MerchantDetails;
	orderId: string;
	walletOnly: boolean;
	zeroCostEmi: boolean;
	pcfEnabled: boolean;
	nativeJsonRequestSupported: boolean;
	activeMerchant: boolean;
	oneClickMaxAmount: number;
	prepaidCardMaxAmount: number;
	userDetails: UserDetails;
	loginInfo: LoginInfo;
	iconBaseUrl: string;
	accessToken: string;
	onTheFlyKYCRequired: boolean;
	paymentFlow: string;
	merchantPayOption: PayOption;
	addMoneyPayOption: PayOption;
	merchantLimitInfo: MerchantLimitInfo;
	promoCodeData: promoCodeData;
	RiskConvenienceFee: RiskConvenienceFee;
	addMoneyDestination: string;
	mandateSupportedApps: MandateSupportedApps;
}

interface MandatoryInfo {
	mid?: string;
	websiteName?: 'WEBSTAGING' | 'DEFAULT';
	callbackUrl?: string
}

interface processTransactionBody {
	paymentMode: string;
	cardInfo?: string;
	authMode?: string;
	channelCode?: string;
	paymentFlow?: string;
	payerAccount?: string;
	planId?: string;
	storeInstrument?: 1 | 0;
	requestType?: string;
	walletType?: string;
	emiType?: string;
	preferredOtpPage?: string;
}

interface sourceAccountDetails {
	maskedAccountNumber: string;
	accountHolderName: string;
	ifscCode: string;
}

interface transactionStatusResponse {
	resultInfo: ResultInfo;
	txnId: string;
	bankTxnId: string;
	orderId: string;
	txnAmount: string;
	txnType: string;
	gatewayName: string;
	gatewayInfo: string;
	bankName: string;
	mid: string;
	paymentMode: string;
	refundAmount: string;
	txnDate: string;
	subsId: string;
	payableAmount: string;
	paymentPromoCheckoutData: string;
	vanInfo: VanInfoStatus;
	sourceAccountDetails: sourceAccountDetails;
	transferMode: string;
	utr: string;
	bankTransactionDate: string;
	rrnCode: string;
	authCode: string;
	merchantUniqueReference: string;
	cardScheme: string;
	bin: string;
	lastFourDigit: string;
	dccPaymentDetail: Dict;
	internationalCardPayment: boolean;
	baseCurrency: string;
	feeRateFactors: Dict;
}

export interface orderListBody {
	orderSearchType: string;
	orderSearchStatus: string;
	merchantOrderId?: string;
	fromDate: string;
	toDate: string;
	payMode?: string;
	isSort?: boolean;
	pageNumber: number;
	pageSize: number;
	searchConditions?: Dict;
}

export interface orderEntity {
	merchantOrderId: string;
	orderCreatedTime: string;
	orderCompletedTime: string;
	payMode: string;
	amount: number;
	txnId: string;
	vanId: string;
	vanIfscCode: string;
	rrn: string;
	orderSearchStatus: string;
	orderSearchType: string;
	mid: string;
	merchantName: string;
}

export interface orderListResponse extends StandardResponse {
	orders: orderEntity[];
	pageNum: number;
	pageSize: number;
}

export interface accessTokenResponse extends StandardResponse {
	accessToken: string;
}

const payments = (api: API, mid: string, websiteName: 'WEBSTAGING' | 'DEFAULT', callbackUrl: string) => {
	return {
		/**
		 * https://developer.paytm.com/docs/api/initiate-transaction-api/?ref=payments
		 */
		initTransaction: (body: initTransactionBody) => {
			const InternalRequestBody : MandatoryInfo & initTransactionBody = body
			InternalRequestBody.mid = mid
			InternalRequestBody.websiteName = websiteName
			InternalRequestBody.callbackUrl = callbackUrl
			return api.post<initTransactionResponse>(`/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${body.orderId}`, InternalRequestBody)
		},
		/**
		 *	https://developer.paytm.com/docs/api/update-transaction-detail-api/?ref=payments
		 */
		updateTransaction: (orderId: string, txnToken: string, body: updateTransactionBody) => {
			return api.post<StandardResponse>(`/theia/api/v1/updateTransactionDetail?mid=${mid}&orderId=${orderId}`, body, { txnToken })
		},
		/**
		 *  orderIdOrReferenceId: This will be orderId when the tokenType is 'TXN_TOKEN' and referenceId when tokenType is 'ACCESS'.
		 *  https://developer.paytm.com/docs/api/v2/fetch-payment-options-api/?ref=payments
		 */
		fetchPaytmOptions: (orderIdOrReferenceId: string, token: string, tokenType: 'ACCESS' | 'TXN_TOKEN' = 'TXN_TOKEN', body: FetchPaytmOptionsBody = {}) => {
			const InternalRequestBody : MandatoryInfo & FetchPaytmOptionsBody = body
			InternalRequestBody.mid = mid

			let url = `/theia/api/v2/fetchPaymentOptions?mid=${mid}&orderId=${orderIdOrReferenceId}`

			if (tokenType === 'ACCESS') {
				url = `/theia/api/v2/fetchPaymentOptions?mid=${mid}&referenceId=${orderIdOrReferenceId}`
			}
			return api.post<FetchPaytmOptionsResponse>(url, InternalRequestBody, { token, tokenType }, false)
		},
		/**
		 * https://developer.paytm.com/docs/api/sendotp-checkout-api/?ref=payments
		 */
		sendOtpCheckout: (orderId: string, txnToken: string, body: { mobileNo: number }) => {
			return api.post<StandardResponse>(`/login/sendOtp?mid=${mid}&orderId=${orderId}`, body, { txnToken }, false)
		},
		/**
		 * https://developer.paytm.com/docs/api/validateotp-checkout-api/?ref=payments
		 */
		validateOtpCheckout: (orderId: string, txnToken: string, body: { otp: number }) => {
			return api.post<ValidateOtpCheckoutResponse>(`/login/validateOtp?mid=${mid}&orderId=${orderId}`, body, { txnToken }, false)
		},
		/**
		 * https://developer.paytm.com/docs/api/fetch-balance-info-api/?ref=payments
		 */
		fetchBalanceCheckout: (orderId: string, txnToken: string, body: { paymentMode: 'BALANCE' | 'PPBL' }) => {
			return api.post<FetchBalanceResponse>(`/login/validateOtp?mid=${mid}&orderId=${orderId}`, body, { txnToken }, false)
		},
		/**
		 * https://developer.paytm.com/docs/api/process-transaction-api/?ref=payments
		 */
		processTransaction: (orderId: string, txnToken: string, body: processTransactionBody) => {
			return api.post<ProcessTransactionResponse>(`/theia/api/v1/processTransaction?mid=${mid}&orderId=${orderId}`, body, { txnToken }, false)
		},
		/**
		 * https://developer.paytm.com/docs/api/v3/transaction-status-api/?ref=payments
		 */
		transactionStatus: (orderId: string, txnType: string) => {
			return api.post<transactionStatusResponse>('/v3/order/status', { orderId, txnType, mid })
		},
		/**
		 * https://developer.paytm.com/docs/api/order-list-api/?ref=payments
		 */
		orderList: (body: orderListBody) => {
			return api.post<orderListResponse>('/merchant-passbook/search/list/order/v2', body, { tokenType: 'CHECKSUM' }, true)
		},
		/**
		 * https://developer.paytm.com/docs/api/access-token-api/?ref=payments
		 */
		accessToken: (referenceId: string, paytmSsoToken?: string) => {
			const body = { mid, referenceId, paytmSsoToken }
			return api.post<orderListResponse>('/merchant-passbook/search/list/order/v2', body, { tokenType: 'CHECKSUM' }, 'token')
		}
	}
}
export default payments
