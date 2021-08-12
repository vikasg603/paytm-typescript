'use strict'

import crypto from 'crypto'

import { Dict } from '../types/index'
import PaytmError from './PaytmError'

const iv = '@@@@&&&&####$$$$'

export function calculateHash (params: string, salt: string) {
	const finalString = params + '|' + salt
	return crypto.createHash('sha256').update(finalString).digest('hex') + salt
}

export function encrypt (input: string, key: string) {
	const cipher = crypto.createCipheriv('AES-128-CBC', key, iv)
	let encrypted = cipher.update(input, 'binary', 'base64')
	encrypted += cipher.final('base64')
	return encrypted
}

export function calculateChecksum (params: string, key: string, salt: string) {
	const hashString = calculateHash(params, salt)
	return encrypt(hashString, key)
}

export async function generateRandomString (length: number) {
	const buf = crypto.randomBytes((length * 3.0) / 4.0)
	return buf.toString('base64')
}

export function decrypt (encrypted: string, key: string) {
	const decipher = crypto.createDecipheriv('AES-128-CBC', key, iv)
	let decrypted = decipher.update(encrypted, 'base64', 'binary')
	try {
		decrypted += decipher.final('binary')
	} catch (e) {
		console.log(e)
	}
	return decrypted
}

export async function generateSignatureByString (params: string, key: string) {
	const salt = await generateRandomString(4)
	return calculateChecksum(params, key, salt)
}

export function verifySignatureByString (params: string, key: string, checksum: string) {
	const paytm_hash = decrypt(checksum, key)
	const salt = paytm_hash.substr(paytm_hash.length - 4)
	return (paytm_hash === calculateHash(params, salt))
}

export function getStringByParams (params: Dict) {
	const data: Dict = {}
	Object.keys(params).sort().forEach(function (key, value) {
		data[key] = (params[key] !== null && params[key].toLowerCase() !== 'null') ? params[key] : ''
	})
	return Object.values(data).join('|')
}

export async function generateSignature (params: string | Dict, key: string) {
	if (typeof params !== 'object' && typeof params !== 'string') {
		const error = 'string or object expected, ' + (typeof params) + ' given.'
		throw new PaytmError('Invalid Parameter', error)
	}
	if (typeof params !== 'string') {
		params = getStringByParams(params)
	}
	return generateSignatureByString(params, key)
}

export function verifySignature (params: Dict | string, key: string, checksum: string) {
	if (typeof params !== 'object' && typeof params !== 'string') {
		const error = 'string or object expected, ' + (typeof params) + ' given.'
		throw new PaytmError('Invalid Parameter', error)
	}
	if (typeof params !== 'string') {
		if (Object.prototype.hasOwnProperty.call(params, 'CHECKSUMHASH')) {
			delete params.CHECKSUMHASH
		}
		params = getStringByParams(params)
	}
	return verifySignatureByString(params, key, checksum)
}
