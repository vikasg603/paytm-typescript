export type Dict = { [key: string]: any }
export type Money = {
    value: string;
    currency: 'INR';
}
export interface UserInfo {
    custId: string;
    mobile?: string | number;
    email?: string;
    firstName?: string;
    lastName?: string;
}
export type PaymentChannel = 'UPI' | 'UPIPUSH' | 'UPIPUSHEXPRESS' | 'VISA' | 'MASTER' | 'AMEX' | 'AIRP' | 'ALH' | 'AXIS' | 'ANDB' | 'BOI' | 'BHARAT' | 'BBK' | 'BOB' | 'BOM' | 'CBI' | 'CSB' | 'CANARA' | 'CITI' | 'CITIUB' | 'CORP' | 'COSMOS' | 'DBS' | 'DCB' | 'DHAN' | 'DENA' | 'DEUTS' | 'FDEB' | 'GPPB' | 'HDFC' | 'HSBC' | 'ICICI' | 'IDBI' | 'IDFC' | 'INDS' | 'INDB' | 'IOB' | 'JSB' | 'JKB' | 'KTKB' | 'KVB' | 'NKMB' | 'LVB' | 'OBPRF' | 'PSB' | 'PYTM' | 'PNB' | 'RATN' | 'RBS' | 'SCB' | 'SMALLFB' | 'SVC' | 'SYNBK' | 'STB' | 'SIB' | 'SBI' | 'TNMB' | 'UCO' | 'USFB' | 'UNI' | 'UBI' | 'VJYA' | 'YES';
export interface PaymentMode {
    mode?: 'BALANCE' | 'PPBL' | 'UPI' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'NET_BANKING' | 'EMI' | 'PAYTM_DIGITAL_CREDIT';
    channels?: PaymentChannel[];
}
export interface GoodsInfo {
    merchantGoodsId?: string;
    merchantShippingId?: string;
    snapshotUrl?: string;
    description: string;
    category?: string;
    quantity: number;
    unit?: string;
    price: Money;
    extendInfo?: Dict;
}
export interface ShippingInfo {
    merchantShippingId?: string;
    trackingNo?: string;
    carrier?: string;
    chargeAmount?: Money;
    countryName?: string;
    stateName?: string;
    cityName?: string;
    address1?: string;
    address2?: string;
    firstName?: string;
    lastName?: string;
    mobileNo?: string;
    email?: string;
    zipCode?: string;
}
export interface VanInfo {
    merchantPrefix: string;
    identificationNo?: string;
    purpose?: string;
}
export interface customerDetails {
    name: string;
    phone: string;
    email: string;
}
export interface VanInfoStatus {
    van: string;
    beneficiaryName: string;
    ifscCode: string;
    bankName: string;
    purpose: string;
    userDefinedFields: Dict;
    customerDetails: customerDetails;
}
export interface simplifiedPaymentOffers {
    promoCode?: string;
    applyAvailablePromo?: boolean;
    validatePromo?: boolean;
}
export interface OfferDetail {
    offerId: string;
}
export interface InventoryItem {
    id: string;
    productId: string;
    brandId?: string;
    categoryList: string;
    model?: string;
    ean?: string;
    price?: number;
    quantity?: number;
    verticalId: string;
    isEmiEnabled: boolean;
    offerDetails: OfferDetail;
}
export interface SimplifiedSubvention {
    planId?: string;
    customerId?: string;
    items?: InventoryItem[];
    subventionAmount?: number;
    offerDetails?: OfferDetail;
}
export interface SplitInfo {
    mid: string;
    amount?: Money;
    percentage?: number;
    goods?: GoodsInfo;
    shippingInfo?: ShippingInfo;
    extendInfo?: Dict;
}
export interface SplitSettlementInfo {
    splitMethod?: 'AMOUNT' | 'PERCENTAGE';
    splitInfo?: SplitInfo
}
export interface ResultInfo {
    resultCode: number;
    resultStatus: 'S' | 'F' | 'U';
    resultMsg: string;
    isRedirect: boolean;
    bankRetry: boolean;
    retry: boolean;
}
export interface MerchantDetails {
    mcc: string;
    merchantVpa: string;
    merchantName: string;
    merchantLogo: string;
}
export interface UserDetails {
    email: string;
    mobile: string;
    paytmCCEnabled: boolean;
    kyc: boolean;
    username: string;
}
export interface LoginInfo {
    userLoggedIn: boolean;
    pgAutoLoginEnabled: boolean;
    mobileNumberNonEditable: boolean;
}
export interface StatusInfo {
    status: string;
    msg: string;
}
export interface SubWalletDetails {
    displayName: string;
    balance: number;
    imageUrl: string;
}
export interface BalanceInfo {
    subWalletDetails: SubWalletDetails[],
    payerAccountExists: boolean;
    accountBalance: Money;
}
export interface PayChannelBase {
    isDisabled: StatusInfo;
    hasLowSuccess: StatusInfo;
    iconUrl: string;
    minAmount: Money;
    maxAmount: Money;
    emiType: string;
    balanceInfo: BalanceInfo;
    isHybridDisabled: boolean;
    channelCode: string;
    channelName: string;
}
export interface PayMethod {
    paymentMode: PaymentMode['mode'];
    displayName: string;
    isDisabled: StatusInfo;
    payChannelOptions: PayChannelBase[];
    feeAmount: number;
    taxAmount: number;
    totalTransactionAmount: number;
    priority: number;
    prepaidCardSupported: boolean;
    isHybridDisabled: boolean;
    onboarding: boolean;
}
export interface CardDetails {
    cardId: string;
    cardType: string;
    expiryDate: string;
    firstSixDigit: string;
    lastFourDigit: string;
    status: string;
    cvvLength: number;
    cvvRequired: boolean;
}
export interface PaymentOfferDetails {
    promocodeApplied: string;
    promotext: string;
    instantDiscount: string;
    cashbackAmount: string;
    payMethod: string;
    promoVisibility: boolean;
    responseCode: string;
}
export interface SavedInstruments {
    iconUrl: string;
    supportedCardSubTypes: string[];
    oneClickSupported: boolean;
    cardDetails: CardDetails;
    issuingBank: string;
    isEmiAvailable: boolean;
    authModes: string[];
    displayName: string;
    priority: number;
    paymentOfferDetails: PaymentOfferDetails;
    isHybridDisabled: boolean;
    channelCode: string;
    channelName: string;
    prepaidCard: boolean;
    isDisabled: StatusInfo;
    hasLowSuccess: StatusInfo;
}
export interface ActiveSubscriptions {
    accountNumber: string;
    accountHolderName: string;
    bankIFSC: string;
    bankName: string;
    savedCardId: string;
    subscriptionId: string;
    paymentMode: string;
}
export interface PayOption {
    paymentMode: PaymentMode[];
    savedInstruments: SavedInstruments[];
    activeSubscriptions: ActiveSubscriptions[];
    upiProfile: UPIProfile;
}
export interface VPADetail {
    name: string;
    defaultCreditAccRefId: string;
    defaultDebitAccRefId: string;
    isPrimary: boolean;
}
export interface CredsAllowed {
    CredsAllowedDLength: number;
    CredsAllowedDType: string;
    CredsAllowedSubType: string;
    CredsAllowedType: string;
    dLength: number;
}
export interface BankHealth {
    category: string;
    displayMsg: string;
}
export interface BankMetaData {
    perTxnLimit: number;
    bankHealth: BankHealth;
}
export interface BankAccount {
    bank: string;
    ifsc: string;
    accRefId: string;
    maskedAccountNumber: string;
    accType: string;
    credsAllowed: CredsAllowed[];
    name: string;
    mpinSet: 'Y' | 'N';
    txnAllowed: string;
    branchAddress: string;
    pgBankCode: string;
    'logo-url': string;
    bankMetaData: BankMetaData;
}
export interface ProfileDetail {
    profileStatus: string;
    upiLinkedMobNo: string;
    isDeviceBinded: boolean;
    vpaDetails: VPADetail[];
    bankAccounts: BankAccount[];
}
export interface BankHealthMetaDetails {
    npciHealth: string;
    npciHealthMsg: string;
}
export interface respDetails {
    profileDetail: ProfileDetail;
    metaDetails: BankHealthMetaDetails;
}
export interface UPIProfile {
    respDetails: respDetails;
    priority: number;
    upiOnboarding: boolean;
}
export interface MerchantRemainingLimits {
    limitType: 'DAILY' | 'WEEKLY' | 'MONTHLY';
    amount: string;
}
export interface MerchantLimitInfo {
    excludedPaymodes: string[];
    message: string;
    merchantRemainingLimits: MerchantRemainingLimits[];
}
export interface promoCodeData {
    promoCode: string;
    promoCodeMsg: string;
    promoCodeValid: boolean;
    promoCodeTypeName: string;
    promoMsg: string;
}
export interface RiskConvenienceFee {
    payMethod: string;
    feePercent: number;
    reason: string;
}
export interface MandateSupportedApps {
    name: string;
    handle: string;
    packageName: string;
    priority: number;
}
export interface ConsultDetails {
    payMethod: string;
    baseTransactionAmount: Money;
    feeAmount: Money;
    taxAmount: Money;
    totalTransactionAmount: Money;
    totalConvenienceCharges: Money;
    text: string;
    displayText: string;
}
export interface BinDetail {
    bin: string;
    issuingBank: string;
    issuingBankCode: string;
    paymentMode: string;
    channelName: string;
    channelCode: string;
    cnMin: number;
    cnMax: number;
    cvvR: boolean;
    cvvL: number;
    expR: boolean;
    IsIndian: boolean;
    IsActive: boolean;
}
export interface PCF {
    feeAmount: Money;
    taxAmount: Money;
    totalTransactionAmount: Money;
}
export interface EMIChannelInfo {
    planId: string;
    interestRate: number;
    ofMonths: number;
    minAmount: Money;
    maxAmount: Money;
    emiAmount: Money;
    totalAmount: Money;
}
export interface EmiChannel {
    emiType: string;
    isHybridDisabled: boolean;
    emiChannelInfos: EMIChannelInfo[];
    emiHybridChannelInfos: EMIChannelInfo[];
}
export interface RecurringDetails {
    pspSupportedRecurring: boolean;
    bankSupportedRecurring: boolean;
}
export interface TxnInfo {
    MID: string;
    TXNID: string;
    ORDERID: string;
    BANKTXNID: string;
    TXNAMOUNT: number;
    CURRENCY: string;
    STATUS: 'TXN_SUCCESS' | 'TXN_FAILURE' | 'PENDING';
    RESPCODE: string;
    RESPMSG: string;
    TXNDATE: string;
    GATEWAYNAME: string;
    PAYMENTMODE: string;
    CHECKSUMHASH: string;
    VPA: string;
    PROMO_CAMP_ID: string;
    PROMO_RESPCODE: string;
    PROMO_STATUS: string;
}
export interface FormDetail {
    actionURL: string;
    method: string;
    type: 'redirect' | 'submit' | 'cancel' | 'resend' | 'payonbank';
    headers: Dict;
    content: Dict;
}
export interface BankForm {
    pageType: 'redirect' | 'direct';
    redirectForm: FormDetail;
    directForms: FormDetail[];
    displayField: Dict;
    isForceResendOtp: boolean;
}
export interface DeepLinkInfo {
    deepLink: string;
    orderId: string;
    cashierRequestId: string;
    transId: string;
}
