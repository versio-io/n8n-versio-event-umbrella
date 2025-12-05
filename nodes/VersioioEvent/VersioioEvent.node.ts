/*
 * Copyright (C) QMETHODS - Business & IT Consulting GmbH - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';

export class VersioioEvent implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Versio.io Event Umbrella',
		name: 'versioioEvent',
		icon: 'file:versioEvent.svg',
		group: ['output'], // output is correct, since this node sends data
		version: 1,
		subtitle: 'Send an event to Versio.io',
		description: 'Send an n8n event to the Versio.io Event Umbrella.',
		documentationUrl: 'https://live.versio.io/doc/n8n-node',
		
		defaults: {
			name: 'Versio.io Event Umbrella',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'versioioApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Source Type',
				name: 'sourceType',
				type: 'string',
				default: 'n8n',
				required: true,
				description: 'Where the event is coming from',
				
			},
			{
				displayName: 'Trigger',
				name: 'trigger',
				type: 'string',
				default: '',
				required: true,
				description: 'What has triggered this event',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				required: true,
				description: 'A detailed description about this event',
			},
			{
				displayName: 'Severity',
				name: 'severity',
				type: 'number',
				typeOptions: { minValue: 0, maxValue: 9 },
				default: 4,
				required: true,
				description: 'Rate the criticality of this event (0-9)',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				options: [
					{
						displayName: 'Classification',
						name: 'classification',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Event ID',
						name: 'id',
						type: 'string',
						default: '',
					},
										{
						displayName: 'External ID Link',
						name: 'externalIdLink',
						type: 'string',
						default: '',
					},
										{
						displayName: 'External ID Name',
						name: 'externalIdName',
						type: 'string',
						default: '',
					},
										{
						displayName: 'Raw Event (JSON)',
						name: 'rawEvent',
						type: 'json',
						default: '{}',
					},
					{
						displayName: 'UTC Timestamp',
						name: 'utc',
						type: 'dateTime',
						default: '',
					},



				],
			},
		],
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('versioioApi');
		const baseUrl = (credentials.serverUrl as string).replace(/\/$/, '');
		const environment = credentials.environment as string;

		for (let i = 0; i < items.length; i++) {
			try {
				const sourceType = this.getNodeParameter('sourceType', i) as string;
				const trigger = this.getNodeParameter('trigger', i) as string;
				const message = this.getNodeParameter('message', i) as string;
				const severity = this.getNodeParameter('severity', i) as number;

				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

				const eventPayload: IDataObject = { sourceType, trigger, message, severity };

				if (additionalFields.classification) eventPayload.classification = additionalFields.classification;
				if (additionalFields.id) eventPayload.id = additionalFields.id;
				if (additionalFields.externalIdLink) eventPayload.externalIdLink = additionalFields.externalIdLink;
				if (additionalFields.externalIdName) eventPayload.externalIdName = additionalFields.externalIdName;

				if (additionalFields.utc) {
					eventPayload.utc = new Date(additionalFields.utc as string).getTime();
				}

				if (additionalFields.rawEvent) {
					try {
						eventPayload.rawEvent =
							typeof additionalFields.rawEvent === 'string'
								? JSON.parse(additionalFields.rawEvent as string)
								: additionalFields.rawEvent;
					} catch {
						eventPayload.rawEvent = { data: additionalFields.rawEvent };
					}
				}

				const options: IHttpRequestOptions = {
					method: 'POST',
					url: `${baseUrl}/api-versio.eventProcessing/1.0/environments/${environment}/events`,
					json: true,
					body: [eventPayload],
					// rejectUnauthorized:false, 
				};

				// Previous deprecated function (requestWithAuthentication) had more info in its response.
				// Now we use httpRequestWithAuthentication, which have less info
				const response = await this.helpers.httpRequestWithAuthentication.call( 
                    this,
                    'versioioApi',
                    { ...options, resolveWithFullResponse: true, simple: false },
                );
				

				const output = {
					event: eventPayload,
					response: {
						statusCode: response.statusCode,
						headers: response.headers,
						requestUrl: options.url,
						method: options.method,
					},
				};

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(output),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
