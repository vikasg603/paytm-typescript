'use strict'

import axios, { AxiosError, AxiosInstance } from 'axios'

import { Dict } from './types'
import { generateSignature, verifySignature } from './utils/PaytmChecksum'
import PaytmError from './utils/PaytmError'

interface APIPaytmParams {
	ua: string;
	mid: string;
	key: string;
	isProduction: boolean;
	callbackUrl: string;
}

class API {
	axiosInstance: AxiosInstance;
	mid: string;
	key: string;
	callbackUrl: string;
	constructor (options: APIPaytmParams) {
		const { ua, mid, key, isProduction, callbackUrl } = options
		const baseUrl = isProduction ? 'https://securegw.paytm.in/' : 'https://securegw-stage.paytm.in/'
		this.mid = mid
		this.key = key
		this.callbackUrl = callbackUrl
		this.axiosInstance = axios.create({
			baseURL: baseUrl,
			headers: {
				'User-Agent': ua
			}
		})
	}

	/**
	 *
	 * signatureRequired string value denotes the field name of the signature in the head.
	 *
	 */

	async post<ResponseType = any> (url: string, body: any = {}, ExtraHeadField: Dict = {}, signatureRequired : boolean | string = true) {
		const head : Dict = {
			requestTimestamp: new Date().getTime(),
			...ExtraHeadField
		}

		if (signatureRequired) {
			const signature = await generateSignature(JSON.stringify(body), this.key)
			if (typeof signatureRequired === 'string') {
				head.token = signature
			} else {
				head.signature = signature
			}
		}

		const resp = await this.axiosInstance.post<{ body: ResponseType; head: { signature?: string } }>(url, { body, head }).then(({ data }) => data).catch((response: AxiosError) => {
			throw new PaytmError('API Error', response.response?.data.error || {}, response.response?.status)
		})

		const ResponseSignature = resp.head.signature
		if (ResponseSignature && !verifySignature(JSON.stringify(resp.body), this.key, ResponseSignature)) {
			throw new PaytmError('API Error', { message: 'Response signature doesn\'t match' })
		}

		return resp.body
	}
}

export default API
