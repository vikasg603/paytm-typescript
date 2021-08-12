'use strict'

// @ts-ignore
import npmPackage from '../package.json'
import API from './api'
import payments from './resources/payments'
import PaytmError from './utils/PaytmError'

interface PaytmParams {
    mid: string;
    key: string;
    isProduction?: boolean;
    callbackUrl: string;
}

class Paytm {
	static VERSION = npmPackage.version || '1.0.0';
	static PACKAGE_NAME = npmPackage.name || 'paytm-node-typescript';
	payments: ReturnType<typeof payments>;

	constructor (options: PaytmParams) {
		const { mid, key, callbackUrl, isProduction = false } = options

		if (!mid) {
			throw new PaytmError('Missing Parameter', '`mid` is mandatory')
		}

		if (!key) {
			throw new PaytmError('Missing Parameter', '`key` is mandatory')
		}

		if (!callbackUrl) {
			throw new PaytmError('Missing Parameter', '`callbackUrl` is mandatory')
		}

		const websiteName = isProduction ? 'WEBSTAGING' : 'DEFAULT'

		const api = new API({
			ua: `${Paytm.PACKAGE_NAME}@${Paytm.VERSION}`,
			mid,
			key,
			callbackUrl,
			isProduction
		})

		this.payments = payments(api, mid, websiteName, callbackUrl)
	}
}

export default Paytm

module.exports = Paytm
