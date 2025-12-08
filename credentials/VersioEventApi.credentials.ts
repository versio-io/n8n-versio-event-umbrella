/*
 * Copyright (C) QMETHODS - Business & IT Consulting GmbH - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	Icon,
	// IHttpRequestOptions, 
	ICredentialTestRequest
} from 'n8n-workflow';

export class VersioEventApi implements ICredentialType {
	name = 'versioioApi';
	displayName = 'Versio.io API';
	documentationUrl = 'https://live.versio.io/doc/n8n-node';
	icon = 'file:versioEvent.svg' as Icon;

	testedBy = ['versioioEvent'];

	properties: INodeProperties[] = [
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'string',
			default: 'https://live.versio.io',
			placeholder: 'https://live.versio.io',
			required: true,
		},
		{
			displayName: 'Environment ID',
			name: 'environment',
			type: 'string',
			default: '<YOUR_ENVIRONMENT_ID>',
			required: true,
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=apiToken {{$credentials.apiToken}}', //Without equal sign, it wont work.
			},
		},
	};

	
test: ICredentialTestRequest = {
        request: {
            baseURL:'={{$credentials.serverUrl}}',
            url: '/api-versio.eventProcessing/1.0/environments/{{$credentials.environment}}/events',
            method: 'POST',
        },
    };
}