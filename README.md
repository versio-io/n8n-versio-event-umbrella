<div align="center" >
   <a href="https://www.versio.io/"><img width="60%" src="https://www.versio.io/img/logo/logo-name-blue.svg" alt="Versio.io Event Umbrella Node" /></a><br>
</div>
<p align="center">Versio.io Event Umbrella for n8n Platform</p>

<p align="center">
    <a href="https://www.versio.io/"><b>Website</b></a> •
    <a href="https://live.versio.io/doc/n8n-node/"><b>Documentation</b></a>
</p>

# Versio.io Event Umbrella for n8n platform

This is an n8n community node. It lets you use the **Versio.io Event Umbella** in your n8n workflows and send events to the Versio.io platform.

The node makes it very easy to send custom, workflow-related events from any n8n workflow straight into the Versio.io platform. You can use n8n's automation features to turn workflow issues, status changes, or operational decisions into important events for central monitoring and analysis in Versio.io.

This integration is a powerful tool for achieving the "single pane of glass" view, reinforcing Versio.io's function as your comprehensive umbrella system for event consolidation.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

## Table of Content

[Installation](#installation)

[Operations](#operations)

[Credentials](#credentials)

[Compatibility](#compatibility)

[Usage](#usage)

[Resources](#resources)

[Version history](#version-history)

---
## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

Versio.io Event Umbrella allows you to send events about your workflow and its status to the Versio.io platform and manage them further using Versio.io functionalities.

## Credentials

Before using the Versio.io Event node, you must have the following prerequisites:

1.  **Versio.io environment ID:** The specific environment ID on your Versio.io platform.
2.  **Versio.io API token:** An API token with permissions to write events to the target environment.
3.  **n8n instance:** A running instance of n8n.

## Compatibility

This node has been developed and tested using n8n version 1.122.4.

## Usage

### Integrating Versio.io Event node into n8n Workflow

In order to add the Versio.io Event Umbrella node  into your workflow and use it as an event sender, go to your n8n workflow and click on the plus sign next to your current node and then type **Versio.io**. The node will appear and is ready for integration.



### Setting Up Credentials

The Versio.io Event Umbrella node  uses a standard API credential type to connect to your environment.

1. In your n8n instance, click **"Credentials"** in the sidebar.
2. Click **"Create Credential"** and search for **"Versio.io API"**.
3. Fill in the following fields:



| Field Name | Description | Source |
| :--- | :--- | :--- |
| **Server URL** | The base URL of your Versio.io instance. | Found in your browser when accessing Versio.io. Default: `https://live.versio.io` |
| **Environment** | The ID of the target environment where the events should be sent. | Provided by your Versio.io administrator. |
| **API Token** | The authentication token for accessing the REST API. | Generated within your Versio.io user settings. |

4. Click **"Save"**. You can now use this credential across your Versio.io Event nodes.

### Node Usage: Versio.io Event Umbrella

The Versio.io Event Umbrella node  is designed to take the results of any upstream node and package them into a standardized Versio.io event payload. You can find the Versio.io Event Umbrella node in the n8n nodes panel.



#### Required Parameters

These parameters are mandatory for the node to send a functional event:

| Field Name | Description | Example Value |
| :--- | :--- | :--- |
| **Source Type** | Defines the system that originally generated the event. This helps in tracking the data origin. | `n8n` (default) |
| **Trigger** | A short, descriptive name for *what* caused the event to fire. | `HighLoadAlert`, `DatabaseBackupComplete` |
| **Message** | A detailed, human-readable description of the event. | `The production server 'web-01' exceeded 90% CPU usage for 5 minutes.` |
| **Severity** | How critical the event is, rated on a scale of 0 (Not critical) to 9 (Extremely critical). | Default is 4. |

#### Additional Fields (Optional)

You can expand the event payload to provide richer context using the Additional Fields collection:

| Field Name | Description | Usage/Notes |
| :--- | :--- | :--- |
| **Classification** | A category for the event, used for filtering and grouping in Versio.io. | `security vulnerability` |
| **Event ID** | A unique ID. Use this if you need to update or overwrite a previously sent event (for deduplication/resolution logic). | `ALERT-DB-10042-FAIL` |
| **UTC Timestamp** | The exact time the event occurred. If left blank, Versio.io records the current time of reception. | |
| **External ID Link** | A direct URL to the source of the event (e.g., a link to the original n8n workflow execution or a monitoring dashboard). | `https://n8n.mycompany.com/workflow/123` |
| **External ID Name** | A label for the External ID Link. | `n8n Workflow Execution` |
| **Raw Event (JSON)** | A JSON object containing any additional, unstructured data you wish to store, allowing for deep-dive analysis later. | Use the Expression Editor to map data from upstream nodes (e.g., `{{$json}}`). |

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Versio.io Event Umbrella node  documentation](https://live.versio.io/doc/n8n-node/)

## Version history

Versio.io Event Umbrella node version 1.0.3